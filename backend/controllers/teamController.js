import Team from "../models/team.js";
import Game from "../models/game.js";
import GameStat from "../models/gamestat.js";
import Player from "../models/player.js";

export const AddTeam = async (req, res) => {
  console.log("AddTeam request -- received", req.body);
  try {
    const {
      name,
      primaryColor,
      secondaryColor,
      coach,
      teamManager,
      teamPhotoURL,
    } = req.body;

    const newTeam = new Team({
      name,
      primaryColor,
      secondaryColor,
      coach,
      teamManager,
      teamPhotoURL,
    });

    const savedTeam = await newTeam.save();

    console.log("Team added in the database successfully");
    res.status(201).json({
      message: "Team added successfully",
      teamData: savedTeam,
    });
  } catch (error) {
    console.error("Error adding player:", error);

    //Sending an error response
    res.status(500).json({
      message: "Failed to add team",
      error: error.message,
    });
  }
};

export const DeleteTeam = async (req, res) => {
  console.log("Delete Team request --- received");

  const { teamId } = req.params;

  try {
    // Find the team by ID
    const team = await Team.findOne({ _id: teamId, isActive: true });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Find all games where the team participated either as home team or away team
    const games = await Game.find({
      $or: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
      isActive: true
    });

    // Loop through each game to delete game stats of players from the other team
    for (let game of games) {
      // Identify the opposing team's ID
      const opposingTeamId = game.homeTeamId.equals(teamId)
        ? game.awayTeamId
        : game.homeTeamId;

      // Find all players in the opposing team
      const opposingTeamPlayers = await Player.find({ teamId: opposingTeamId, isActive: true });

      // Delete game stats for each player of the opposing team related to this game
      for (let player of opposingTeamPlayers) {
        await GameStat.updateOne(
          { playerId: player._id, gameId: game._id },
          { isActive: false }
        );
      }
    }

    // Delete all games where the team participated as either home team or away team
    await Game.updateMany(
      {
        $or: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
      },
      { isActive: false }
    );

    // Find all players in the team
    const players = await Player.find({ teamId: teamId, isActive: true });

    // Delete all game stats for each player related to matches against the deleted team
    for (let player of players) {
      // Find all game stats for this player related to matches against the deleted team
      const gameStats = await GameStat.find({ playerId: player._id });

      // Filter game stats for matches against the deleted team
      const gameStatsToDelete = gameStats.filter((stat) => {
        const relatedGame = games.find((game) => game._id.equals(stat.gameId));
        return relatedGame;
      });

      // Delete game stats related to matches against the deleted team
      for (let stat of gameStatsToDelete) {
        await GameStat.updateOne(
          { _id: stat._id },
          { isActive: false }
        );
      }
    }

    // Delete all players in the team
    await Player.updateMany(
      { teamId: teamId },
      { isActive: false }
    );

    // Finally, delete the team itself
    await Team.findByIdAndUpdate(teamId, { isActive: false });

    res
      .status(200)
      .json({ message: "Team and related data deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const UpdateTeam = async (req, res) => {
  console.log("Update Team request -- received", req.body);

  const { id } = req.params;
  const {
    name,
    primaryColor,
    secondaryColor,
    coach,
    teamManager,
    players,
    teamPhotoURL,
  } = req.body;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      {
        name,
        primaryColor,
        secondaryColor,
        coach,
        teamManager,
        players,
        teamPhotoURL,
      },
      { new: true } // Return the updated document
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error("Error updating team:", error);
    res
      .status(500)
      .json({ message: "Failed to update team", error: error.message });
  }
};

export const GetTeams = async (req, res) => {
  console.log("Get Teams request -- received");

  try {
    const teams = await Team.find({ isActive: true }).populate({
      path: "players",
      match: { isActive: true },
    });
    res.status(200).json({ teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch teams", error: error.message });
  }
};

export const GetTeamDetail = async (req, res) => {
  console.log("GetTeamDetail request ---- received");

  const { teamId } = req.params;
  try {
    const team = await Team.findOne({ _id: teamId, isActive: true });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const GetTeamsCount = async (req, res) => {
  console.log("GetTeamsCount request  --- received");
  try {
    const teamCount = await Team.countDocuments({ isActive: true });
    res.json({ count: teamCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching the team count" });
  }
};
