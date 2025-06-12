import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useService } from "../context/ServiceContext";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { formatDate } from "../utils/helper";
import EditModal from "../components/EditModal";
import DeleteConfirmationModal from "../components/DeleteConfirmation";
import axiosInstance from "../utils/axiosInstance";


export default function ManageServicesPage() {
  const { user } = useService();
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await axiosInstance.get(`/services/my-services`);
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    if (user?.email) fetchServices();
  }, [user]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/services/${deleteId}`);
      setServices(prev => prev.filter(service => service._id !== deleteId));
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
    console.log(updatedService)
    setServices(prev => prev.map(s => (s._id === updatedService._id ? updatedService : s)));
    setShowModal(false);
  };

    useEffect(() => {
    document.title = "Manage services | ServiceSphere";
  }, []);

  return (
    <div className="max-w-6xl mx-auto pl-4 mt-10">
      <h1 className="text-3xl font-bold mb-6">Manage Your Services</h1>
      <div className="overflow-x-auto">
        <table className="min-w-[750px] border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border max-md:hidden">Description</th>
              <th className="px-5 py-2 border">Publish Date</th>
              <th className="px-5 py-2 border">Last Update</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service._id} className="text-center">
                <td className="px-4 py-2 border">
                  <img src={service.image} alt={service.title} className="h-16 w-24 object-cover mx-auto rounded" />
                </td>
                <td className="px-4 py-2 border font-semibold">{service.title}</td>
                <td className="px-4 py-2 border text-sm max-md:hidden">{service.description.slice(0, 60)}...</td>
                <td className="px-4 py-2 border text-sm">{formatDate(service.createdAt)}</td>
                <td className="px-4 py-2 border text-sm">{formatDate(service.updatedAt)}</td>
                <td className="px-4 py-2 border text-green-600 font-bold">${service.price}</td>
                <td className="px-4 py-2 border space-x-2 flex items-center">
                  <button
                    onClick={() => handleEdit(service)}
                    className=" text-xl  px-2 py-2 rounded-full  text-blue-600 hover:text-blue-800"
                  ><FaRegEdit /></button>
                  <button
                    onClick={() => setDeleteId(service._id)}
                    className=" px-2 py-2 text-xl text-red-600 rounded-full flex items-center justify-center hover:bg-gray-300"
                  ><MdDelete /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
