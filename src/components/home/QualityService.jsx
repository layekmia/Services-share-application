export default function HeroSection() {
  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 items-center gap-12">
        {/* Text Content */}
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-300 font-medium mb-2">
            Affordable cleaning solutions
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            High-Quality and Friendly <br /> Services at Fair Prices
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We provide comprehensive cleaning services tailored to your needs.
            From residential cleaning services.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow-md transition">
            Get a quote
          </button>
        </div>

        {/* Image Stack */}
        <div className="relative w-full h-full flex justify-center">
          <div className="w-40 sm:w-48 md:w-52 lg:w-56 rounded-xl overflow-hidden shadow-lg border-4 border-white dark:border-gray-800">
            <img
              src="https://images.unsplash.com/photo-1598515218061-dfd6f9ba1f8c"
              alt="Cleaning Lady 1"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="w-40 sm:w-48 md:w-52 lg:w-56 rounded-xl overflow-hidden shadow-lg border-4 border-white dark:border-gray-800 absolute top-12 left-24">
            <img
              src="https://images.unsplash.com/photo-1581579185169-1d70d5eeb3a3"
              alt="Cleaning Lady 2"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
