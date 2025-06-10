import { IoIosArrowDown } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { useService } from "../context/ServiceContext";

const menuItems = [
  { label: "Add Service", path: "/add-service" },
  { label: "Manage Services", path: "/manage-services" },
  { label: "Booked Service", path: "/booked-services" },
  { label: "Service-To-Do", path: "/todo" },
];

export default function NavMenu() {
  const {user} = useService();


  return (
    <ul className="flex items-center text-base  max-lg:hidden font-medium text-stone-700 dark:text-white">
      <li>
        <NavLink
          className={({ isActive }) =>
            `py-2 px-4 rounded ${
              isActive ? "bg-gray-50  dark:bg-gray-700" : ""
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
              isActive ? "bg-gray-50  dark:bg-gray-700" : ""
            }`
          }
          to="/services"
        >
          Services
        </NavLink>
      </li>
      {user && (
        <div
          className="relative flex items-center gap-1 cursor-pointer group py-2 px-1"
        >
          Dashboard <IoIosArrowDown className="text-gray-500 dark:text-white text-base" />
          <div
            className={`absolute top-10 hidden  group-hover:block z-20`}
          >
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
        </div>
      )}
    </ul>
  );
}
