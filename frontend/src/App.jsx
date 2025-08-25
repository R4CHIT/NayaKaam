import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./middleware/Privateroute";
import Userroute from "./middleware/Userroute";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Main from "./components/Mainpage/Main";
import ProviderMain from "./components/ProviderDetails/ProviderMain";
import Details from "./components/Authentication/Resetpassword/Details";
import Resetpassword from "./components/Authentication/Resetpassword/Resetpassword";
import MainDashboard from "./components/Dashboard/MainDashboard"
import ServicesMain from "./components/Services/ServicesMain";
import Navigation from "./components/Mainpage/Navbar/Navigation";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import { useEffect,useState } from "react";
import Profilemain from "./components/profile/Profilemain";
import EditProfile from "./components/profile/editProfile/EditProfile";
import ProviderMainDetail from './components/ProviderList/ProviderMain'
import MyBookingsPage from "./components/MyBookings/BookingMain";
function App() {
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
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

          {/* Private Routes */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <AuthenticatedApp />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
 {/* Private Routes */}
function AuthenticatedApp() {
  const { getUserRole, user } = useContext(AuthContext);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user?.id) {
      getUserRole(user.id, setRole);
    }
  }, [user]);

  return (
    <>
      <Navigation role={role} />
      <Routes>
        <Route path="/" element={<Main role={role} />} />
        <Route path="/providerauth" element={<ProviderMain />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="services" element={<ServicesMain />} />
        <Route path="/profile" element={<Profilemain />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/booking/:id" element={<ProviderMainDetail />} />
        <Route path="mybooking" element={<MyBookingsPage />}/>
        <Route path="/becomeapro" element={<ProviderMain />}/>
      </Routes>
    </>
  );
}


export default App;
