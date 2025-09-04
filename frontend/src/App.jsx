import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoute from "./middleware/Privateroute";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <AuthProvider>
      <Router>
        <Routes>
        {user ?(
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <PrivateRoutes />
              </PrivateRoute>
            }
          />
        ):(
           <Route path="/*" element={<PublicRoutes />} />
        )}
    
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
