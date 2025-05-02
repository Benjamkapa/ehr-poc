import { createBrowserRouter } from "react-router-dom";
import "../App.css";
import LoginContainer from "../auth/LoginContainer";
import TwoFactorAuth from "../auth/TwoFactorAuth";
import Home from "../pages/Home";
import Index from "../pages/Dashboard/Index";
import Appointments from "../pages/appointments/Appointments";
import Prescription from "../pages/prescription/Prescription";
import Patients from "../pages/patients/Patients";
import Refferals from "../pages/referrals/Refferals";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LoginContainer />,
    },
    {
      path: "/2fa",
      element: <TwoFactorAuth />,
    },
    {
      path: "/app",
      element: <Home />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "appointments",
          element: <Appointments />,
        },
        {
          path: "prescription",
          element: <Prescription />,
        },
        {
          path: "patients",
          element: <Patients />,
        },
        {
          path: "referrals",
          element: <Refferals />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.MODE === "development" ? "/" : "/wanene-ehr/dist/",
  }
);

export default router;
