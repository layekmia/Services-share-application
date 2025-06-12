import { motion } from "framer-motion";

const providers = [
  {
    id: 1,
    name: "John Smith",
    image: "https://i.pravatar.cc/100?img=1",
    rating: 4.9,
    completed: 120,
    description: "Expert in home repairs and maintenance. Fast and reliable service.",
  },
  {
    id: 2,
    name: "Sara Khan",
    image: "https://i.pravatar.cc/100?img=2",
    rating: 4.8,
    completed: 98,
    description: "Skilled in interior design and decoration. Bringing creativity to your space.",
  },
  {
    id: 3,
    name: "David Lee",
    image: "https://i.pravatar.cc/100?img=3",
    rating: 5.0,
    completed: 143,
    description: "Certified plumber with over 10 years of experience in residential plumbing.",
  },
];

export default function TopServiceProviders() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
        Top Service Providers
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {providers.map((provider, index) => (
          <motion.div
            key={provider.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out p-6 flex flex-col items-center text-center transform hover:scale-105"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={provider.image}
              alt={provider.name}
              className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-indigo-600"
            />
            <h3 className="text-xl font-semibold dark:text-white mb-2">
              {provider.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
              {provider.description}
            </p>

            <div className="flex items-center justify-center mb-4">
              <p className="text-yellow-500 text-lg">
                ⭐ {provider.rating}
              </p>
              <span className="mx-2 text-gray-400">|</span>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {provider.completed} tasks completed
              </p>
            </div>

            <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300 ease-in-out">
              View Profile
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
