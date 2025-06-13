import { GrTable } from "react-icons/gr";
import { TbTableFilled } from "react-icons/tb";

export default function LayoutBtn({ view, setView }) {
  return (
    <div className="w-full flex items-center justify-center gap-4 mb-5">
      <button
        onClick={() => setView("table")}
        className={`py-[6px] px-4 border dark:border-gray-600 rounded-sm flex items-center gap-1 text-sm dark:text-white ${
          view === "table" && "bg-gray-800 text-white dark:bg-blue-600"
        }`}
      >
        <GrTable /> Table View
      </button>
      <button
        onClick={() => setView("card")}
        className={`py-[6px] px-4 border dark:border-gray-600 rounded-sm flex items-center gap-1 text-sm dark:text-white ${
          view === "card" && "bg-gray-800 text-white dark:bg-blue-600"
        }`}
      >
        <TbTableFilled />  Card View
      </button>
    </div>
  );
}
