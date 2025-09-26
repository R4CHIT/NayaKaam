import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PeerProvider } from "./context/peer.jsx";
createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <PeerProvider>
        <App />
      </PeerProvider>
    </AuthProvider>
  </>
);
