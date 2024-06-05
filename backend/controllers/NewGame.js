import Game from '../models/game.js';
import GameStat from '../models/gamestat.js'
import Player from '../models/player.js';

export const createNewGame = async (req, res) => {
    try {
        const { homeTeam, awayTeam, homeStartingFive, awayStartingFive, homeSubstitutes, awaySubstitutes } = req.body;

        // Create a new game document
        const newGame = new Game({
            date: new Date(),
            homeTeamId: homeTeam,
            awayTeamId: awayTeam,
            homeTeamScore: 0,
            awayTeamScore: 0,
            playerStats: []
        });

        // Save the game to get the gameId
        const savedGame = await newGame.save();

        res.status(201).json({ message: 'Game created successfully', game: newGame });
    } catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
