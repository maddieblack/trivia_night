import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export const FullScreenLoader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-3 md:gap-6 tv:gap-20">
      <h1 className="font-gyparody text-white text-3xl md:text-5xl tv:text-[10rem] ">
        JEOPARDY!
      </h1>
      <div className="max-w-xl">
        <FontAwesomeIcon
          className="text-white text-2xl md:text-4xl tv:text-[8rem]"
          icon={faGear}
          spin
        />
      </div>
    </div>
  );
};
