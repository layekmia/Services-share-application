import { IoIosArrowDown } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { useService } from "../context/ServiceContext";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  { label: "Add Service", path: "/add-service" },
  { label: "Manage Services", path: "/manage-services" },
  { label: "Booked Service", path: "/booked-services" },
  { label: "Service-To-Do", path: "/todo" },
];

export default function NavMenu() {
  const { user } = useService();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropRef = useRef();
  const toggleButtonRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        dropRef.current &&
        !dropRef.current.contains(e.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <ul className="flex items-center text-base  max-md:hidden font-medium text-stone-700 dark:text-white">
      <li>
        <NavLink
          className={({ isActive }) =>
            `py-2 px-4 rounded ${
              isActive ? "bg-gray-100  dark:bg-gray-700" : ""
            }`
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `py-2 px-4 rounded ${
              isActive ? "bg-gray-100  dark:bg-gray-700" : ""
            }`
          }
          to="/services"
        >
          Services
        </NavLink>
      </li>
      {user && (
        <div
          ref={toggleButtonRef}
          onClick={() => setShowDropdown((open) => !open)}
          className="relative flex items-center gap-1 cursor-pointer  py-2 px-1 ml-1"
        >
          Dashboard
          <IoIosArrowDown className="text-gray-500 dark:text-white text-base" />
          {showDropdown && (
            <div ref={dropRef} className={`absolute top-[55px]`}>
              <ul
                className={`bg-white shadow-md z-10 pt-2  w-[180px] text-sm font-medium dark:bg-gray-700  left-0 top-10`}
              >
                {menuItems.map((item) => (
                  <li
                    key={item.path}
                    className="border-b last:border-b-0 dark:border-gray-600 px-5 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Link
                      to={item.path}
                      className="text-base py-2 block text-gray-700 dark:text-gray-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </ul>
  );
}
