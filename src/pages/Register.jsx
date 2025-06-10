import { useState } from "react";
import SignUpAnimation from "../components/animation/SignUpAnimation";
import { IoLink } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";
import auth from "../firebase/firebase";
import { Spinner } from "flowbite-react";
import { GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";

const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { createAccount } = useAuth();

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  async function handleSignUp(e) {
    e.preventDefault();

    if (!isValidPassword.test(formData.password)) {
      return toast.error("password to weak");
    }

    try {
      setIsLoading(true);
      await createAccount(formData.email, formData.password);
      toast.success("account created successfully");
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });
      setFormData({
        name: "",
        email: "",
        photoURL: "",
        password: "",
      });
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Already have an account with this email");
          break;
        case "auth/weak-password":
          toast.error("Password to weak");
          break;
        case "auth/invalid-email":
          toast.error("Invalid Email address");
          break;
        case "auth/network-request-failed":
          toast.error("Network error. please try again");
          break;
        default:
          toast.error("something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleRegister() {
    try{
      await signInWithPopup(auth, provider);
    }catch(error){
      toast.error(`Something went wrong ${error.message}`)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className=" py-5 dark:bg-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2  container mx-auto px-4">
        <div className="h-screen max-md:hidden">
          <SignUpAnimation />
        </div>
        <div className="bg-white dark:bg-gray-800 h-fit py-5 px-4 w-[300px] lg:w-[400px] mx-auto mt-10  rounded-md text-center font-sans ">
          <h2 className="text-xl font-semibold text-secondary mb-4 uppercase dark:text-white">
            Create an Account
          </h2>

          <button
            className="flex items-center justify-center gap-2 border dark:border-gray-600 dark:text-white bg-gray-50  py-[6px] px-5 rounded-md text-base font-medium w-full dark:bg-dark-background"
            onClick={handleGoogleRegister}
          >
            <img
              className="w-5"
              src="https://cdn.iconscout.com/icon/free/png-512/free-google-logo-icon-download-in-svg-png-gif-file-formats--brands-pack-logos-icons-189824.png?f=webp&w=256"
              alt=""
            />
            Google
          </button>

          <div className="relative before:content-[''] after:content-[''] before:absolute after:absolute before:h-[1px] after:h-[1px] before:w-[150px] after:w-[150px] before:top-1/2 after:top-1/2 before:-translate-y-1/2 after:-translate-y-1/2 before:left-0 after:right-0 before:bg-gray-300 after:bg-gray-300 mb-2">
            <span className="text-gray-500 font-semibold">or</span>
          </div>
          <form onSubmit={handleSignUp}>
            <div className="relative mb-4">
              <input
                required
                type="text"
                placeholder="Name"
                className="dark:text-gray-300 border dark:bg-dark-background dark:border-gray-600 w-full py-[6px] pl-10 rounded-[3px] text-gray-700 placeholder:text-gray-500 outline-none focus:ring-[1.5px] focus:ring-primary dark:focus:ring-gray-400"
                value={formData.name}
                name="name"
                onChange={handleChange}
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
                <FaUser />
              </span>
            </div>
            <div className="relative mb-4">
              <input
                required
                type="text"
                placeholder="Photo URL"
                name="photoURL"
                className="dark:text-gray-300 border dark:bg-dark-background dark:border-gray-600 w-full py-[6px] pl-10 rounded-[3px] text-gray-700 placeholder:text-gray-500 outline-none focus:ring-[1.5px] focus:ring-primary dark:focus:ring-gray-400"
                value={formData.photoURL}
                onChange={handleChange}
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
                <IoLink />
              </span>
            </div>
            <div className="relative mb-4">
              <input
                required
                type="email"
                name="email"
                placeholder="Email Address"
                className="dark:text-gray-300 border dark:bg-dark-background dark:border-gray-600 w-full py-[6px] pl-10 rounded-[3px] text-gray-700 placeholder:text-gray-500 outline-none focus:ring-[1.5px] focus:ring-primary dark:focus:ring-gray-400"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
                <MdOutlineMailOutline />
              </span>
            </div>
            <div className="relative mb-2">
              <input
                required
                type={`${showPass ? "text" : "password"}`}
                placeholder="Password"
                name="password"
                className="dark:text-gray-300 border dark:bg-dark-background dark:border-gray-600 w-full py-[6px] pl-10 rounded-[3px] text-gray-700 placeholder:text-gray-500 outline-none focus:ring-[1.5px] focus:ring-primary dark:focus:ring-gray-400"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xl text-gray-400">
                <CiLock />
              </span>
              <span
                className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPass((pass) => !pass)}
              >
                {showPass ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <button
              disabled={isLoading}
              className={`py-[6px] bg-primary bg-blue-600 dark:bg-gray-700 w-full rounded-md mt-5 text-white font-medium text-base ${
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
                  creating...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>
          <p className="text-secondary font-medium mt-5 text-sm dark:text-white">
            Don't have an account?
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 text-sm hover:underline dark:text-gray-400 "
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
