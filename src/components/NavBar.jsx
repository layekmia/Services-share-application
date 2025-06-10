import { FaUser } from "react-icons/fa";
import NavMenu from "./NavMenu";
import { IoIosMoon } from "react-icons/io";
import { useTheme } from "../context/ThemeContext";
import { MdSunny } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useService } from "../context/ServiceContext";
import { Dropdown, DropdownHeader, DropdownItem } from "flowbite-react";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";

export default function NavBar() {
  const { darkMode, setDarkMode } = useTheme();
  const { signout } = useAuth();

  const { user } = useService();

  const navigate = useNavigate();
  const { setIsOpen } = useService();

  async function handleLogout() {
    try {
      await signout();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <header className="shadow-md  w-full  dark:bg-gray-800">
      <nav className="container mx-auto flex items-center justify-between py-2 px-5">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Servi
            <span className="text-blue-600 dark:text-blue-400">Sphere</span>
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <NavMenu />

          {user ? (
            <>
              <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <img
                    src={user.image}
                    alt="User profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-stone-300 cursor-pointer"
                  />
                )}
              >
                <div>
                  <DropdownHeader>
                    <span className="block text-sm">{user.name}</span>
                    <span className="block truncate text-sm font-medium">
                      {user.email}
                    </span>
                  </DropdownHeader>
                  <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
                </div>
              </Dropdown>
            </>
          ) : (
            <div>
              <button
                onClick={() => navigate("/login")}
                className="py-2 px-5 bg-blue-600 text-white rounded-md max-md:hidden"
              >
                Login
              </button>
            </div>
          )}
           <button
            onClick={() => setDarkMode((mode) => !mode)}
            className="text-xl text-gray-500 dark:text-gray-400"
          >
            {darkMode ? <MdSunny /> : <IoIosMoon />}
          </button>
          <button
            className="text-gray-700 dark:text-white text-2xl md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <HiBars3BottomRight />
          </button>
         
        </div>
      </nav>
    </header>
  );
}
