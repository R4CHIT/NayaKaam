import { Routes, Route } from "react-router-dom";
import Resetpassword from "../components/Authentication/Resetpassword/Resetpassword";
import Details from "../components/Authentication/Resetpassword/Details";
import Userroute from "../middleware/Userroute";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import PrivateRoute from "../middleware/Privateroute";
export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password/:uid/:token" element={<Resetpassword />} />
      <Route path="/reset" element={<Details />} />
    </Routes>
  );
}
