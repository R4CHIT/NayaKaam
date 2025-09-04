import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../middleware/Privateroute";
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
import MyBookingsPage from "../components/MyBookings/BookingMain";
import handleNotification from "../components/api/Notification/handleNotification";
import { toast, ToastContainer } from "react-toastify";

export default function PrivateRoutes() {
  const { getUserRole, user } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [notifications, setNotifications] = useState([]);
  const userid = user?.id;
  const [notificationstatus, setNotificationStatus] = useState(false);

  useEffect(() => {
    if (user?.id) getUserRole(user.id, setRole);
  }, [user]);

  useEffect(() => {
    if (!userid) return;

    const socket = handleNotification(userid, ({ message, sender }) => {
      setNotificationStatus(true);

      toast.info(
        <div>
          <strong>{sender || "Someone"}</strong>{message.status} {message.location}
          <div className="text-sm opacity-90">{message.notes}</div>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
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
        <Route path="mybooking" element={<MyBookingsPage />} />
        <Route path="/becomeapro" element={<ProviderMain />} />
      </Routes>
      <ToastContainer autoClose={2000} />
    </>
  );
}
