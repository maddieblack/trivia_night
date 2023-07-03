import { Log } from "../models/log.js";
import { Game } from "../models/game.js";

export default {
  createLog: async (event, game_id, player_id) => {
    try {
      const log = await new Log({
        event,
        game_id,
        player_id,
      }).save();

      const game = await Game.findOne({ _id: game_id });

      await Game.findOneAndUpdate(
        { _id: game_id },
        { logs: [...game.logs, log._id] }
      );

      return log;
    } catch (err) {
      console.error(err);
    }
  },
};
