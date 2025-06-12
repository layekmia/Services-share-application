import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-10 px-6 pt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Logo/>
          <p className="mt-2 text-sm">
            Making everyday services easier, one step at a time.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/services" className="hover:underline">Services</Link></li>
            <li><Link to="/about-us" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-500 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-sky-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-400 transition"><FaGithub /></a>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} ServiceConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
