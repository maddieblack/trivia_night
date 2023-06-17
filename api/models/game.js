import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  room_code: {
    type: String,
    required: true,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  alex_trebek: {
    type: String,
    default: null,
  },
  questions: {
    jeopardy: [{ type: Object }],
    double_jeopardy: [{ type: Object }],
    final_jeopardy: {
      type: Object,
      default: {},
    },
  },
});

export const Game = mongoose.model("Game", GameSchema);
