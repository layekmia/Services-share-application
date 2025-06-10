import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:3000/api/services"

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function getServices(){
        try {
            const result = await axios.get(BASE_URL);
            setServices(result.data);
        } catch (error) {
            console.log(error.message)
        }
    }

    getServices();
  } , [])

  const popular = services?.slice(0, 6);

  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Popular Services</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {popular?.map((service) => (
          <div
            key={service._id}
            className="border rounded-lg shadow-sm p-4 flex flex-col sm:flex-row gap-4 bg-white"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full sm:w-48 h-32 md:h-full object-cover rounded"
            />

            <div className="flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
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
                  <span className="text-sm text-gray-700 font-medium">
                    {service.providerName}
                  </span>
                </div>
                <span className="text-blue-600 font-semibold">${service.price}</span>
              </div>

              <div className="mt-3">
                <Link
                  to={`/services/${service._id}`}
                  className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
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
};

