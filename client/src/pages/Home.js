"use client";

import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

export const Home = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="font-gyparody text-white text-8xl">JEOPARDY!</h1>
      <Button className="bg-amber-400" onClick={() => router.push("/game")}>
        START GAME
      </Button>
    </div>
  );
};
