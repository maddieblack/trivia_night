import { socket } from "@/services/socket";

export const useSocketEvent = (event) => {
  const emitEvent = (payload) => socket.emit(event, payload);

  return emitEvent;
};
