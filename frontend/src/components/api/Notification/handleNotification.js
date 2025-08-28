
import { useEffect, useState } from "react";

const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log(userId)
    if (!userId) return;
    const socket = new WebSocket(`ws://localhost:8000/ws/notifications/${userId}/`);

    socket.onopen = () => console.log("WS connected ✅");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications(prev => [data, ...prev]);
    };

    socket.onclose = () => console.log("WS disconnected ❌");
    socket.onerror = (err) => console.error("WS error:", err);

    return () => socket.close();
  }, [userId]);

  return notifications;
};

export default useNotifications;
