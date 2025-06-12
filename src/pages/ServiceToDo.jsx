import { useEffect, useState } from "react";
import { useService } from "../context/ServiceContext";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { formatDate } from "../utils/helper";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";


export default function ServiceToDo() {
  const { user } = useService();
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(myBookings)

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
      await axios.patch(`http://localhost:3000/api/booking/update-status/${id}`, { status: newStatus });
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (myBookings.length === 0) {
    return <p className="text-center mt-10 text-lg">No services to do yet.</p>;
  }

  return (
    <div className="overflow-x-auto container mx-auto mt-20">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>#No</TableHeadCell>
            <TableHeadCell>Service Image</TableHeadCell>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Booked by</TableHeadCell>
            <TableHeadCell className="max-md:hidden">Location</TableHeadCell>
            <TableHeadCell className="max-md:hidden">Booking Date</TableHeadCell>
            <TableHeadCell className="max-md:hidden">Delivery Date</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {myBookings.map((service, index) => <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{index + 1}</TableCell>
            <TableCell><img className="h-26 w-16 rounded-md" src={service.serviceImage} alt="service" /></TableCell>
            <TableCell>{service.serviceName}</TableCell>
            <TableCell>{service.userEmail}</TableCell>
            <TableCell className="max-md:hidden">{service.serviceLocation || 'Local'}</TableCell>
            <TableCell className="max-md:hidden">{formatDate(service.createdAt) }</TableCell>
            <TableCell className="max-md:hidden">{formatDate(service.date) }</TableCell>
            <TableCell>
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
          </TableRow>)}
        </TableBody>
      </Table>
    </div>
  );
}
