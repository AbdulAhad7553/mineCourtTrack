import Game from "../models/game.js";
import GameStat from "../models/gamestat.js";
import Player from "../models/player.js";


export const createNewGame = async (req, res) => {
  try {
    const {
      homeTeam,
      awayTeam,
      homeStartingFive,
      awayStartingFive,
      homeSubstitutes,
      awaySubstitutes,
    } = req.body;

    // Create a new game document
    const newGame = new Game({
      date: new Date(),
      homeTeamId: homeTeam,
      awayTeamId: awayTeam,
      homeTeamScore: 0,
      awayTeamScore: 0,
      playerStats: [],
    });

    // Save the game to get the gameId
    await newGame.save();

    res
      .status(201)
      .json({ message: "Game created successfully", game: newGame });
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to delete a match and its associated game stats
export const deleteGame = async (req, res) => {
  console.log("deleteGame request -- received");
  const { gameId } = req.params;

  try {
    // Find the game by ID
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Delete associated game stats
    await GameStat.deleteMany({ gameId: gameId });

    // Delete the game
    await Game.findByIdAndDelete(gameId);

    res
      .status(200)
      .json({ message: "Game and associated stats deleted successfully" });
  } catch (error) {
    console.error("Error deleting game:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const EndGame = async (req, res) => {
  console.log("End Match request --- received.");
  const { gameId } = req.params;
  const {
    homeTotalScore,
    awayTotalScore,
    homeTeam,
    awayTeam,
    homeTeamName,
    awayTeamName,
  } = req.body;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).send({ error: "Game not found" });
    }

    // Update game scores
    game.homeTeamScore = homeTotalScore;
    game.awayTeamScore = awayTotalScore;

    //Setting the names of the Teams for the game
    game.homeTeamName = homeTeamName;
    game.awayTeamName = awayTeamName;

    // Save player stats
    const savePlayerStats = async (team) => {
      const statsPromises = team.map(async (player) => {
        const playerObj = await Player.findOne({ _id: player.id });

        if (!playerObj) {
          throw new Error(`Player not found: ${player.id}`);
        }

        const { stats } = player;
        const {
          "1Pts": points1,
          "2Pts": points2,
          "3Pts": points3,
          assists,
          blocks,
          rebounds,
          steals,
          fouls,
        } = stats;

        return new GameStat({
          playerId: playerObj._id,
          gameId: game._id,
          points: (points1 || 0) + (points2 || 0) * 2 + (points3 || 0) * 3,
          assists: assists || 0,
          blocks: blocks || 0,
          rebounds: rebounds || 0,
          steals: steals || 0,
          fouls: fouls || 0,
        }).save();
      });

      return Promise.all(statsPromises);
    };

    const homeTeamStats = await savePlayerStats(homeTeam);
    const awayTeamStats = await savePlayerStats(awayTeam);

    // Update game with player stats references
    game.playerStats = [
      ...homeTeamStats.map((stat) => stat._id),
      ...awayTeamStats.map((stat) => stat._id),
    ];

    await game.save();

    res.send({ message: "Match ended successfully", game });
  } catch (error) {
    console.error("Error ending match:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const getGameDetails = async (req, res) => {
  try {
    const { gameId } = req.params;

    const game = await Game.findById(gameId)
      .populate({
        path: "playerStats",
        populate: {
          path: "playerId",
          model: "Player",
        },
      })
      .populate("homeTeamId")
      .populate("awayTeamId");

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const homeTeamPlayers = await Player.find({ teamId: game.homeTeamId._id });
    const awayTeamPlayers = await Player.find({ teamId: game.awayTeamId._id });
    const homeTeamName = game.homeTeamId.name;
    const awayTeamName = game.awayTeamId.name;
    const homeTeamId = game.homeTeamId._id;
    const awayTeamId = game.awayTeamId._id;
    const homeTeamScore = game.homeTeamScore;
    const awayTeamScore = game.awayTeamScore;
    const date = game.date;

    //console.log("homeTeamPlayers: ", homeTeamPlayers);
    res.status(200).json({
      homeTeamPlayers,
      awayTeamPlayers,
      homeTeamName,
      awayTeamName,
      homeTeamId,
      awayTeamId,
      date,
      homeTeamScore,
      awayTeamScore,
    });
    console.log("GetGame details sent.");
  } catch (error) {
    console.error("Error fetching game details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getGameStats = async (req, res) => {
  try {
    const { gameId } = req.params;

    // Find the game and populate necessary fields
    const game = await Game.findById(gameId)
      .populate("homeTeamId")
      .populate("awayTeamId");

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Fetch all game statistics for this game
    const gameStats = await GameStat.find({ gameId }).populate({
      path: "playerId",
      select: "name jerseyNumber teamId", // Select only needed fields
    });

    if (!gameStats || gameStats.length === 0) {
      return res
        .status(404)
        .json({ message: "No statistics found for this game" });
    }

    // Separate stats for home and away teams
    const homeTeamStats = gameStats
      .filter(
        (stat) =>
          stat.playerId &&
          stat.playerId.teamId?.toString() === game.homeTeamId._id.toString()
      )
      .map((stat) => ({
        _id: stat.playerId._id,
        name: stat.playerId.name,
        jerseyNumber: stat.playerId.jerseyNumber,
        points: stat.points,
        assists: stat.assists,
        rebounds: stat.rebounds,
        steals: stat.steals,
        blocks: stat.blocks,
        fouls: stat.fouls,
      }));

    const awayTeamStats = gameStats
      .filter(
        (stat) =>
          stat.playerId &&
          stat.playerId.teamId?.toString() === game.awayTeamId._id.toString()
      )
      .map((stat) => ({
        _id: stat.playerId._id,
        name: stat.playerId.name,
        jerseyNumber: stat.playerId.jerseyNumber,
        points: stat.points,
        assists: stat.assists,
        rebounds: stat.rebounds,
        steals: stat.steals,
        blocks: stat.blocks,
        fouls: stat.fouls,
      }));

    res.status(200).json({
      homeTeamStats,
      awayTeamStats,
      gameId: game._id,
      homeTeamId: game.homeTeamId._id,
      awayTeamId: game.awayTeamId._id,
    });

    console.log("Game stats sent successfully");
  } catch (error) {
    console.error("Error fetching game statistics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const GetMatchHistory = async (req, res) => {
  try {
    console.log("Get Match History request --- received.");

    const games = await Game.find();
    //console.log("games being sent to frontend: ", games);
    res.status(200).json({ games });
  } catch (error) {
    console.log("Error fetching Match History: ", error);
    res
      .status(500)
      .json({ message: "Failed to fetch Match History", error: error.message });
  }
};

export const GetMostRecentGame = async (req, res) => {
  console.log("GetMostRecentGame --- request received");

  try {
    const mostRecentGame = await Game.findOne().sort({ date: -1 });
    res.json(mostRecentGame);
  } catch (error) {
    res.status(500).json({ message: "Error fetching the most recent game" });
  }
};
