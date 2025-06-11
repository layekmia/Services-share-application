import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'

export default function BookNowModal({ service, user, onClose }) {
  const [date, setDate] = useState("");
  const [specialInstruction, setSpecialInstruction] = useState("");

  console.log(service.price)

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
      serviceStatus: "pending",
    };

    
    try {
      await axios.post("http://localhost:3000/api/booking/services", bookingData);
      toast.success("Booking submitted!");
      onClose();
    } catch (err) {
      toast.error("Booking failed:", err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center overflow-y-auto px-4 ">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Confirm Your Booking</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label>Service ID</label>
            <input type="text" className="input" value={service._id} disabled />
          </div>
          <div>
            <label>Service Name</label>
            <input type="text" className="input" value={service.title} disabled />
          </div>
          <div>
            <label>Service Image</label>
            <input type="text" className="input" value={service.image} disabled />
          </div>
          <div>
            <label>Provider Email</label>
            <input type="text" className="input" value={service.providerEmail} disabled />
          </div>
          <div>
            <label>Provider Name</label>
            <input type="text" className="input" value={service.providerName} disabled />
          </div>
          <div>
            <label>Your Email</label>
            <input type="text" className="input" value={user.email} disabled />
          </div>
          <div>
            <label>Your Name</label>
            <input type="text" className="input" value={user.name} disabled />
          </div>
          <div>
            <label>Service Price</label>
            <input type="text" className="input" value={`$${service.price}`} disabled />
          </div>
          <div>
            <label>Taking Date</label>
            <input
              className="input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="col-span-2">
            <label>Special Instruction</label>
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
