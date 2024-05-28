import mongoose, { Schema } from "mongoose";

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    jerseyNumber: { type: Number, required: true },
    position: { type: String, required: true },
    age: { type: Number },
    affiliation: { type: String },
    phoneNumber: { type: Number },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    gameStats: [{ type: Schema.Types.ObjectId, ref: 'GameStat' }]
});

// Composite unique index
playerSchema.index({ teamId: 1, jerseyNumber: 1 }, { unique: true });

const Player = mongoose.model('Player', playerSchema);

export default Player;
