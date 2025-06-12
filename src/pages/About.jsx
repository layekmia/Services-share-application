const AboutUs = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            About ServiceSphere
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            We make it easy for you to book trusted professionals for your
            everyday needs. From home repairs to beauty services, we connect
            you with experts who deliver quality and reliability—fast.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Our mission is to simplify your life by making services accessible,
            transparent, and stress-free.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="https://img.freepik.com/free-vector/customer-support-flat-design-illustration_23-2148889371.jpg?w=740"
            alt="About us"
            className="rounded-xl shadow-lg max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
