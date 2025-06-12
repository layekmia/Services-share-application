import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useService } from "../context/ServiceContext";
import axiosInstance from "../utils/axiosInstance";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { formatDate } from "../utils/helper";
import LoadSpinner from "../components/Spinner";
import EmptyPage from "../components/emptyPages/EmptyPage";
import { BookCheck } from "lucide-react";


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

  if (loading) <LoadSpinner/>

  if(bookedServices.length === 0) return <EmptyPage title='No Services Booked yet' description="You haven't booked any service. Click the button below to booked your first service" icon={<BookCheck size={40} />} btnText='book service' path='/services'/>

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
        My Booked Services
      </h2>

      <div className="overflow-x-auto mx-auto my-20 ">
        <Table className="min-w-[620px]">
          <TableHead>
            <TableRow>
              <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">#No</TableHeadCell>
              <TableHeadCell  className="py-2 px-3 lg:py-3 lg:px-5">Service Image</TableHeadCell>
              <TableHeadCell  className="py-2 px-3 lg:py-3 lg:px-5">Title</TableHeadCell>
              <TableHeadCell  className="py-2 px-3 lg:py-3 lg:px-5">Provided By</TableHeadCell>
              <TableHeadCell className="max-md:hidden py-2 px-3 lg:py-3 lg:px-5">
                Booking Date
              </TableHeadCell>
              <TableHeadCell className="max-md:hidden py-2 px-3 lg:py-3 lg:px-5">
                Delivery Date
              </TableHeadCell>
              <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">
                Price
              </TableHeadCell>
              <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">Status</TableHeadCell>
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
                    className="h-16 w-32 object-cover rounded-md"
                    src={service.serviceImage}
                    alt="service"
                  />
                </TableCell>
                <TableCell className="py-2 px-3 lg:py-3 lg:px-5">{service.serviceName}</TableCell>
                <TableCell className="py-2 px-3 lg:py-3 lg:px-5">{service.providerName}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
