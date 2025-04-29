import { createBrowserRouter } from "react-router-dom";
import "../App.css";
import Home from "../pages/Home";
import Index from "../pages/Dashbaord/Index";
import Appointments from "../pages/appointments/Appointments";
import Prescription from "../pages/prescription/Prescription";
import Patients from "../pages/patients/Patients";
import Refferals from "../pages/referrals/Refferals";

const router = createBrowserRouter(
    [
  {
    path: "/",
    element: (
          <Home/>
           ),
  
    errorElement: <div>Error,Page not found</div>,
    children: [
        {
            path:"/",
            element:<Index/>
        },
        {
            path:"/appointments",
            element:<Appointments/>
        },    
        {
            path:"/prescription",
            element:<Prescription/>
        },  
      {
            path:"/patients",
            element:<Patients/>
        },   
        {
            path:"/referrals",
            element:<Refferals/>
        },        
    ],
  },
],

{
    basename:"/wanene-ehr/dist"
  }

);

export default router;


