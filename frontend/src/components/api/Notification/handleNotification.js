const handleNotification = (user_id, setNotifications, data, username) => {
  if (!user_id || typeof setNotifications !== "function") return;

  const socket = new WebSocket(
    `ws://localhost:8000/ws/notification/${user_id}/`
  );

  socket.onopen = () => {
    if (data != null || username != null) {
      if (location.pathname !== "/") {
        socket.send(
          JSON.stringify({
            message: data,
            sender: username,
          })
        );
      }
    }
  };

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
