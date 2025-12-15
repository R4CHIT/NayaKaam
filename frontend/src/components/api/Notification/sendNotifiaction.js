
const sendNotifiaction = (user_id,data,username) => {
  if (!user_id) return;

  const socket = new WebSocket(
    `ws://nayakaam.onrender.com/ws/notification/${user_id}/`
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
  socket.onclose = () => console.log("WebSocket closed");
}

export default sendNotifiaction
