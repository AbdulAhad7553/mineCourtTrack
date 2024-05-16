import mongoose, { Schema } from "mongoose";

const playerSchema = new mongoose.Schema({
    name : {type: String, required: true},
    jerseyNumber : {type: Number, required: true, unique: true},
    position: {type: String, required: true},
    age: {type: Number},
    affiliation: {type: String},
    phoneNumber: {type: Number},
    teamId: { type: Schema.Types.ObjectId, ref: 'Team'},
    gameStats: [{type: Schema.Types.ObjectId, ref: 'GameStat'}]
});

const Player = mongoose.model('Player', playerSchema);

export default Player;