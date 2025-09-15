import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch } from "./redux/store";
import { loadToken } from "./redux/slices/authSlice";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Setting from "./pages/Setting/Setting";
import Profile from "./pages/Profile/Profile";
import Followers from "./pages/Followers/Followers";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Following from "./pages/Following/Following";
import Posts from "./pages/Posts/Posts";

// Redirect based on token for root "/"
function RedirectHome() {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/setting" replace /> : <Navigate to="/login" replace />;
}

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirects based on token */}
        <Route path="/" element={<RedirectHome />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route path="/setting" element={<ProtectedRoutes><Setting /></ProtectedRoutes>} />
        <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
        <Route path="/followers/:id" element={<ProtectedRoutes><Followers /></ProtectedRoutes>} />
        <Route path="/following/:id" element={<ProtectedRoutes><Following /></ProtectedRoutes>} />
        <Route path="/posts/:id" element={<ProtectedRoutes><Posts /></ProtectedRoutes>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
