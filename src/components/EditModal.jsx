import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

export default function EditModal({ service, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    price: "",
    description: "",
    area: "",
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || "",
        image: service.image || "",
        price: service.price || "",
        description: service.description || "",
        area: service.area || "",
      });
    }
  }, [service]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleUpdate() {
    if (
      !formData.title ||
      !formData.image ||
      !formData.price ||
      !formData.description ||
      !formData.area
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      const result = await axiosInstance.put(
        `/services/update/${service._id}`,
        formData
      );
      toast.success("Service updated successfully");
      onUpdate(result.data.service); // Update UI in parent
      onClose();             // Close the modal
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update service"
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center overflow-y-auto px-4">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Update Service</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label>Service Title</label>
            <input
              name="title"
              type="text"
              className="input"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Service Image</label>
            <input
              name="image"
              type="text"
              className="input"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Provider Email</label>
            <input
              type="text"
              className="input"
              value={service.providerEmail}
              disabled
            />
          </div>
          <div>
            <label>Provider Name</label>
            <input
              type="text"
              className="input"
              value={service.providerName}
              disabled
            />
          </div>
          <div>
            <label>Service Area</label>
            <input
              name="area"
              type="text"
              className="input"
              value={formData.area}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Service Price</label>
            <input
              name="price"
              type="number"
              className="input"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <label>Description</label>
            <textarea
              name="description"
              className="input"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
