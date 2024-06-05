import mongoose, { Schema } from "mongoose";
import Player from '../models/player.js';  // Ensure you have the Player model imported

const gameStatSchema = new mongoose.Schema({
    playerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true }, // Reference to the player
    playerName: { type: String }, // Field for the player name
    gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true }, // Reference to the game
    points: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    blocks: { type: Number, default: 0 },
    rebounds: { type: Number, default: 0 },
    steals: { type: Number, default: 0 },
    fouls: { type: Number, default: 0 }
});

// Middleware to populate playerName before saving
gameStatSchema.pre('save', async function(next) {
    try {
        const player = await Player.findById(this.playerId);
        if (player) {
            this.playerName = player.name;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const GameStat = mongoose.model('GameStat', gameStatSchema);

export default GameStat;
