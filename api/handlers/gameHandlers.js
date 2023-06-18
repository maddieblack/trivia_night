import { generate } from "randomstring";
import { Game } from "../models/game.js";

export default {
  "game:create": async (payload, socket) => {
    const room_code = generate({ length: 5 }).toUpperCase();

    socket.join(room_code);

    const game = new Game({
      room_code,
      players: [],
      alex_trebek: null,
      questions: null,
    });

    try {
      const new_game = await game.save();
      socket.emit("game:create:success", new_game);
    } catch (error) {
      return console.log(error);
    }
  },

  "game:select_alex": async (payload, socket) => {
    // TODO: update game
    // TODO: update player
  },
};
