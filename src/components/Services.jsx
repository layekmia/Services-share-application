import axios from "axios";
import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import BASE_URL from "../utils/helper";
import LoadSpinner from "./Spinner";

export default function Services({ search }) {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getServices() {
      try {
        setIsLoading(true)
        const result = await axios.get(`${BASE_URL}/services`);
        setServices(result.data);
      } catch (error) {
        console.log(error.message);
      }finally{
      setIsLoading(false)
    }
    }

    getServices();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) =>
        service.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [search, services]);

  if(isLoading) return <LoadSpinner/>

  return (
    <section className="max-w-6xl mx-auto px-1 py-14">
      <div className="grid grid-cols-1 gap-6">
        {filteredServices?.map((service) => (
          <div
            key={service._id}
            className="border rounded-lg shadow-sm p-4 flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 dark:border-gray-600"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full sm:w-48 h-32 md:h-40 object-cover rounded"
            />

            <div className="flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">
                  {service.description.slice(0, 100)}...
                </p>
                <p className="text-sm text-stone-700 font-medium flex items-center gap-1 mt-2 dark:text-gray-400">
                  <MdLocationOn className="text-xl text-gray-500 dark:text-gray-300" />
                  <span>{service.area}</span>
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <img
                    src={service.providerImage}
                    alt="provider"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-700 font-medium dark:text-gray-300">
                    {service.providerName}
                  </span>
                </div>
                <span className="text-blue-600 font-semibold dark:text-white">
                  ${service.price}
                </span>
              </div>

              <div className="mt-3">
                <Link
                  to={`/services/${service._id}`}
                  className="text-white dark:text-gray-300 bg-blue-500 hover:bg-blue-600 dark:bg-gray-600 dark:hover:bg-gray-600 px-3 py-[6px] rounded text-sm "
                >
                  View Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
