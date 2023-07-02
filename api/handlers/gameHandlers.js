import Queries from "../queries/index.js";

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
    } catch (error) {
      socket.emit("game:create:error", error);
      return console.log(error);
    }
  },

  "game:start": async (payload, socket, io) => {
    try {
      const jeopardyBoard = await Queries.fetchBoardQuestions();
      const doubleJeopardyBoard = await Queries.fetchBoardQuestions(true);
      const finalJeopardyBoard = await Queries.fetchFinalJeopardy();

      const updatedGame = {
        ...payload,
        questions: {
          jeopardy: jeopardyBoard,
          double_jeopardy: doubleJeopardyBoard,
          final_jeopardy: finalJeopardyBoard,
        },
      };

      await Queries.updateGame(updatedGame);
      const updated_player = await Queries.updatePlayer({
        _id: payload.alex_trebek,
        role: "alex_trebek",
      });

      io.to(updatedGame.room_code).emit("player:update:success", {
        player: updated_player,
        game: updatedGame,
      });
      io.to(updatedGame.room_code).emit("game:start:success", updatedGame);
    } catch (err) {
      io.to(payload.room_code).emit("game:start:error", err);

      console.log({ err });
    }
  },

  "game:fetch": async (payload, socket, io) => {
    try {
      const game = await Queries.getGameByRoomCode(payload.room_code);

      socket.join(payload.room_code);

      io.to(payload.room_code).emit("game:fetch:success", { game });
    } catch (err) {
      io.to(payload.room_code).emit("game:fetch:error", err);

      console.log(err);
    }
  },

  "game:update": async (payload, socket, io) => {
    console.log({ payload });
    try {
      const game = await Queries.updateGame(payload);

      console.log("HANDLER", game);

      io.to(payload.room_code).emit("game:update:success", { game: payload });
    } catch (err) {
      io.to(payload.room_code).emit("game:update:error", err);
    }
  },
};
