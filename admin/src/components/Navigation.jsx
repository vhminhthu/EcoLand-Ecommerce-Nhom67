import { BiSolidDashboard } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { SiBlockchaindotcom } from "react-icons/si";
import { FaFileAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { TbCategoryFilled } from "react-icons/tb";
import { useState } from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navigation = ({ children }) => {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <BiSolidDashboard size={24} />, path: "/"  },
    { name: "User Management", icon: <FaUserGroup size={24} />, path: "/user"  },
    { name: "Category", icon: <TbCategoryFilled size={22} />, path: "/category"  },
    { name: "Product Management", icon: <BsFillBoxSeamFill size={20} /> , path: "/product"  },
    { name: "Blockchain", icon: <SiBlockchaindotcom size={22} /> , path: "/blockchain" },
    { name: "Report Management", icon: <FaFileAlt size={24} /> , path: "/report" },
    { name: "Roles", icon: <IoMdSettings size={25} />, path: "/roles"  },
    { name: "Logout", icon: <TbLogout2 size={25} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
    
      <div className="w-64 bg-white !p-5 shadow-lg hidden md:block">
        <h2 className="text-xl font-bold !mb-5">Admin</h2>
        <nav>
          <ul className="!space-y-6 font-bold text-[#2A7534]">
            {menuItems.map((item) => (
              <li key={item.name} onClick={() => setActive(item.name)}>
                <Link
                  to={item.path}
                  className={`!p-2 flex items-center gap-4 rounded-xl cursor-pointer ${
                    active === item.name ? "bg-[#E6EAE6] shadow-lg" : ""
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      
      <div className="flex-1 !p-5">{children}</div>
    </div>
  );
};

Navigation.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default Navigation;
