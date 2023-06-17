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
  is_alex_trebek: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export const Player = mongoose.model("Player", PlayerSchema);
