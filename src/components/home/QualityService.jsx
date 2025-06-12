import { motion } from "framer-motion";


export default function Quality() {
  return (
<section className="bg-white dark:bg-gray-900 py-16 mb-32 container mx-auto">
  <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 items-center gap-12">
    
    {/* Text Section with Animation */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <p className="text-sm text-gray-500 dark:text-gray-300 font-medium mb-2">
        Affordable cleaning solutions
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
        High-Quality and Friendly <br /> Services at Fair Prices
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        We offer a wide range of professional services tailored to your specific needs — from home improvement to expert consultations and more.
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow-md transition">
        Book now
      </button>
    </motion.div>

    {/* Image Section with Animation */}
    <motion.div
      className="relative w-full h-full flex justify-center"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="w-40 sm:w-48 md:w-52 lg:w-56 rounded-xl overflow-hidden shadow-lg border-4 border-white">
        <img
          src="https://5.imimg.com/data5/SELLER/Default/2022/12/KL/QE/ND/1383165/home-goods-packers-movers-services.jpg"
          alt="Cleaning Lady 1"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-40 sm:w-48 md:w-52 lg:w-56 rounded-xl overflow-hidden shadow-lg border-4 border-white dark:border-none absolute top-12 left-24">
        <img
          src="https://i.ibb.co/S4SwdWKn/Image.png"
          alt="Cleaning Lady 2"
          className="w-full h-auto object-cover"
        />
      </div>
    </motion.div>
  </div>
</section>
  );
}
