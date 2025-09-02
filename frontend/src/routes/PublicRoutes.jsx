import { Routes, Route } from "react-router-dom";
import Resetpassword from "../components/Authentication/Resetpassword/Resetpassword";
import Details from "../components/Authentication/Resetpassword/Details";
import Userroute from "../middleware/Userroute";
import Login from "../components/Authentication/Login";
import Register from '../components/Authentication/Register'
export default function PublicRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Userroute>
            <Login />
          </Userroute>
        }
      />
      <Route
        path="/register"
        element={
          <Userroute>
            <Register />
          </Userroute>
        }
      />
      <Route
        path="/reset-password/:uid/:token"
        element={
          <Userroute>
            <Resetpassword />
          </Userroute>
        }
      />
      <Route
        path="/reset"
        element={
          <Userroute>
            <Details />
          </Userroute>
        }
      />
    </Routes>
  );
}
