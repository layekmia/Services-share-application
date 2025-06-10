import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../utils/helper";
import LoadSpinner from "../components/Spinner";

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await axios.get(`${BASE_URL}/${id}`);
        setService(res.data);
        console.log(res)
      } catch (error) {
        console.error("Error fetching service:", error.message);
      }
    }

    fetchService();
  }, [id]);

  if (!service) {
    return <LoadSpinner/>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{service.title}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>{service.area}</span>
          <span>|</span>
          <span>Provided by {service.providerName}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-80 object-cover rounded-lg shadow-sm"
          />
          <p className="text-gray-700 mt-6 text-lg">{service.description}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h2 className="text-xl font-semibold mb-4">Service Information</h2>

          <div className="flex items-center gap-3 mb-4">
            <img
              src={service.providerImage}
              alt={service.providerName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-gray-800 font-medium">{service.providerName}</p>
              <p className="text-gray-500 text-sm">{service.area}</p>
            </div>
          </div>

          <div className="mt-4 mb-6">
            <p className="text-sm text-gray-600">Service Price:</p>
            <h3 className="text-2xl font-bold text-green-600">${service.price}</h3>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
