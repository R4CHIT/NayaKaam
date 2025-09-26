
const socketconnect = (
  senderId,
  receiverId,
  { onConnected, onCallReceived, onCallAccepted, onICECandidate, onDisconnected, onError } = {}
) => {
  const socket = new WebSocket(`ws://127.0.0.1:8000/ws/call/${senderId}/${receiverId}/`);

  socket.onopen = () => {
    console.log("✅ WebSocket connected");
    onConnected?.();
  };

  socket.onmessage = (event) => {
    try {
      const response = JSON.parse(event.data);
      console.log("📩 Incoming message:", response);
      const { type, data } = response;

      switch (type) {
        case "connection":
          console.log("🔗 Server:", data.message);
          break;
        case "call_received":
          onCallReceived?.(data);
          break;
        case "call_accepted":
          console.log("✅ Call accepted", data);
          onCallAccepted?.(data);
          break;
        case "ICEcandidate":
          onICECandidate?.(data);
          break;
        default:
          console.warn("⚠️ Unknown message type:", type);
      }
    } catch (err) {
      console.error("⚠️ Failed to parse WebSocket message:", err);
    }
  };

  socket.onclose = () => {
    console.log("❌ WebSocket disconnected");
    onDisconnected?.();
  };

  socket.onerror = (err) => {
    console.error("❌ WebSocket error", err);
    onError?.(err);
  };

  return socket; 
};

const sendMessage = (socketInstance, type, data) => {
  if (socketInstance && socketInstance.readyState === WebSocket.OPEN) {
    socketInstance.send(JSON.stringify({ type, data }));
  } else {
    console.warn("⚠️ WebSocket not connected yet.");
  }
};

export { socketconnect, sendMessage };
