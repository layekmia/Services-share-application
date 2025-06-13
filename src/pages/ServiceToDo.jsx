import { useEffect, useState } from "react";
import { useService } from "../context/ServiceContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { formatDate } from "../utils/helper";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import EmptyPage from "../components/emptyPages/EmptyPage";
import { Briefcase } from "lucide-react";
import LoadSpinner from "../components/Spinner";

export default function ServiceToDo() {
  const { user } = useService();
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(myBookings);

  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/bookings/my-order`)
        .then((res) => {
          setMyBookings(res.data);
          console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.patch(`/bookings/update-status/${id}`, {
        status: newStatus,
      });
      toast.success("status updated successfully");
      setMyBookings((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, serviceStatus: newStatus } : item
        )
      );
    } catch (error) {
      toast.error("Failed to update status", error);
    }
  };

  useEffect(() => {
    document.title = "Service-To-Do | ServiceSphere";
  }, []);

  if (loading) return <LoadSpinner />;

  if (myBookings.length === 0)
    return (
      <EmptyPage
        icon={<Briefcase size={40} />}
        title="There is no service to do yet"
        description="You have listed your service and then people will book your service. click the button and listed your service"
        btnText="Add service"
        path="/add-service"
      />
    );

  return (
    <div className="overflow-x-auto container mx-auto my-10 px-3">
      <h2 className="text-xl md:text-3xl text-gray-900 dark:text-white text-center mb-5 font-semibold">Services You Need to Complete</h2>
      <Table className="">
        <TableHead>
          <TableRow>
            <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">#No</TableHeadCell>
            <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">Service Image</TableHeadCell>
            <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">Title</TableHeadCell>
            <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">Booked by</TableHeadCell>
            <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5 max-md:hidden">Location</TableHeadCell>
            <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5 max-md:hidden">
              Booking Date
            </TableHeadCell>
            <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5 max-md:hidden">
              Delivery Date
            </TableHeadCell>
            <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">Status</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {myBookings.map((service, index) => (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="py-2 px-3 lg:py-3 lg:px-5 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </TableCell>
              <TableCell className="py-2 px-3 lg:py-3 lg:px-5">
                <img
                  className="h-26 w-16 rounded-md"
                  src={service.serviceImage}
                  alt="service"
                />
              </TableCell>
              <TableCell className="py-2 px-3 lg:py-3 lg:px-5">{service.serviceName}</TableCell>
              <TableCell className="py-2 px-3 lg:py-3 lg:px-5">{service.userEmail}</TableCell>
              <TableCell className="py-2 px-3 lg:py-3 lg:px-5 max-md:hidden">
                {service.serviceLocation || "Local"}
              </TableCell>
              <TableCell className="py-2 px-3 lg:py-3 lg:px-5 max-md:hidden">
                {formatDate(service.createdAt)}
              </TableCell>
              <TableCell className="py-2 px-3 lg:py-3 lg:px-5 max-md:hidden">
                {formatDate(service.date)}
              </TableCell>
              <TableCell className="py-2 px-3 lg:py-3 lg:px-5">
                <select
                  className="border rounded px-3 py-1 bg-white dark:bg-gray-700 dark:text-white"
                  value={service.serviceStatus}
                  onChange={(e) =>
                    handleStatusChange(service._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="working">Working</option>
                  <option value="completed">Completed</option>
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
