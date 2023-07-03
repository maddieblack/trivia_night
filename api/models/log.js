import mongoose from "mongoose";

import logEvents from "../constants/logEvents.js";

const LogSchema = new mongoose.Schema(
  {
    game_id: mongoose.Schema.Types.ObjectId,
    player_id: mongoose.Schema.Types.ObjectId,
    event: { type: String, required: true, enum: Object.values(logEvents) },
  },
  { timestamps: true }
);

export const Log = mongoose.model("Log", LogSchema);
