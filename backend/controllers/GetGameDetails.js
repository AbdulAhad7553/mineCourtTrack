import Player from "../models/player.js";
import Game from "../models/game.js";
import Team from "../models/team.js";

export const getGameDetails = async (req, res) => {
    try {
        const { gameId } = req.params;

        const game = await Game.findById(gameId)
            .populate({
                path: 'playerStats',
                populate: {
                    path: 'playerId',
                    model: 'Player'
                }
            })
            .populate('homeTeamId')
            .populate('awayTeamId');

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        const homeTeamPlayers = await Player.find({ teamId: game.homeTeamId._id });
        const awayTeamPlayers = await Player.find({ teamId: game.awayTeamId._id });
        const homeTeamName = game.homeTeamId.name;
        const awayTeamName = game.awayTeamId.name;
        
        //console.log("homeTeamPlayers: ", homeTeamPlayers);
        res.status(200).json({ homeTeamPlayers, awayTeamPlayers, homeTeamName, awayTeamName });
        console.log("GetGame details sent.")
    } catch (error) {
        console.error('Error fetching game details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



