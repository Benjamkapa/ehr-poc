import { useEffect, useRef, useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

const AutoLogoutHandler = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const timerId = useRef(null);
  const [shouldLogout, setShouldLogout] = useState(false);

  useEffect(() => {
    if (shouldLogout) {
      logout();
      navigate("/", { replace: true });
    }
  }, [shouldLogout, logout, navigate]);

  const logoutAfterTimeout = () => {
    setShouldLogout(true);
  };

  const resetTimer = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    // Set inactivity timeout to 15 seconds
    timerId.current = setTimeout(logoutAfterTimeout, 60000);
  };

  useEffect(() => {
    if (!user) {
      // If no user logged in, clear timer
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      return;
    }

    // List of events to detect user activity
    const events = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    // Reset timer on any user activity
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Start the timer initially
    resetTimer();

    return () => {
      // Cleanup event listeners and timer on unmount
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [user]);

  return null;
};

export default AutoLogoutHandler;
