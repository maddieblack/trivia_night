import { Game } from "../models/game.js";
import { generate } from "randomstring";
import axios from "axios";
import keyBy from "lodash/keyBy.js";
import sortBy from "lodash/sortBy.js";

export default {
  newGame: async () => {
    const room_code = generate({ length: 5 }).toUpperCase();
    const game = new Game({
      room_code,
      players: [],
      questions: null,
    });

    return await game.save();
  },
  updateGame: async (game) => {
    console.log("UPDATE GAME", game);
    const newGame = await Game.findOneAndUpdate({ _id: game._id }, { ...game })
      .populate({ path: "players", model: "Player" })
      .populate({ path: "logs", model: "Log" })
      .exec();

    return newGame;
  },
  getGame: async (_id) => {
    return await Game.findOne({ _id })
      .populate({ path: "players", model: "Player" })
      .populate({ path: "logs", model: "Log" })
      .exec();
  },
  getGameByRoomCode: async (room_code) => {
    return await Game.findOne({ room_code })
      .populate({ path: "players", model: "Player" })
      .populate({ path: "logs", model: "Log" })
      .exec();
  },
  fetchBoardQuestions: async (is_double_jeopardy = false) => {
    const response = await axios.get(`https://jservice.io/api/random?count=6`);

    const random_questions = response.data.map((q) => ({
      category_id: q.category_id,
      game_id: q.game_id,
    }));

    const categories = await axios.all(
      random_questions.map((q) =>
        axios.get(`https://jservice.io/api/category?id=${q.category_id}`)
      )
    );

    const categoryGameIds = keyBy(random_questions, "category_id");

    return categories.map(({ data }) => {
      const trimmedClues = data.clues.filter(
        (clue) => clue.game_id === categoryGameIds[data.id].game_id
      );

      const sortedAndReAssigned = sortBy(trimmedClues, "value").map(
        (clue, i) => {
          const reassignedValue = (i + 1) * 200;
          return {
            ...clue,
            value: is_double_jeopardy ? reassignedValue * 2 : reassignedValue,
            testing: "hi",
          };
        }
      );

      return { ...data, clues: sortedAndReAssigned };
    });
  },
  fetchFinalJeopardy: async () => {
    const finalJeopardy = await axios.get(
      `https://jservice.io/api/final?count=1`
    );

    return finalJeopardy.data;
  },
};
