// controllers/leaderboardController.js
import GameStat from '../models/gamestat.js';
import Player from '../models/player.js';

// Utility function to get top 10 players in a specific stat per game
const getTopPlayers = async (statField) => {
    const results = await GameStat.aggregate([
        {
            $lookup: {
                from: 'players',
                localField: 'playerId',
                foreignField: '_id',
                as: 'player'
            }
        },
        {
            $unwind: '$player'
        },
        {
            $group: {
                _id: '$playerId',
                playerName: { $first: '$player.name' },
                gamesPlayed: { $sum: 1 },
                totalStat: { $sum: `$${statField}` },
            }
        },
        {
            $project: {
                playerName: 1,
                gamesPlayed: 1,
                totalStat: 1,
                statPerGame: { $divide: ['$totalStat', '$gamesPlayed'] }
            }
        },
        {
            $sort: { statPerGame: -1 }
        },
        {
            $limit: 10
        }
    ]);

    return results;
};

// Controller function to get the leaderboard
export const getLeaderboard = async (req, res) => {
    try {
        const pointsLeaderboard = await getTopPlayers('points');
        const assistsLeaderboard = await getTopPlayers('assists');
        const reboundsLeaderboard = await getTopPlayers('rebounds');
        const stealsLeaderboard = await getTopPlayers('steals');
        const blocksLeaderboard = await getTopPlayers('blocks');

        res.status(200).json({
            points: pointsLeaderboard,
            assists: assistsLeaderboard,
            rebounds: reboundsLeaderboard,
            steals: stealsLeaderboard,
            blocks: blocksLeaderboard,
        });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
