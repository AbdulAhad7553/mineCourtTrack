import Team from "../models/team.js";
import Player from "../models/player.js";
//import GameStat from "../models/gamestat.js";

export const RemovePlayer = async (req, res) => {
  console.log("RemovePlayer request -- received");
  const { teamId, playerId } = req.params;

  try {
    // Find the team and remove the player reference
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    team.players = team.players.filter(player => player.toString() !== playerId);
    await team.save();

    // Remove all game stats related to the player
   // await GameStat.deleteMany({ playerId });

    // Remove the player from the Player collection
    const result = await Player.deleteOne({ _id: playerId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }


    res.status(200).json({ message: 'Player removed successfully' });
  } catch (error) {
    console.error('Error removing player:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
