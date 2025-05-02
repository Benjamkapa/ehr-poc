import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "./useAuth";

const roleRedirectMap = {
  admin: "/app",
  doctor: "/app",
  nurse: "/app",
  receptionist: "/app",
  pharmacist: "/app",
  "lab technician": "/app",
  cashier: "/app",
  "hospital administrator": "/app",
  patient: "/app",
  "triage nurse": "/app",
};

const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await auth.login(email, password);
    if (success) {
      setError("");
      // Redirect to 2FA page after login
      navigate("/2fa");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Login
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

export default LoginContainer;
