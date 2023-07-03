/* eslint-disable no-undef */

import React, { useContext, useEffect, useState } from "react";
import { events } from "@/constants";
import { PlayerContext } from "@/context/PlayerProvider";

export const HereAreTheCategories = ({
  game,
  updateGame,
  round = "jeopardy",
  player,
}) => {
  let interval;
  const [inSpotlight, setInSpotlight] = useState(0);

  const updateInterval = () => {
    interval =
      !interval &&
      setInterval(() => {
        setInSpotlight((prev) => prev + 1);
      }, 2500);

    if (inSpotlight === game.questions[round].length) {
      clearInterval(interval);
      updateGame({
        game,
        log: { event: events.HERE_ARE_THE_CATEGORIES_J, player_id: player._id },
      });
    }
  };

  useEffect(() => {
    if (game._id) {
      updateInterval();
    }

    return () => clearInterval(interval);
  }, [inSpotlight]);

  console.log({ game });

  return (
    <div>
      {game?.questions?.[round].map((q, i) => {
        const airDate = new Date(q.clues[0].airdate);
        return (
          i === inSpotlight && (
            <div
              key={q.id}
              className="h-screen w-screen font-oswald font-bold text-white text-7xl flex items-center justify-center text-center flex-col  "
              style={{
                textShadow: ".4vw .4vw black",
                fontSize: "6vw",
                border: "3vw solid black",
              }}
            >
              <span className="mb-[2vw]">{q.title.toUpperCase()}</span>
              <span className="text-[3vw]">{airDate.getFullYear()}</span>
            </div>
          )
        );
      })}
    </div>
  );
};
