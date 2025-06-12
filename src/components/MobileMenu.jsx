import { Link, NavLink, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import { useService } from "../context/ServiceContext";
import { MdOutlineArrowRight } from "react-icons/md";
import { RiArrowDropRightLine } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";

const menuItems = [
  { label: "Add Service", path: "/add-service" },
  { label: "Manage Services", path: "/manage-services" },
  { label: "Booked Service", path: "/booked-services" },
  { label: "Service-To-Do", path: "/todo" },
];

export default function MobileNabMenu() {
  const { isOpen, setIsOpen } = useService();
  const { user } = useService();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
        setShowDropdown(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, setIsOpen]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0  z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        ref={menuRef}
        className={`fixed top-0 bg-white dark:bg-gray-800 h-screen w-[250px] z-50 md:hidden ${
          isOpen ? "-translate-x-2.5" : "-translate-x-[110%]"
        } transition-transform duration-500`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="text-right w-full px-5 py-3 bg-blue-600 dark:bg-dark-background flex items-center gap-2 justify-end text-white font-semibold text-sm  font-poppins uppercase"
        >
          close <RxCross1 />
        </button>
        <ul className="flex flex-col">
          <li>
            <NavLink
              to="/"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `py-[10px] border-b block pl-10 hover:text-blue-600 dark:border-gray-600 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-600"
                    : "text-gray-700 dark:text-white"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `py-[10px] border-b block pl-10 hover:text-blue-600 dark:border-gray-600 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-600"
                    : "text-gray-700 dark:text-white"
                }`
              }
            >
              Services
            </NavLink>
          </li>
          {user && (
            <div
              onClick={() => {
                setShowDropdown((open) => !open);
              }}
              className={`py-[10px] border-b dark:border-gray-600 flex flex-col items-start  hover:text-blue-600 dark:text-white relative`}
            >
              <div
                className={`flex items-center justify-between w-full pr-2 pl-10 ${
                  showDropdown ? "text-blue-600" : ""
                }`}
              >
                Dashboard{" "}
                {showDropdown ? (
                  <FaChevronDown />
                ) : (
                  <RiArrowDropRightLine className="text-2xl" />
                )}
              </div>
              <div>
                <ul
                  className={`w-[250px] bg-gray-50 text-sm font-medium dark:bg-gray-700 ${
                    showDropdown ? "block" : "hidden"
                  }`}
                >
                  {menuItems.map((item) => (
                    <li
                      key={item.path}
                      className="border-b last:border-b-0 dark:border-gray-600"
                    >
                      <Link
                        to={item.path}
                        className="text-base py-2 block text-gray-700 pl-12 dark:text-gray-300"
                        onClick={handleLinkClick}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {!user && (
            <button
              onClick={() => {
                navigate("/login");
                handleLinkClick();
              }}
              className="mt-5 py-[6px] w-fit mx-auto rounded-md px-5 bg-blue-600 text-white dark:text-white dark:bg-gray-900"
            >
              sign In
            </button>
          )}
        </ul>
      </div>
    </>
  );
}
