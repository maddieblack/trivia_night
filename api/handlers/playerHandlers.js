import Queries from "../queries/index.js";

export default {
  "player:create": async (payload, socket, io) => {
    const { room_code } = payload;
    try {
      const { game, player } = await Queries.newPlayer(payload);

      socket.join(room_code);
      io.to(room_code).emit("player:create:success", { player, game });
      io.to(room_code).emit("game:update:success", { game });
    } catch (error) {
      return console.log("Error", error);
    }
  },

  "player:update": async (player, socket, io) => {
    try {
      const updated_player = await Queries.updatePlayer(player);
      const game = await Queries.getGame(player.game_id);

      io.to(game.room_code).emit("player:update:success", {
        player: updated_player,
        game,
      });
    } catch (err) {
      console.error(err);
    }
  },

  "player:delete": async ({ _id, room_code }, socket, io) => {
    try {
      await Queries.deletePlayer(_id);

      const game = await Queries.getGameByRoomCode(room_code);

      socket.leave(room_code);

      io.to(room_code).emit("player:delete:success", game);
    } catch (err) {
      console.log(err);
    }
  },
  "player:fetch": async ({ _id }, socket) => {
    try {
      const player = await Queries.getPlayer(_id);
      socket.emit("player:fetch:success", { player });
    } catch (err) {
      console.log(err);
    }
  },
};
