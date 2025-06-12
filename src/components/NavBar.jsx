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
import Logo from "./Logo";

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
    <header className="shadow-md  w-full  dark:bg-gray-800 sticky top-0 z-50 bg-white">
      <nav className="container mx-auto flex items-center justify-between py-2 px-5  lg:h-[70px] ">
        <Logo />
        <NavMenu />

        <div className="flex items-center gap-4">
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
