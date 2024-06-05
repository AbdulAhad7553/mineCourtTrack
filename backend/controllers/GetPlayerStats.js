// // controllers/playerController.js
// import Player from '../models/player.js';
// import GameStat from '../models/gamestat.js';
// import Game from '../models/game.js';

// export const getPlayerStats = async (req, res) => {
//     const { playerId } = req.params;

//     try {
//         // Fetch player details
//         const player = await Player.findById(playerId).populate('gameStats');
//         if (!player) {
//             return res.status(404).json({ message: 'Player not found' });
//         }

//         // Populate game details for each gameStat
//         const statsWithGames = await GameStat.find({ playerId }).populate('gameId');

//         // Format stats with game dates
//         const formattedStats = statsWithGames.map(stat => ({
//             date: stat.gameId.date,
//             points: stat.points,
//             assists: stat.assists,
//             blocks: stat.blocks,
//             rebounds: stat.rebounds,
//             steals: stat.steals,
//             fouls: stat.fouls,
//         }));

//         res.status(200).json({ stats: formattedStats });
        
//     } catch (error) {
//         console.error('Error fetching player stats:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };


// controllers/playerController.js
import Player from '../models/player.js';
import GameStat from '../models/gamestat.js';
import Game from '../models/game.js';
import Team from '../models/team.js'; 

export const getPlayerStats = async (req, res) => {
    const { playerId } = req.params;

    try {
        // Fetch player details
        const player = await Player.findById(playerId).populate('gameStats');
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        // Fetch player's team ID
        const playerTeamId = player.teamId;

        // Populate game details for each gameStat
        const statsWithGames = await GameStat.find({ playerId }).populate('gameId');

        // Format stats with game dates and opponent
        const formattedStats = await Promise.all(statsWithGames.map(async stat => {
            const game = await Game.findById(stat.gameId).populate(['homeTeamId', 'awayTeamId']);
            const opponentTeamId = game.homeTeamId.equals(playerTeamId) ? game.awayTeamId : game.homeTeamId;
            const opponentTeam = await Team.findById(opponentTeamId);

            return {
                date: stat.gameId.date,
                points: stat.points,
                assists: stat.assists,
                blocks: stat.blocks,
                rebounds: stat.rebounds,
                steals: stat.steals,
                fouls: stat.fouls,
                opponent: opponentTeam.name,  // Adding opponent team name
            };
        }));

        res.status(200).json({ stats: formattedStats });
        
    } catch (error) {
        console.error('Error fetching player stats:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
