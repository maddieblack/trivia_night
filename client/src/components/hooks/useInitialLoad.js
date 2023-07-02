import { useContext, useEffect, useState } from "react";
import { GameContext } from "@/context/GameProvider";
import { PlayerContext } from "@/context/PlayerProvider";
import { useSocketEvent } from "@/components/hooks/useSocket";
import isEmpty from "lodash/isEmpty";

export const useInitialLoad = (room_code) => {
  const [loading, setLoading] = useState(true);
  const { game } = useContext(GameContext);
  const { player } = useContext(PlayerContext);

  const fetchGame = useSocketEvent("game:fetch");
  const fetchPlayer = useSocketEvent("player:fetch");

  useEffect(() => {
    if (isEmpty(game) && isEmpty(player)) {
      fetchGame({
        room_code,
      });

      // eslint-disable-next-line no-undef
      const id = sessionStorage.getItem(room_code);

      fetchPlayer({ _id: id });
    }
  }, []);

  useEffect(() => {
    if (loading && !isEmpty(game) && !isEmpty(player)) {
      setLoading(false);
    }
  }, [game, player]);

  return { loading };
};
