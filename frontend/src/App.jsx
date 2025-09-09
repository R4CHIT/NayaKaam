import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import Privateroute from "./middleware/Privateroute";
import Userroute  from "./middleware/Userroute"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
  
          <Route path="/auth/*" element={<><PublicRoutes /></>} />
          <Route path="/*" element={<><PrivateRoutes /></>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
