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
    questions: {
      jeopardy: [{ type: Object }],
      double_jeopardy: [{ type: Object }],
      final_jeopardy: [
        {
          type: Object,
        },
      ],
    },
    logs: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    has_control: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true }
);

export const Game = mongoose.model("Game", GameSchema);
