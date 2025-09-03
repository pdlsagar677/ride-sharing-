import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContext from "./context/UserContext.jsx";
import CaptainContext from "./context/CaptainContext.jsx";
import SocketPeovider from './context/SocketContext.jsx'



createRoot(document.getElementById("root")).render(
  <CaptainContext>
    <UserContext>
      <SocketPeovider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </SocketPeovider>
    </UserContext>
  </CaptainContext>
);
