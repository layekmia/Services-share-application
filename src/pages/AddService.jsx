import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { div } from "framer-motion/client";

export default function AddService() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    image: "",
    title: "",
    price: "",
    area: "",
    description: "",
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newService = {
      ...form,
      providerName: user?.displayName || "Anonymous",
      providerEmail: user?.email,
      providerImage: user?.photoURL || "",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("https://your-api-url.com/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });

      if (res.ok) {
        alert("Service added successfully!");
        setForm({ image: "", title: "", price: "", area: "", description: "" });
      } else {
        alert("Failed to add service");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="w-full h-full dark:bg-gray-900">
      <div className="max-w-3xl mx-auto p-6 pt-10 bg-white bg-transparent max-md:shadow-xl  ">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Add New Service
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700 mb-1 dark:text-white">
              Service Image URL
            </label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
              className=" dark:bg-gray-900 text-white dark:border-gray-500 w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 dark:text-white">
              Service Name
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className=" dark:bg-gray-900 text-white dark:border-gray-500 w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 dark:text-white">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className=" dark:bg-gray-900 text-white dark:border-gray-500 w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 dark:text-white">
              Service Area
            </label>
            <input
              type="text"
              name="area"
              value={form.area}
              onChange={handleChange}
              required
              className=" dark:bg-gray-900 text-white dark:border-gray-500 w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 dark:text-white">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              required
              className="dark:bg-gray-900 dark:border-gray-500 w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Add Service
            </button>
          </div>
        </form>

        {user && (
          <div className="mt-6 text-sm text-gray-600 text-center">
            Logged in as: <strong>{user.displayName}</strong> ({user.email})
          </div>
        )}
      </div>
    </div>
  );
}
