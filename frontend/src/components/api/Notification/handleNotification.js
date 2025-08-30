const handleNotification = (user_id, setNotifications) => {
  if (!user_id || typeof setNotifications !== "function") return;

  const socket = new WebSocket(
    `ws://localhost:8000/ws/notification/${user_id}/`
  );
  socket.onmessage = (e) => {
    try {
      const data = JSON.parse(e.data);

      setNotifications(data);
    } catch (err) {
      console.error("Invalid websocket message:", e.data);
    }
  };

  socket.onclose = () => console.log("WebSocket closed");

  return socket;
};

export default handleNotification;
