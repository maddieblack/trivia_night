import Queries from "../queries/index.js";

export default {
  "player:create": async (payload, socket, io) => {
    const { room_code } = payload;
    try {
      const response = await Queries.newPlayer(payload);

      socket.join(room_code);
      io.to(room_code).emit("player:create:success", response);
    } catch (error) {
      return console.log("Error", error);
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
};
