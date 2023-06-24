export const itsMe = (room_code, player) => {
  const sessionId = sessionStorage.getItem(room_code);

  if (!sessionId) return true;

  return sessionId === player._id;
};
