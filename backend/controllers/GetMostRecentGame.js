import Game from "../models/game.js"

export const GetMostRecentGame = async(req,res) => {
    console.log("GetMostRecentGame --- request received");

    try {
        const mostRecentGame = await Game.findOne().sort({ date: -1 });
        res.json(mostRecentGame);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the most recent game' });
    }
};