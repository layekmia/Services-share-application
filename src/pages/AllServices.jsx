import { HiMagnifyingGlass } from "react-icons/hi2";
import Services from "../components/Services";
import { useState } from "react";

export default function AllServices() {
  const [query, setQuery] = useState('');

  return (
    <div className="container mx-auto px-5">
      <div className="w-full flex items-center flex-col justify-center h-[50vh]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-stone-700 dark:text-white">
          Find & Book Service <br /> Provider Easily
        </h1>
        <div className="mt-6 max-w-xl mx-auto relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value) }
            placeholder="Search service..."
            className="w-full py-3 dark:bg-gray-900 pl-12 pr-4 rounded-full shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <HiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>
      </div>
      <Services search={query}/>
    </div>
  );
}
