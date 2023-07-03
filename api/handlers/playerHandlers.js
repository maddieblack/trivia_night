import Queries from "../queries/index.js";

export default {
  "player:create": async (payload, socket, io) => {
    const { room_code } = payload;
    try {
      const { game, player } = await Queries.newPlayer(payload);

      socket.join(room_code);
      io.to(room_code).emit("player:create:success", { player, game });
    } catch (err) {
      io.to(room_code).emit("player:create:error", err);
      console.error(err);
    }
  },

  "player:update": async (player, socket, io) => {
    const game = await Queries.getGame(player.game_id);
    try {
      const updated_player = await Queries.updatePlayer(player);

      io.to(game.room_code).emit("player:update:success", {
        player: updated_player,
        game,
      });
    } catch (err) {
      io.to(game.room_code).emit("player:create:error", err);
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
      io.to(room_code).emit("player:delete:error", err);
      console.error(err);
    }
  },
  "player:fetch": async ({ _id }, socket) => {
    try {
      const player = await Queries.getPlayer(_id);
      socket.emit("player:fetch:success", { player });
    } catch (err) {
      socket.emit("player:fetch:error", err);
      console.error(err);
    }
  },
};
