import GameQueries from "./game.js";
import PlayerQueries from "./player.js";
import LogQueries from "./log.js";

export default {
  ...GameQueries,
  ...PlayerQueries,
  ...LogQueries,
};
