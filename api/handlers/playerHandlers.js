import { Player } from "../models/player.js";
import { Game } from "../models/game.js";

export default {
  "player:create": async (payload, socket, io) => {
    const { room_code, name } = payload;

    socket.join(room_code);

    const game = await Game.findOne({ room_code });

    const player = new Player({
      room_code,
      name,
      game_id: game._id,
    });

    try {
      const new_player = await player.save();
      await Game.findOneAndUpdate(
        { _id: game._id },
        { players: [...game.players, new_player._id] }
      );

      const new_game = await Game.findById(game._id)
        .populate({ path: "players", model: "Player" })
        .exec();

      io.to(room_code).emit("player:create:success", new_game);
    } catch (error) {
      return console.log("Error", error);
    }
  },
};
