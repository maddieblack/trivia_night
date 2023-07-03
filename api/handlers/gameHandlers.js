import Queries from "../queries/index.js";
import logEvents from "../constants/logEvents.js";

export default {
  "game:create": async (payload, socket, io) => {
    try {
      const new_game = await Queries.newGame();
      const { player, game } = await Queries.newPlayer({
        room_code: new_game.room_code,
        name: "Board",
        role: "board",
      });
      socket.join(game.room_code);
      io.to(game.room_code).emit("game:create:success", {
        game: new_game,
      });
      io.to(game.room_code).emit("player:create:success", {
        player,
        game: new_game,
      });
    } catch (err) {
      console.error(err);
      socket.emit("game:create:error", err);
    }
  },

  "game:start": async (payload, socket, io) => {
    try {
      const jeopardyBoard = await Queries.fetchBoardQuestions();
      const doubleJeopardyBoard = await Queries.fetchBoardQuestions(true);
      const finalJeopardyBoard = await Queries.fetchFinalJeopardy();

      const contestants = payload.players.filter((p) => p.role !== "player");

      await Queries.createLog(
        logEvents.INITIALIZE,
        payload._id,
        payload.alex_trebek
      );

      const game = {
        ...payload,
        questions: {
          jeopardy: jeopardyBoard,
          double_jeopardy: doubleJeopardyBoard,
          final_jeopardy: finalJeopardyBoard,
        },
        has_control: contestants[0]._id,
      };

      const updated_game = await Queries.updateGame(game);

      const updated_player = await Queries.updatePlayer({
        _id: payload.alex_trebek,
        role: "alex_trebek",
      });

      io.to(updated_game.room_code).emit("player:update:success", {
        player: updated_player,
        game: updated_game,
      });
      io.to(updated_game.room_code).emit("game:start:success", updated_game);
    } catch (err) {
      console.error(err);
      io.to(payload.room_code).emit("game:start:error", err);
    }
  },

  "game:fetch": async (payload, socket, io) => {
    try {
      const game = await Queries.getGameByRoomCode(payload.room_code);

      socket.join(payload.room_code);

      io.to(payload.room_code).emit("game:fetch:success", { game });
    } catch (err) {
      console.log(err);
      io.to(payload.room_code).emit("game:fetch:error", err);
    }
  },

  "game:update": async ({ game, log }, socket, io) => {
    try {
      await Queries.createLog(log.event, game._id, log.player_id);

      const updatedGame = await Queries.updateGame(game);

      io.to(game.room_code).emit("game:update:success", { game: updatedGame });
    } catch (err) {
      console.error(err);
      io.to(game.room_code).emit("game:update:error", err);
    }
  },
};
