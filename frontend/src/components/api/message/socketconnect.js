let socket;

const socketconnect = (user_id, receiver_id, setMessages) => {
  socket = new WebSocket(
    `ws://nayakaam.onrender.com/ws/message/${user_id}/${receiver_id}/`
  );

  socket.onopen = () => {
    console.log("✅ WebSocket connected");
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      
      console.log(data)
      if (setMessages && typeof setMessages === "function" && user_id===data.data.message.recipient) {
        if (data.data.message !== "Connected"){
          setMessages(prev => [data.data.message,...prev]);
        }

      }
    } catch (err) {
      console.error("⚠️ Failed to parse WebSocket message:", err);
    }
  };

  socket.onerror = (error) => {
    console.error("❌ WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("🔌 WebSocket connection closed");
  };

  return socket;
};

const sendMessage = (message, sender, receiver) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        data: {
          message,
          sender,
          receiver,
        },
      })
    );
  } else {
    console.warn("⚠️ WebSocket not connected yet.");
  }
};

export { socketconnect, sendMessage };
