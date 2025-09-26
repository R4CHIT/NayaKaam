import React, { useState, useEffect, useRef } from "react";
import { socketconnect } from "../../api/videocall/socketConect";
import { useNavigate, useParams } from "react-router-dom";

const WaitingForPeople = () => {
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const { callerid, receiverid } = useParams();
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = socketconnect(callerid, receiverid, {
      onCallAccepted: () => setStatus("accepted"),
    });

    return () => socketRef.current?.close();
  }, [callerid, receiverid]);

  useEffect(() => {
    if (status === 'accepted') navigate('/videocall');
  }, [status, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <p className="ml-4 text-lg text-gray-700">
        Waiting for the other person to join...
      </p>
    </div>
  );
};

export default WaitingForPeople;
