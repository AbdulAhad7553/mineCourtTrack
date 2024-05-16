import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    name : {type: String, required: true},
    jerseyNumber : {type: Number, required: true},
    position: {type: String, required: true},
    age: {type: Number},
    affiliation: {type: String},
    phoneNumber: {type: Number}
});

const Player = mongoose.model('Player', playerSchema);

export default Player;