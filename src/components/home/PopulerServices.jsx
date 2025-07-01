import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../utils/helper";
import LoadSpinner from "../Spinner";
import { motion } from "framer-motion";

export default function PopularServices() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getServices() {
      try {
        const result = await axios.get(`${BASE_URL}/services`);
        setServices(result.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    getServices();
  }, []);

  if (!services.length) return <LoadSpinner />;

  return (
    <section className="container  mx-auto px-5 lg:px-0 py-14 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-300">
          Popular Services
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.slice(0, 6)?.map((service, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={service._id}
              className="border rounded-lg shadow-sm p-4 flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 dark:border-gray-700"
              initial={{opacity: 0, x:isLeft ? -100: 100 }}
              whileInView={{opacity: 1, x:0}}
              transition={{duration:0.6, delay: index * 0.1}}
              viewport={{once: true, amount:0.3}}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full sm:w-48 h-32 md:h-full object-cover rounded"
              />

              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">
                    {service.description.slice(0, 100)}...
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
                  <span className="text-blue-600 font-semibold dark:text-gray-100">
                    ${service.price}
                  </span>
                </div>

                <div className="mt-3">
                  <Link
                    to={`/services/${service._id}`}
                    className="text-white dark:text-gray-300 bg-blue-500 hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-[6px] rounded text-sm "
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      {services.length && (
        <div className="w-full flex items-center justify-center mt-8">
          <button
            onClick={() => navigate("/services")}
            className="py-2 px-5 bg-blue-600 text-white rounded dark:bg-gray-700"
          >
            Show All
          </button>
        </div>
      )}
    </section>
  );
}
