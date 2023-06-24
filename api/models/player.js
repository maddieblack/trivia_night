import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  game_id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
    required: true,
  },
  role: {
    type: String,
    enum: ["player", "alex_trebek", "board"],
    required: true,
    default: "player",
  },
});

export const Player = mongoose.model("Player", PlayerSchema);
