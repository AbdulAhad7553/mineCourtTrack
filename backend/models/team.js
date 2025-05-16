import mongoose, { Schema } from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  primaryColor: { type: String, required: true },
  secondaryColor: { type: String, required: true },
  coach: { type: String},
  teamManager: { type: String},
  players: [{ type: Schema.Types.ObjectId, ref: "Player" }], // Array of player IDs
  teamPhotoURL: {type: String},
  isActive: {type: Boolean, default: true}
});

const Team = mongoose.model('Team', teamSchema);

export default Team;

