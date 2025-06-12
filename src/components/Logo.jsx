import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();
  return (
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
  );
}
