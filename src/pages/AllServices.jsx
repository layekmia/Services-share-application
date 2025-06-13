import { HiMagnifyingGlass } from "react-icons/hi2";
import Services from "../components/Services";
import { useEffect, useState } from "react";
import BASE_URL, {
  locationCategories,
  serviceCategories,
} from "../utils/helper";
import axios from "axios";

export default function AllServices() {
  const [query, setQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);

  const [services, setServices] = useState([]);
  const [filterServices, setFilterServices] = useState(services);

  // fetch all services
  useEffect(() => {
    async function getServices() {
      try {
        setIsLoading(true);
        const result = await axios.get(`${BASE_URL}/services`);
        setServices(result.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getServices();
  }, []);

  useEffect(() => {
    setFilterServices(services);
  }, [services]);


  // handleChange category
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocation((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    const matchesCategory = (service) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(service.category);
    const matchesLocation = (service) =>
      selectedLocation.length === 0 || selectedLocation.includes(service.area);
    const matchesTitle = (service) =>
      !query || service.title.toLowerCase().includes(query.toLocaleLowerCase());

    const newFilteredServices = services
      .slice()
      .filter(
        (service) =>
          matchesCategory(service) &&
          matchesLocation(service) &&
          matchesTitle(service)
      );
    setFilterServices(newFilteredServices);
  }, [services, selectedCategories, selectedLocation, query]);

  // Change the website title
  useEffect(() => {
    document.title = "All Services | ServiceSphere";
  }, []);

  return (
    <div className="container mx-auto px-5 py-10">
      <div className="w-full flex items-center flex-col justify-center h-[50vh]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-stone-700 dark:text-white">
          Find & Book Service <br /> Provider Easily
        </h1>
        <div className="mt-6 max-w-xl mx-auto relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search service..."
            className="w-full py-3 dark:bg-gray-900 dark:text-gray-200 pl-12 pr-4 rounded-full shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <HiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] items-start gap-5">
        <div>
          <button
            onClick={() => setShowFilter((show) => !show)}
            className="py-[6px] px-6 border w-fit rounded border-gray-400 cursor-pointer lg:hidden dark:text-white"
          >
            {showFilter ? "Close" : "Filters"}
          </button>
          <h2 className="py-[6px] px-6 border max-lg:hidden w-fit rounded border-gray-400 cursor-pointer dark:text-white">
            Filters
          </h2>
          <div className={`${!showFilter && "max-lg:hidden"}`}>
            <div>
              <h2 className="py-4 text-lg font-semibold dark:text-white">
                Search by Categories
              </h2>
              <ul className="flex flex-col gap-2">
                {serviceCategories.map((category, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      onChange={() => handleCategoryChange(category)}
                      checked={selectedCategories.includes(category)}
                    />
                    <span className="text-base font-medium text-gray-600 dark:text-gray-200">
                      {category}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-12">
              <h2 className="py-4 text-lg font-semibold dark:text-white">
                Search by Categories
              </h2>
              <ul className="flex flex-col gap-2">
                {locationCategories.map((location, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      onChange={() => handleLocationChange(location)}
                      checked={selectedLocation.includes(location)}
                    />
                    <span className="text-base font-medium text-gray-600 dark:text-gray-200">
                      {location}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl py-2 font-ReemKufi dark:text-white">Latest Services</h2>
          <p className="mb-8 text-sm text-gray-800 dark:text-gray-200">
            Get your desired service from top providers
          </p>
          <Services
            isLoading={isLoading}
            services={services}
            filteredServices={filterServices}
          />
        </div>
      </div>
    </div>
  );
}
