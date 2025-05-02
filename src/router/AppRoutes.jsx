import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Index from "../pages/Dashboard/Index";
import Appointments from "../pages/appointments/Appointments";
import Prescription from "../pages/prescription/Prescription";
import Patients from "../pages/patients/Patients";
import Refferals from "../pages/referrals/Refferals";
import LoginContainer from "../auth/LoginContainer";
import TwoFactorAuth from "../auth/TwoFactorAuth";
import { useAuth } from "../auth/useAuth";

const roleAllowed = [
  "admin",
  "doctor",
  "nurse",
  "receptionist",
  "pharmacist",
  "lab technician",
  "cashier",
  "hospital administrator",
  "patient",
  "triage nurse",
];

const AppRoutes = () => {
  const { user, twoFactorVerified } = useAuth();
  const location = useLocation();

  if (!user) {
    if (location.pathname !== "/") {
      return <Navigate to="/" replace />;
    }
  } else {
    if (!twoFactorVerified && location.pathname !== "/2fa") {
      return <Navigate to="/2fa" replace />;
    }
    if (twoFactorVerified && location.pathname === "/") {
      return <Navigate to="/app" replace />;
    }
  }

  if (user && !roleAllowed.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<LoginContainer />} />
      <Route path="/2fa" element={<TwoFactorAuth />} />
      <Route path="/app" element={<Home />}>
        <Route index element={<Index />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="prescription" element={<Prescription />} />
        <Route path="patients" element={<Patients />} />
        <Route path="referrals" element={<Refferals />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
