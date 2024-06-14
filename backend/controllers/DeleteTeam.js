import Team from "../models/team.js";
import Player from "../models/player.js";
import Game from "../models/game.js";
import GameStat from "../models/gamestat.js";


export const DeleteTeam = async (req, res) => {
  console.log("Delete Team request --- received");

  const { teamId } = req.params;

  try {
    // Find the team by ID
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Find all games where the team participated either as home team or away team
    const games = await Game.find({
      $or: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
    });

    // Loop through each game to delete game stats of players from the other team
    for (let game of games) {
      // Identify the opposing team's ID
      const opposingTeamId = game.homeTeamId.equals(teamId)
        ? game.awayTeamId
        : game.homeTeamId;

      // Find all players in the opposing team
      const opposingTeamPlayers = await Player.find({ teamId: opposingTeamId });

      // Delete game stats for each player of the opposing team
      for (let player of opposingTeamPlayers) {
        await GameStat.deleteOne({ playerId: player._id, gameId: game._id });
      }
    }

    // Delete all games where the team participated as either home team or away team
    await Game.deleteMany({
      $or: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
    });

    // Find all players in the team
    const players = await Player.find({ teamId: teamId });

    // Delete all game stats for each player
    for (let player of players) {
      await GameStat.deleteMany({ playerId: player._id });
    }

    // Delete all players in the team
    await Player.deleteMany({ teamId: teamId });

    // Finally, delete the team itself
    await Team.findByIdAndDelete(teamId);

    res
      .status(200)
      .json({ message: "Team and related data deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ message: "Server error" });
  }
};
