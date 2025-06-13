import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useService } from "../context/ServiceContext";
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
import LayoutBtn from "../components/LayoutBtn";

export default function ManageServicesPage() {
  const { user } = useService();
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true)
        const res = await axiosInstance.get(`/services/my-services`);
        setServices(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (user?.email) fetchServices();
  }, [user]);

  const handleDelete = async () => {
    try {
      setDeleting(true)
      await axiosInstance.delete(`/services/${deleteId}`);
      setServices((prev) => prev.filter((service) => service._id !== deleteId));
      toast.success("Service deleted successfully");
      setDeleteId(null);
    } catch (error) {
      toast.error("Failed to delete service", error.message);
    }finally{
      setDeleting(false)
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleUpdate = (updatedService) => {
    setServices((prev) =>
      prev.map((s) => (s._id === updatedService._id ? updatedService : s))
    );
    setShowModal(false);
  };

  useEffect(() => {
    document.title = "Manage services | ServiceSphere";
  }, []);

  if (loading) return <LoadSpinner />;

  if (services.length === 0)
    return (
      <EmptyPage
        path="/add-service"
        title="No Services Added Yet"
        description="You haven’t added any services. Click the button below to add your first service."
        icon={<FiInbox size={48} />}
        btnText="Add service"
      />
    );

  return (
    <div className="max-w-7xl mx-auto px-4 my-10">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">
        Manage Your Services
      </h1>
      <LayoutBtn view={view} setView={setView} />
      {view === "table" ? (
        <div className="overflow-x-scroll lg:overflow-x-auto shadow-sm">
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
                <TableRow
                  key={service._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5 justify-center">
          {services.map((service, index) => (
            <div
              key={index}
              className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border dark:border-gray-700 h-[400px] flex flex-col"
            >
              <img
                className="w-full h-48 object-cover"
                src={service.image}
                alt="Service"
              />
              <div className="p-4 space-y-2 flex flex-col flex-1">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {service.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Published on:{" "}
                  <span className="font-medium">
                    {formatDate(service.createdAt)}
                  </span>
                </p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  ${service.price}
                </p>

                <div className="flex justify-between pt-3">
                  <button
                    onClick={() => handleEdit(service)}
                    className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(service._id)}
                    className="px-4 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
          btnText="Delete"
          heading="Confirm Deletion"
          description="Are you sure you want to delete this service? This action cannot be
          undone."
          isLoading={isDeleting}
          loadingText='Deleting'
        />
      )}
    </div>
  );
}
