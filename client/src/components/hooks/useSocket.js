import { useEffect } from "react";
import { socket } from "@/services/socket";

export const useSocketEvent = (event) => {
  const emitEvent = (payload) => socket.emit(event, { ...payload });

  return emitEvent;
};

export const useSocketListener = (event, action) => {
  useEffect(() => {
    socket.on(event, action);

    return () => {
      socket.off(event);
    };
  }, []);
};

export const useSocket = (baseEvent, action, loadingHandler, errorHandler) => {
  useSocketListener(`${baseEvent}:success`, (payload) => {
    action(payload);
    loadingHandler(false);
  });
  useSocketListener(`${baseEvent}:error`, (error) => {
    errorHandler(error);
    loadingHandler(false);
  });

  const event = useSocketEvent(baseEvent);

  const handleEvent = (payload) => {
    loadingHandler(true);
    event(payload);
  };

  return handleEvent;
};
