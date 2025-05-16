import Player from "../models/player.js";

export const GetPlayersCount = async(req,res) => {
    console.log("GetPlayersCount request  --- received");
    try {
        const playerCount = await Player.countDocuments();
        res.json({ count: playerCount });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching the player count' });
      }
};