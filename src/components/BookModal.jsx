import { useState } from "react";
import {toast} from 'react-toastify'
import axiosInstance from "../utils/axiosInstance";

export default function BookNowModal({ service, user, onClose, onOperationComplete }) {
  const [date, setDate] = useState("");
  const [specialInstruction, setSpecialInstruction] = useState("");

  const handleBooking = async () => {
    const bookingData = {
      serviceId: service._id,
      serviceName: service.title,
      serviceImage: service.image,
      providerEmail: service.providerEmail,
      providerName: service.providerName,
      userEmail: user.email,
      userName: user.name,
      date,
      specialInstruction,
      price: service.price,
      serviceLocation: service.area,
      serviceStatus: "pending",
    };

    
    try {
      await axiosInstance.post(`/bookings`, bookingData);
      toast.success("Booking submitted!");
      onClose();
      onOperationComplete();
    } catch (err) {
      toast.error("Booking failed:", err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center overflow-y-auto px-4 ">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full shadow-lg relative dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Confirm Your Booking</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label className="label">Service ID</label>
            <input type="text" className="input" value={service._id} disabled />
          </div>
          <div>
            <label className="label">Service Name</label>
            <input type="text" className="input" value={service.title} disabled />
          </div>
          <div>
            <label className="label">Service Image</label>
            <input type="text" className="input" value={service.image} disabled />
          </div>
          <div>
            <label className="label">Provider Email</label>
            <input type="text" className="input" value={service.providerEmail} disabled />
          </div>
          <div>
            <label className="label">Provider Name</label>
            <input type="text" className="input" value={service.providerName} disabled />
          </div>
          <div>
            <label className="label">Your Email</label>
            <input type="text" className="input" value={user.email} disabled />
          </div>
          <div>
            <label className="label">Your Name</label>
            <input type="text" className="input" value={user.name} disabled />
          </div>
          <div>
            <label className="label">Service Price</label>
            <input type="text" className="input" value={`$${service.price}`} disabled />
          </div>
          <div>
            <label className="label">Service Location</label>
            <input type="text" className="input" value={`${service.area}`} disabled />
          </div>
          <div>
            <label className="label">Taking Date</label>
            <input
              className="input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="label">Special Instruction</label>
            <textarea
              className="input"
              rows={3}
              value={specialInstruction}
              onChange={(e) => setSpecialInstruction(e.target.value)}
              placeholder="Address, preferred plan, area, etc."
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
            onClick={handleBooking}
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
