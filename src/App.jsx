import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Principal from "./pages/Principal.jsx";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/principal" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/principal" />} />
        <Route path="/principal" element={user ? <Principal /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/principal" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
