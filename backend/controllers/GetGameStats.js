import Game from "../models/game.js";
import GameStat from "../models/gamestat.js";

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
