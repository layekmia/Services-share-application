import { useEffect, useState } from "react";
import { useService } from "../context/ServiceContext";
import axiosInstance from "../utils/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import BASE_URL, { formatDate } from "../utils/helper";
import LoadSpinner from "../components/Spinner";
import EmptyPage from "../components/emptyPages/EmptyPage";
import { BookCheck } from "lucide-react";
import LayoutBtn from "../components/LayoutBtn";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../components/DeleteConfirmation";

export default function BookedServices() {
  const { user } = useService();
  const [bookedServices, setBookedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("table");
  const [isCanceling, setIsCanceling] = useState(false);

  const [cancelId, setCancelId] = useState(null);

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

  const handleBookingCancel = async () => {
    try {
      setIsCanceling(true)
      await axiosInstance.delete(`${BASE_URL}/bookings/cancel/${cancelId}`);
      setBookedServices((prev) =>
        prev.filter((booking) => booking._id !== cancelId)
      );
      toast.success("successfully cancel booking");
      setCancelId(null);
    } catch (error) {
      toast.error("Failed to delete service", error.message);
    }finally{
      setIsCanceling(false)
    }
  };

  if (loading) return <LoadSpinner />;

  if (bookedServices.length === 0)
    return (
      <EmptyPage
        title="No Services Booked yet"
        description="You haven't booked any service. Click the button below to booked your first service"
        icon={<BookCheck size={40} />}
        btnText="book service"
        path="/services"
      />
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-white ">
        My Booked Services
      </h2>
      <LayoutBtn view={view} setView={setView} />
      {view === "table" ? (
        <div className="overflow-x-auto mx-auto mt-5 mb-10 ">
          <Table className="">
            <TableHead>
              <TableRow>
                <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">
                  #No
                </TableHeadCell>
                <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">
                  Service Image
                </TableHeadCell>
                <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">
                  Title
                </TableHeadCell>
                <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">
                  Provided By
                </TableHeadCell>
                <TableHeadCell className="max-md:hidden py-2 px-3 lg:py-3 lg:px-5">
                  Booking Date
                </TableHeadCell>
                <TableHeadCell className="max-md:hidden py-2 px-3 lg:py-3 lg:px-5">
                  Delivery Date
                </TableHeadCell>
                <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">
                  Price
                </TableHeadCell>
                <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">
                  Status
                </TableHeadCell>
                <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">
                  action
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {bookedServices.map((service, index) => (
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="py-2 px-3 lg:py-3 lg:px-5 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </TableCell>
                  <TableCell className="py-2 px-3 lg:py-3 lg:px-5">
                    <img
                      className="h-16 w-32 object-cover rounded-sm"
                      src={service.serviceImage}
                      alt="service"
                    />
                  </TableCell>
                  <TableCell className="py-2 px-3 lg:py-3 lg:px-5">
                    {service.serviceName}
                  </TableCell>
                  <TableCell className="py-2 px-3 lg:py-3 lg:px-5">
                    {service.providerName}
                  </TableCell>
                  <TableCell className="max-md:hidden py-2 px-3 lg:py-3 lg:px-5">
                    {formatDate(service.createdAt)}
                  </TableCell>
                  <TableCell className="max-md:hidden py-2 px-3 lg:py-3 lg:px-5">
                    {formatDate(service.date)}
                  </TableCell>
                  <TableCell className="text-red-400 py-2 px-3 lg:py-3 lg:px-5">
                    ${service.price}
                  </TableCell>
                  <TableCell className="text-blue-500 capitalize py-2 px-3 lg:py-3 lg:px-5">
                    {service.serviceStatus}
                  </TableCell>
                  <TableCell className="text-red-500  py-2 px-3 lg:py-3 lg:px-5">
                    <button onClick={() => setCancelId(service._id)} className="uppercase">Cancel</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {bookedServices.map((booking, index) => (
            <div
              key={index}
              className=" bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border dark:border-gray-700 h-full flex flex-col"
            >
              <img
                className="w-full h-44 object-cover"
                src={booking.serviceImage}
                alt="Service"
              />
              <div className="p-4 flex flex-col flex-1 space-y-1 justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {booking.serviceName}
                </h2>
                <p className="text-base font-medium  text-gray-600 dark:text-gray-400">
                  Provided by: <span>{booking.providerName}</span> <br />
                </p>
                <p className="text-base font-medium  text-gray-600 dark:text-gray-400">
                  Provider email: <br />
                  <span className="font-normal">{booking.providerEmail}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 font-medium">
                  Booking Date:
                  <span className="font-normal">
                    {formatDate(booking.createdAt)}
                  </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 font-medium">
                  Delivery Date:
                  <span className="font-normal">
                    {formatDate(booking.date)}
                  </span>
                </p>
                <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                  <span className="text-base font-semibold text-gray-600 dark:text-gray-300">
                    Price :{" "}
                  </span>
                  ${booking.price}
                </p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 ">
                  Status
                  <span
                    className={`px-2 py-0.5 rounded text-white ml-2 ${
                      booking.serviceStatus === "pending"
                        ? "bg-yellow-500"
                        : booking.status === "completed"
                        ? "bg-green-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {booking.serviceStatus}
                  </span>
                </p>

                <div className="mt-auto pt-3 ">
                  <button onClick={() => setCancelId(booking._id)} className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cancelId && (
        <DeleteConfirmationModal
          onConfirm={handleBookingCancel}
          onCancel={() => setCancelId(null)}
          btnText="Confirm"
          heading="Confirm Cancellation"
          description="Are you sure you want to cancel this booking? This action cannot be
          undone."
          isLoading={isCanceling}
          loadingText='Cancelling'
        />
      )}
    </div>
  );
}
