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

    socket.emit("game:start:success", updatedGame);
    // TODO: update game
    // TODO: update player
  },
};
