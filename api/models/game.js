import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
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
      final_jeopardy: [
        {
          type: Object,
        },
      ],
    },
    step: {
      type: String,
      default: "INITIAL",
      required: true,
    },
  },
  { timestamps: true }
);

export const Game = mongoose.model("Game", GameSchema);
