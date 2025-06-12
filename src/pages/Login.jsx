import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLock } from "react-icons/ci";
import { Spinner } from "flowbite-react";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../firebase/firebase";
import LoginAnimation from "../components/animation/LoginAnimation";
import { useAuth } from "../context/AuthProvider";

export default function Login() {
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { userLogin } = useAuth();
  const provider = new GoogleAuthProvider();

    useEffect(() => {
      document.title = "ServiceSphere | Login";
    }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await userLogin(email, password);

      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.code === "auth/invalid-credential")
        toast.error("Invalid email or password. please try gain");
      else toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      toast.error("something went wrong" + error.message);
    }
  }

  return (
    <div className=" py-5 dark:bg-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2  container mx-auto px-4">
        <div className="h-screen max-md:hidden">
          <LoginAnimation />
        </div>
        <div className="h-[calc(100vh-60px)] pt-16 bg-background ">
          <div className="bg-white dark:bg-[#1f2937] py-5 px-4 w-[300px] mx-auto   rounded-md text-center font-sans ">
            <h2 className="text-xl font-semibold text-secondary mb-4 dark:text-white">
              Login
            </h2>
            <button
              className="flex items-center justify-center gap-2 border dark:border-gray-600 dark:text-white bg-gray-50 py-[6px] px-5 rounded-md text-base font-medium w-full dark:bg-dark-background"
              onClick={handleGoogleLogin}
            >
              <img
                className="w-5"
                src="https://cdn.iconscout.com/icon/free/png-512/free-google-logo-icon-download-in-svg-png-gif-file-formats--brands-pack-logos-icons-189824.png?f=webp&w=256"
                alt=""
              />
              Google
            </button>
            <div className="relative before:content-[''] after:content-[''] before:absolute after:absolute before:h-[1px] after:h-[1px] before:w-[120px] after:w-[120px] before:top-1/2 after:top-1/2 before:-translate-y-1/2 after:-translate-y-1/2 before:left-0 after:right-0 before:bg-gray-300 after:bg-gray-300 mb-2">
              <span className="text-gray-500 font-semibold">or</span>
            </div>
            <form onSubmit={handleLogin}>
              <div className="relative mb-4">
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  className="dark:text-gray-300 border dark:bg-dark-background dark:border-gray-600 w-full py-[6px] pl-10 rounded-[3px] text-gray-700 placeholder:text-gray-500 outline-none focus:ring-[1.5px] focus:ring-primary dark:ring-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
                  <MdOutlineMailOutline />
                </span>
              </div>
              <div className="relative mb-2">
                <input
                  required
                  type={`${isShowPass ? "text" : "password"}`}
                  placeholder="Password"
                  className="dark:text-gray-300 border dark:bg-dark-background dark:border-gray-600 w-full py-[6px] pl-10 rounded-[3px] text-gray-700 placeholder:text-gray-500 outline-none focus:ring-[1.5px] focus:ring-primary dark:ring-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
                  <CiLock />
                </span>
                <span
                  className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setIsShowPass((pass) => !pass)}
                >
                  {isShowPass ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <button
                disabled={isLoading}
                className={`py-[6px] bg-primary dark:bg-gray-700 w-full rounded-md mt-5 bg-blue-600 text-white  font-medium text-base ${
                  isLoading ? "opacity-50" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <Spinner
                      size="sm"
                      aria-label="Info spinner example"
                      className="me-3"
                      light
                    />
                    logging...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>
            <p className="text-secondary font-medium mt-5 text-sm dark:text-white">
              Don't have an account?
              <button
                onClick={() => navigate("/register")}
                className="text-blue-600 text-sm hover:underline dark:text-gray-300 "
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
