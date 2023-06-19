import { Game } from "../models/game.js";
import { generate } from "randomstring";

export default {
  newGame: async () => {
    const room_code = generate({ length: 5 }).toUpperCase();
    const game = new Game({
      room_code,
      players: [],
      alex_trebek: null,
      questions: null,
    });

    return await game.save();
  },
  getGameByRoomCode: async (room_code) => {
    const game = await Game.findOne({ room_code });

    return game;
  },
};
