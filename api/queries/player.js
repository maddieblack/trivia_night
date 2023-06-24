import { Game } from "../models/game.js";
import { Player } from "../models/player.js";

export default {
  newPlayer: async (new_player) => {
    const game = await Game.findOne({ room_code: new_player.room_code });

    const player = await new Player({
      ...new_player,
      game_id: game._id,
    }).save();

    await Game.findOneAndUpdate(
      { _id: game._id },
      { players: [...game.players, player._id] }
    );

    const gameWithPlayers = await Game.findById(game._id)
      .populate({ path: "players", model: "Player" })
      .exec();

    return {
      game: gameWithPlayers,
      player,
    };
  },

  updatePlayer: async (player) => {
    const updated_player = await Player.findOneAndUpdate(
      { _id: player._id },
      player
    );

    return updated_player;
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

  getPlayer: async (_id) => {
    const player = await Player.findOne({ _id });
    return player;
  },
};
