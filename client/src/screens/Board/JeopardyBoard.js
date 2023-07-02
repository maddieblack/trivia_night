import React from "react";
import { unzip } from "lodash";

export const JeopardyBoard = ({ round, game, updateGame }) => {
  const categories = game.questions[round];

  const clues = unzip(categories.map((cat) => cat.clues).reverse());

  return (
    <div
      className="grid grid-cols-6 h-screen w-screen bg-black"
      style={{ gap: ".75vw" }}
    >
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="bg-blue-900 font-oswald font-extrabold text-white flex justify-center items-center text-center"
          style={{
            fontSize: "clamp(32px, 2.1vw, 120px)",
            textShadow: ".25vw .25vw black",
            padding: ".5vw",
            borderBottom: ".5vw solid black",
          }}
        >
          {cat.title.toUpperCase()}
        </div>
      ))}
      {clues.map((row, i) => {
        return row.map((clue) => (
          <div
            className="bg-blue-900 font-oswald text-amber-400 flex justify-center items-center "
            key={clue.id}
            style={{
              fontSize: "clamp(32px, 4vw, 150px)",
              textShadow: ".2vw .2vw black",
            }}
          >
            ${clue.value}
          </div>
        ));
      })}
    </div>
  );
};
