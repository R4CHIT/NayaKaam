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
import Navigation from "./components/Mainpage/Navbar/Navigation";
import MainDashboard from "./components/Dashboard/MainDashboard"
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes for Unauthenticated Users */}
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

          {/* Private Routes - Authenticated Users Only */}
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
function AuthenticatedApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/providerauth" element={<ProviderMain />} />
        <Route path="/dashboard" element={<MainDashboard/>} />
      </Routes>
    </>
  );
}

export default App;
