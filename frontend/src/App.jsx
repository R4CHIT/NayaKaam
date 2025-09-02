import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<PrivateRoutes />} />
          <Route path="/*" element={<PublicRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
