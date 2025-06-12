import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useService } from "../context/ServiceContext";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { formatDate } from "../utils/helper";
import EditModal from "../components/EditModal";
import DeleteConfirmationModal from "../components/DeleteConfirmation";
import axiosInstance from "../utils/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import EmptyPage from "../components/emptyPages/EmptyPage";
import { FiInbox } from "react-icons/fi";
import LoadSpinner from "../components/Spinner";

export default function ManageServicesPage() {
  const { user } = useService();
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await axiosInstance.get(`/services/my-services`);
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }finally{
        setLoading(false)
      }
    }
    if (user?.email) fetchServices();
  }, [user]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/services/${deleteId}`);
      setServices((prev) => prev.filter((service) => service._id !== deleteId));
      toast.success("Service deleted successfully");
      setDeleteId(null);
    } catch (error) {
      toast.error("Failed to delete service", error.message);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleUpdate = (updatedService) => {
    console.log(updatedService);
    setServices((prev) =>
      prev.map((s) => (s._id === updatedService._id ? updatedService : s))
    );
    setShowModal(false);
  };

  useEffect(() => {
    document.title = "Manage services | ServiceSphere";
  }, []);


  if(loading) return <LoadSpinner/>

  if(services.length === 0) return <EmptyPage path='/add-service' title='No Services Added Yet' description='You haven’t added any services. Click the button below to add your first service.' icon={<FiInbox size={48} />} btnText="Add service"/>

  return (
    <div className="container mx-auto pl-4 my-10">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">
        Manage Your Services
      </h1>
      <div className="overflow-x-scroll lg:overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">
                Image
              </TableHeadCell>
              <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">
                Title
              </TableHeadCell>
              <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5 max-md:hidden">
                Publish Date
              </TableHeadCell>
              <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5 max-md:hidden">
                Last Update
              </TableHeadCell>
              <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">
                Price
              </TableHeadCell>
              <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">
                Update
              </TableHeadCell>
              <TableHeadCell className="py-2 px-3 lg:py-3 lg:px-5">
                Delete
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {services.map((service) => (
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="py-2 px-3 lg:py-3 lg:px-5">
                  <img
                    className="h-16 w-32 object-cover rounded-sm"
                    src={service.image}
                    alt={service.title}
                  />
                </TableCell>
                <TableCell className="py-2 px-3 lg:py-3 lg:px-5  font-medium text-gray-900 dark:text-white">
                  {service.title}
                </TableCell>
                <TableCell className="py-2 px-3 lg:py-3 lg:px-5 max-md:hidden">
                  {formatDate(service.createdAt)}
                </TableCell>
                <TableCell className="py-2 px-3 lg:py-3 lg:px-5 max-md:hidden">
                  {formatDate(service.updatedAt)}
                </TableCell>
                <TableCell className="py-2 px-3 lg:py-3 lg:px-5">
                  ${service.price}
                </TableCell>
                <TableCell className="py-2 px-3 lg:py-3 lg:px-5">
                  <button
                    onClick={() => handleEdit(service)}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Edit
                  </button>
                </TableCell>
                <TableCell className="py-2 px-3 lg:py-3 lg:px-5">
                  <button
                    onClick={() => setDeleteId(service._id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showModal && (
        <EditModal
          service={editingService}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdate}
        />
      )}

      {deleteId && (
        <DeleteConfirmationModal
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
