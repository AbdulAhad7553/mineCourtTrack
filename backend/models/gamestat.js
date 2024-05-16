import mongoose, { Schema, mongo } from "mongoose";
import Game from "./game";

const gameStatSchema = new mongoose.Schema({
    playerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true }, // Reference to the player
    gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true }, // Reference to the game
    points: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    blocks: { type: Number, default: 0 },
    rebounds: { type: Number, default: 0 },
    steals: { type: Number, default: 0 },
    turnovers: { type: Number, default: 0 }
});

const GameStat = mongoose.model('GameStat', gameStatSchema);

export default GameStat;