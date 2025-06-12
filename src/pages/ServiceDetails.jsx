import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadSpinner from "../components/Spinner";
import { MdArrowBack, MdLocationOn } from "react-icons/md";
import BookNowModal from "../components/BookModal";
import { useService } from "../context/ServiceContext";
import axiosInstance from "../utils/axiosInstance";
import BASE_URL from "../utils/helper";

export default function ServiceDetails() {
  const { id } = useParams();
  const { user } = useService();
  const [service, setService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await axios.get(`${BASE_URL}/services/${id}`);
        setService(res.data);
      } catch (error) {
        console.error("Error fetching service:", error.message);
      }
    }

    fetchService();
  }, [id]);

  const getBookedService = async () => {
    try {
      const res = await axiosInstance.get(
        `/bookings/my-bookings`
      );
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching booked services:", error.message);
    }
  };

  useEffect(() => {
    getBookedService();
  }, [user?.email]);

  const isAlreadyBooked = bookings?.some((booking) => booking.serviceId === id);

  function onClose() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    document.title = "Service Details | ServiceSphere";
  }, []);

  if (!service) {
    return <LoadSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-6"
      >
        <MdArrowBack className="text-lg" />
        Back
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-white">
          {service.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-300">
          <span className="flex gap-1">
            <MdLocationOn className="text-xl text-gray-500" /> {service.area}
          </span>
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
          <p className="text-gray-700 mt-6 text-lg dark:text-gray-300">
            {service.description}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 dark:border-gray-600 shadow-sm rounded-lg p-6 border">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Service Information
          </h2>

          <div className="flex items-center gap-3 mb-4">
            <img
              src={service.providerImage}
              alt={service.providerName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-gray-800 font-medium dark:text-gray-300">
                {service.providerName}
              </p>
              <p className="text-gray-500 text-sm dark:text-gray-300">
                {service.area}
              </p>
            </div>
          </div>

          <div className="mt-4 mb-6 flex items-center gap-2">
            <p className="text-base text-gray-600 dark:text-gray-300">
              Service Price:
            </p>
            <h3 className="text-lg dark:text-white font-semibold text-blue-600">
              ${service.price}
            </h3>
          </div>

          <button
            disabled={isAlreadyBooked}
            onClick={() => setIsModalOpen(true)}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ${
              isAlreadyBooked ? "opacity-40" : ""
            }`}
          >
            {isAlreadyBooked ? "Already booked" : "Book Now"}
          </button>

          {isModalOpen && (
            <BookNowModal
              onOperationComplete={getBookedService}
              service={service}
              user={user}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
