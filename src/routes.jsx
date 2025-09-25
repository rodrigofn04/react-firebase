import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Principal from './pages/Principal';
import ProtectedRoute from './components/ProtectedRoute';


export default function AppRoutes() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Navigate to="/login" replace />} />
<Route path="/cadastro" element={<Register />} />
<Route path="/login" element={<Login />} />
<Route
path="/principal"
element={
<ProtectedRoute>
<Principal />
</ProtectedRoute>
}
/>
</Routes>
</BrowserRouter>
);
}