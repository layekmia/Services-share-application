const HowItWorks = () => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">How It Works</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="text-white bg-blue-600 w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold mb-4">1</div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Browse Services</h4>
            <p className="text-sm text-gray-600">Explore various categories and find the service that suits your need.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-white bg-blue-600 w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold mb-4">2</div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Select & Book</h4>
            <p className="text-sm text-gray-600">Select the provider and schedule the service at your convenience.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-white bg-blue-600 w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold mb-4">3</div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Get Served</h4>
            <p className="text-sm text-gray-600">Receive top-quality service and enjoy peace of mind. It's that easy!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
