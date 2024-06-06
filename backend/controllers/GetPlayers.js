import Player from "../models/player.js";

export const GetPlayers = async (req,res) => {
    const { teamId } = req.params;
    console.log("Get Players request -- received for teamId:", teamId);
    try {
        const players = await Player.find({ teamId });
        res.status(200).json({ players });
        
    } catch(error) {
        console.error("Error fetching players: ", error);
        res.status(500).json({ message: "Failed to fetch players", error: error.message});
    }
};