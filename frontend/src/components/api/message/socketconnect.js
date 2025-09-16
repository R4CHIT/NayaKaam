let socket;

const socketconnect = (user_id, receiver_id, setMessages) => {
  socket = new WebSocket(
    `ws://localhost:8000/ws/message/${user_id}/${receiver_id}/`
  );

  socket.onopen = () => {
    console.log("✅ WebSocket connected");
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      
      
      if (setMessages && typeof setMessages === "function" && user_id!==data.data.message.recipient) {
          console.log("📩 Incoming:", data.data.message);
        setMessages(prev => [...prev, data.data.message]);

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
