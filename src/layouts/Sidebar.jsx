import { NavLink } from "react-router-dom";
import {BsPeopleFill} from "react-icons/bs";
import { FiMenu, FiHome } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { BsPrescription2 } from "react-icons/bs";
import { VscReferences } from "react-icons/vsc";




const menuItems = [
  { icon: <FiHome size={24} />, label: "Dashboard", path: "/" },
  { icon: <SlCalender size={24} />, label: "Appointments", path: "/appointments" },
  { icon: <BsPrescription2 size={24} />, label: "Prescription", path: "/prescription" },
  { icon: <BsPeopleFill size={24} />, label: "Patients", path: "/patients" },
  { icon: <VscReferences size={24} />, label: "Referrals", path: "/referrals" },


]; 

const Sidebar  = ({ isCollapsed, setIsCollapsed })  => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white  flex flex-col transition-all duration-300 text-sm ${
        isCollapsed ? "w-20" : "w-60"
      }`}
    >
      {/* Sidebar Toggle Button */}
      <button
        className="text-white mb-5 p-5 bg-primary  flex items-center justify-between cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {!isCollapsed && <span className="text-white font-bold text-md">DR WANENE EHR</span>}
        <FiMenu size={24} />
      </button>

      {/* Menu Items */}
      <ul className="flex flex-col space-y-4 p-4">
        {menuItems.map((item, index) => (
          <li key={index} className="relative group">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 rounded-md transition-all duration-200 ${
                  isActive ? "bg-primary text-white font-bold" : ""
                }`
              }
            >
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>

            {/* Tooltip (Only visible when collapsed) */}
            {isCollapsed && (
              <span className="absolute left-12 bg-black text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
