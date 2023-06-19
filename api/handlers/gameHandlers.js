import Queries from "../queries/index.js";

export default {
  "game:create": async (payload, socket) => {
    try {
      const new_game = await Queries.newGame();
      socket.join(new_game.room_code);
      socket.emit("game:create:success", new_game);
    } catch (error) {
      return console.log(error);
    }
  },

  "game:start": async (payload, socket) => {
    // TODO: update game
    // TODO: update player
  },
};
