import { useEffect, useState } from "react";
import { useService } from "../context/ServiceContext";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { serviceCategories } from "../utils/helper";
import { Spinner } from "flowbite-react";

export default function AddService() {
  const { user } = useService();
  const [form, setForm] = useState({
    image: "",
    title: "",
    price: "",
    area: "",
    description: "",
    category: "",
  });

  const [isLoading, setIsLoading] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newService = {
      ...form,
      providerName: user?.name,
      providerEmail: user?.email,
      providerImage: user?.image,
    };

    try {
      setIsLoading(true)
      await axiosInstance.post("/services/add", newService);
      toast.success("service added successfully");
      setForm({
        image: "",
        title: "",
        price: "",
        area: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    document.title = "Add Service | ServiceSphere";
  }, []);

  return (
    <div className="w-full h-full  mt-1">
      <div className="max-w-3xl mx-auto p-6 pt-10 bg-white dark:bg-gray-900 bg-transparent max-md:shadow-xl  ">
        <h2 className="text-2xl font-bold mb-2 text-center text-blue-600 uppercase">
          Offer Your Expertise to the Community
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Effortlessly add your services to our platform and connect with
          customers who need your help. Whether you're a skilled technician,
          beauty expert, or teacher—start reaching clients today!
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 shadow-sm px-5 py-5 border-2 dark:border-gray-700 rounded-md"
        >
          <h2 className="text-center text-xl uppercase font-semibold text-stone-700 dark:text-gray-300">
            Add your Service
          </h2>
          <div>
            <label className="block font-medium text-gray-700 mb-1 dark:text-white">
              Service Image URL
            </label>
            <input
              placeholder="Image"
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
              className=" dark:bg-gray-900 text-gray-600 dark:text-white dark:border-gray-500 w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 dark:text-white">
              Service Name
            </label>
            <input
              placeholder="Service name"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className=" dark:bg-gray-900 text-gray-600 dark:text-white dark:border-gray-500 w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 dark:text-white">
              Price
            </label>
            <input
              placeholder="Price"
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className=" dark:bg-gray-900 text-gray-600 dark:text-white dark:border-gray-500 w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1 dark:text-white">
              Category
            </label>
            <select
              name="category"
              value={FormData.category}
              onChange={handleChange}
              className=" dark:bg-gray-900 text-gray-600 dark:text-white dark:border-gray-500 w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select category</option>
              {serviceCategories.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1 dark:text-white">
              Service Area
            </label>
            <input
              placeholder="Location"
              type="text"
              name="area"
              value={form.area}
              onChange={handleChange}
              required
              className=" dark:bg-gray-900 text-gray-600 dark:text-white dark:border-gray-500 w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1 dark:text-white">
              Description
            </label>
            <textarea
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              required
              className="dark:bg-gray-900 dark:text-white text-gray-600 dark:border-gray-500 w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              disabled={isLoading}
              className={`py-[6px] bg-primary dark:bg-gray-700 w-full rounded-md mt-5 bg-blue-600 text-white  font-medium text-base ${
                isLoading ? "opacity-50" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <Spinner
                    size="sm"
                    aria-label="Info spinner example"
                    className="me-3"
                    light
                  />
                  adding...
                </>
              ) : (
                "Add Service"
              )}
            </button>
          </div>
        </form>

        {user && (
          <div className="mt-6 text-sm text-gray-600 text-center dark:text-white">
            Logged in as: <strong>{user.displayName}</strong> ({user.email})
          </div>
        )}
      </div>
    </div>
  );
}
