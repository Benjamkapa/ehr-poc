// import { NavLink } from "react-router-dom";
// import {BsPeopleFill} from "react-icons/bs";
// import { FiMenu, FiHome } from "react-icons/fi";
// import { SlCalender } from "react-icons/sl";
// import { BsPrescription2 } from "react-icons/bs";
// import { VscReferences } from "react-icons/vsc";




// const menuItems = [
//   { icon: <FiHome size={24} />, label: "Dashboard", path: "/" },
//   { icon: <SlCalender size={24} />, label: "Appointments", path: "/appointments" },
//   { icon: <BsPrescription2 size={24} />, label: "Prescription", path: "/prescription" },
//   { icon: <BsPeopleFill size={24} />, label: "Patients", path: "/patients" },
//   { icon: <VscReferences size={24} />, label: "Referrals", path: "/referrals" },
// ]; 

// const Sidebar  = ({ isCollapsed, setIsCollapsed })  => {
//   return (
//     <div
//       className={`fixed top-0 left-0 h-screen bg-white  flex flex-col transition-all duration-300 text-sm ${
//         isCollapsed ? "w-20" : "w-60"
//       }`}
//     >
//       {/* Sidebar Toggle Button */}
//       <button
//         className="text-white mb-5 p-5 bg-primary  flex items-center justify-between cursor-pointer"
//         onClick={() => setIsCollapsed(!isCollapsed)}
//       >
//         {!isCollapsed && <span className="text-white font-bold text-md">DR WANENE EHR</span>}
//         <FiMenu size={24} />
//       </button>

//       {/* Menu Items */}
//       <ul className="flex flex-col space-y-4 p-4">
//         {menuItems.map((item, index) => (
//           <li key={index} className="relative group">
//             <NavLink
//               to={item.path}
//               className={({ isActive }) =>
//                 `flex items-center space-x-2 p-2 rounded-md transition-all duration-200 ${
//                   isActive ? "bg-primary text-white font-bold" : ""
//                 }`
//               }
//             >
//               {item.icon}
//               {!isCollapsed && <span>{item.label}</span>}
//             </NavLink>

//             {/* Tooltip (Only visible when collapsed) */}
//             {isCollapsed && (
//               <span className="absolute left-12 bg-black text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 {item.label}
//               </span>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BsPeopleFill,
  BsPrescription2,
} from "react-icons/bs";
import { FiMenu, FiHome } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { VscReferences } from "react-icons/vsc";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa6";
import { LiaStethoscopeSolid } from "react-icons/lia";

const staticMenuItems = [
  { icon: <FiHome size={20} />, label: "Dashboard", path: "/" },
  { icon: <SlCalender size={20} />, label: "Appointments", path: "/appointments" },
  { icon: <BsPrescription2 size={20} />, label: "Prescription", path: "/prescription" },
  { icon: <BsPeopleFill size={20} />, label: "Patients", path: "/patients" },
  { icon: <VscReferences size={20} />, label: "Referrals", path: "/referrals" },
];

const collapsibleItems = [
  {
    key: "billing",
    icon: <RiMoneyDollarBoxLine size={20} />,
    label: "Billing",
    children: ["Patients Bills", "Over the Counter", "Receipts"],
  },
  {
    key: "clinical",
    icon: <LiaStethoscopeSolid size={20} />,
    label: "Clinical",
    children: ["Vitals", "Consultations", "Lab Orders"],
  },
];

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const toggleDropdown = (key) => {
    setActiveDropdown(prev => (prev === key ? null : key));
  };

  const sidebarWidth = !isCollapsed || isHovering ? "w-60" : "w-20";

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white flex flex-col text-sm z-50 transition-all duration-300 ${sidebarWidth}`}

    >
      {/* Toggle button */}
      <button
        className="text-white mb-3 p-5 bg-primary flex items-center justify-between cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {!isCollapsed  || isHovering? (
          <span className="text-white font-bold text-md">DR WANENE EHR</span>
        ) : null}
        <FiMenu size={24} />
      </button>

      {/* Menu */}
      <ul  onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)} className="flex flex-col pl-2">
        {staticMenuItems.map((item, idx) => (
          <li key={idx}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 rounded-md transition-all duration-200 ${
                  isActive ? "text-primary font-bold" : ""
                }`
              }
            >
              {item.icon}
              {(!isCollapsed || isHovering) && <span>{item.label}</span>}
            </NavLink>
          </li>
        ))}

        {collapsibleItems.map(({ key, icon, label, children }) => (
          <li key={key}>
            <div
              onClick={() => toggleDropdown(key)}
              className="flex justify-between items-center p-2 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                {icon}
                {(!isCollapsed || isHovering) && <span>{label}</span>}
              </div>
              {(!isCollapsed || isHovering) && (
                <FaAngleRight
                  className={`transform transition-transform ${
                    activeDropdown === key ? "rotate-90" : ""
                  }`}
                />
              )}
            </div>
            <ul
              className={`pl-10 bg-gray-100 text-sm transition-all duration-300 ease-in-out ${
                activeDropdown === key && (!isCollapsed || isHovering) ? "block" : "hidden"
              }`}
            >
              {children.map((child, i) => (
                <li key={i} className="py-1 text-gray-600 hover:text-primary cursor-pointer">
                  {child}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
