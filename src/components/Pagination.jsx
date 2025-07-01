import { assets } from "../assets/assets";

export default function Pagination({
  setCurrentPage,
  totalPages,
  currentPage,
}) {



  const increase = () => {
   if(currentPage < totalPages) {
    setCurrentPage(current => current + 1)
   }
  }
  const decrease = () => {
    if(currentPage > 1){
      setCurrentPage(current => current - 1);
    }
  }

  return (
    <div
      className="flex items-center justify-center space-x-2 mt-10
            "
    >
      <a href="#job-list">
        <img
          onClick={decrease}
          src={assets.left_arrow_icon}
          alt=""
        />
      </a>
      {Array.from({ length: totalPages }).map((_, index) => (
        <a href="#job-list" key={index + 1}>
          <button
            onClick={() => setCurrentPage(index + 1)}
            className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded  dark:text-white ${
              currentPage === index + 1
                ? "bg-blue-100 text-blue-500 dark:bg-gray-600"
                : "text-gray-500"
            }`}
          >
            {index + 1}
          </button>
        </a>
      ))}
      <a href="#job-list">
        <img
          onClick={increase}
          src={assets.right_arrow_icon}
          alt=""
        />
      </a>
    </div>
  );
}
