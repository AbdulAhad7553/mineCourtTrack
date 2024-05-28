import Team from "../models/team.js";

export const  RemovePlayer = async (req,res) => {
    console.log("RemovePlayer request -- received");
    const { teamId, playerId } = req.params;

    try{
        const team = await Team.findById(teamId);
        if (!team) 
        {
            return res.status(404).json({ message: 'Team not found' });
        }

        team.players = team.players.filter(player => player._id.toString() !== playerId);

        await team.save();

        res.status(200).json({ message: 'Player removed successfully', team });
    }
    catch(error){
        console.error('Error removing player:', error);
        res.status(500).json({ message: 'Server error' });
    }
};