const sendMessage = () => {
  const socket = new WebSocket("ws://localhost:8000/ws/message/1/2/");
  socket.onopen = () => {
    console.log("connected");
    socket.send(
      JSON.stringify({
        data: {
          message: "Hello, this is a test message!",
          sender: 1, // sender ID
          receiver: 2, // receiver ID
        },
      })
    );
  };
  socket.onclose = () => {
    console.log("closed");
  };
};

export default sendMessage;
