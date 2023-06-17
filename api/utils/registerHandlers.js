export const registerHandlers = (handlers, socket, io) => {
  for (const key in handlers) {
    socket.on(key, (payload) => handlers[key](payload, socket));
  }
};
