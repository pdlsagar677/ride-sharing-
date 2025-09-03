import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Start from "./pages/Start";
import UserSignup from "./pages/UserSignup";
import { ToastContainer } from "react-toastify";
import CaptainSignup from "./pages/CaptainSignup";
import UserLogin from "./pages/UserLogin";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />

        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="captain-login" element={<CaptainLogin />} />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
