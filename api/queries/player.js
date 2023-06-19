import { Game } from "../models/game.js";
import { Player } from "../models/player.js";

export default {
  newPlayer: async ({ room_code, name }) => {
    const game = await Game.findOne({ room_code });

    const player = new Player({
      room_code,
      name,
      game_id: game._id,
    });

    const new_player = await player.save();
    await Game.findOneAndUpdate(
      { _id: game._id },
      { players: [...game.players, new_player._id] }
    );

    return {
      game: await Game.findById(game._id)
        .populate({ path: "players", model: "Player" })
        .exec(),
      player: new_player,
    };
  },

  deletePlayer: async (_id) => {
    const game = await Game.findOne().where("players").in(_id);

    const updated_players = [...game.players].filter(
      (player) => player === _id
    );

    await Game.findOneAndUpdate(
      { _id: game._id },
      { players: updated_players }
    );

    return await Player.deleteOne({ _id });
  },
};
