import Game from '../models/game.js'

export const GetMatchHistory = async(req,res) => {
    try {   
        console.log("Get Match History request --- received.");

        const games = await Game.find();
        //console.log("games being sent to frontend: ", games);
        res.status(200).json({games});
    
    } catch (error) {
        console.log("Error fetching Match History: ", error);
        res.status(500).json({message:"Failed to fetch Match History", error: error.message});
    }
};