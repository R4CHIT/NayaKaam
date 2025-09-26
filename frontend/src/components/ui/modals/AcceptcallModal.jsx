import React, { useContext } from "react";
import { FiPhone, FiX } from "react-icons/fi";
import { socketconnect, sendMessage } from "../../api/videocall/socketConect";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AcceptCallModal = ({ message, setShowCallingModal }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const socketRef = React.useRef(null);

  const onAccept = () => {
    socketRef.current = socketconnect(user.id, message.callerId, {
      onConnected: () => {
        sendMessage(socketRef.current, "call_accepted", {
          senderId: user.id,
          receiverId: message.callerId,
          timestamp: new Date().toISOString(),
        });
        setShowCallingModal(false);
        navigate("/videocall");
      },
    });
  };

  const onReject = () => setShowCallingModal(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 flex flex-col items-center space-y-4">
        <h2 className="text-lg font-semibold">Incoming Call</h2>
        <p className="text-gray-700 text-center">
          {message.caller || "Someone"} is calling you
        </p>
        <div className="flex space-x-6 mt-2">
          <button onClick={onAccept} className="bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition">
            <FiPhone size={24} />
          </button>
          <button onClick={onReject} className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 transition">
            <FiX size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptCallModal;
