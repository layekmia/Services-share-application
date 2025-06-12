import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Optional, for routing

const EmptyPage = ({title, description, path, icon, btnText}) => {
  return (
    <motion.div
      className="flex flex-col items-center mt-10 justify-center text-center px-6 py-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-blue-100 text-blue-600 p-6 rounded-full mb-6">
        {icon}
      </div>

      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {description}
      </p>

      <Link to={path}>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow transition">
          {btnText}
        </button>
      </Link>
    </motion.div>
  );
};

export default EmptyPage;
