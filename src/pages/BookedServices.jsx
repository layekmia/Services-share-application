import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useService } from "../context/ServiceContext";
import axiosInstance from "../utils/axiosInstance";

export default function BookedServices() {
  const { user } = useService();
  const [bookedServices, setBookedServices] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      document.title = "Booked services | ServiceSphere";
    }, []);

  useEffect(() => {
    async function fetchBookedServices() {
      try {
        const res = await axiosInstance.get(`/bookings/my-bookings`);
        setBookedServices(res.data);
      } catch (error) {
        console.error("Error fetching booked services:", error.message);
      } finally {
        setLoading(false);
      }
    }

    if (user?.email) {
      fetchBookedServices();
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">My Booked Services</h2>

      {bookedServices.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-xl">You have not booked any services yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookedServices.map(service => (
            <div key={service._id} className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row gap-4">
              <img
                src={service.serviceImage}
                alt={service.serviceName}
                className="w-full md:w-48 h-36 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-700 mb-1">{service.serviceName}</h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Provider:</span> {service.providerName}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Service Date:</span> {service.date}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Price:</span> ${service.price}
                </p>
                {service.instruction && (
                  <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Instruction:</span> {service.instruction}
                  </p>
                )}
                <p className="text-sm text-blue-600 font-medium mt-2 capitalize">
                  Status: {service.serviceStatus || "pending"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
