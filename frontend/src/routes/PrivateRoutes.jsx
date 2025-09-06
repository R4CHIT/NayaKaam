import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Navigation from "../components/Mainpage/Navbar/Navigation";
import Main from "../components/Mainpage/Main";
import ProviderMain from "../components/ProviderDetails/ProviderMain";
import MainDashboard from "../components/Dashboard/MainDashboard";
import ServicesMain from "../components/Services/ServicesMain";
import Profilemain from "../components/profile/Profilemain";
import EditProfile from "../components/profile/editProfile/EditProfile";
import ProviderMainDetail from "../components/ProviderList/ProviderMain";
import handleNotification from "../components/api/Notification/handleNotification";
import { toast, ToastContainer } from "react-toastify";
import UserRatingModal from "../components/ui/modals/UserRatingModal";

export default function PrivateRoutes() {
  const { role, user } = useContext(AuthContext);
  const userid = user?.id;
  const [notificationstatus, setNotificationStatus] = useState(false);

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [providerid,setProviderid]=useState(null)
  useEffect(() => {
    if (!userid) return;

    const socket = handleNotification(userid, ({ message, sender }) => {
      setNotificationStatus(true);
      console.log(message)
      setProviderid(message.providerId)
      if (message.status === "completed") {
        setCurrentBooking({ ...message, sender });
        setShowRatingModal(true);
      } else {
        toast.info(
          <div>
            <strong>{sender || "Someone"}</strong> {message.status} your booking at {message.location}.
            <div className="text-sm opacity-90">{message.notes}</div>
          </div>,
          { position: "top-right" }
        );
      }
    });

    return () => socket.close();
  }, [userid]);

  return (
    <>
      <Navigation
        role={role}
        notificationstatus={notificationstatus}
        setNotificationStatus={setNotificationStatus}
      />

      <Routes>
        <Route path="/" element={<Main role={role} />} />
        <Route path="/providerauth" element={<ProviderMain />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="services" element={<ServicesMain />} />
        <Route path="/profile" element={<Profilemain />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/booking/:id" element={<ProviderMainDetail />} />
        
        <Route path="/becomeapro" element={<ProviderMain />} />
      </Routes>

      <ToastContainer autoClose={2000} />

      {showRatingModal && currentBooking && (
        <UserRatingModal
          booking={currentBooking}
          onClose={() => setShowRatingModal(false)}
          id={providerid}
        />
      )}
    </>
  );
}
