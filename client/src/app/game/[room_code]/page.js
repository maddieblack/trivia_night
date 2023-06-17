"use client";

import React, { useContext, useEffect } from "react";
import { GameContext } from "@/context/GameProvider";
import { Button } from "@/components/Button";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/navigation";

export const GameRoom = ({ params }) => {
  return <div>game started</div>;
};

export default GameRoom;
