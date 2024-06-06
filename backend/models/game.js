import mongoose, { Schema } from "mongoose";
import GameStat from "./gamestat.js";

const gameSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    homeTeamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true }, // Reference to the home team
    awayTeamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true }, // Reference to the away team
    homeTeamName: {type: String},
    awayTeamName: {type: String},
    homeTeamScore: { type: Number},
    awayTeamScore: { type: Number},
    playerStats: [{ type: Schema.Types.ObjectId, ref: 'GameStat' }] // Array of references to player stats for this game
  
});

const Game = mongoose.model('Game', gameSchema);

export default Game;