import { useEffect } from "react";
import { socket } from "@/services/socket";

export const useSocketListener = (event, action) => {
  useEffect(() => {
    socket.on(event, action);

    return () => {
      socket.off(event);
    };
  }, []);
};
