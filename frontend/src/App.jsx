import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import Privateroute from "./middleware/Privateroute";
import Userroute from "./middleware/Userroute";
import PageNotFound from "./components/ui/pagenotfound/PagenotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <Privateroute>
                <PrivateRoutes />
              </Privateroute>
            }
          />
            <Route
              path="/auth/*"
              element={
                <Userroute>
                  <PublicRoutes />
                </Userroute>
              }
            />
           
        </Routes>
        
      </Router>
    </AuthProvider>
  );
}

export default App;
