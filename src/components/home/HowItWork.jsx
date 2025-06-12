import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    title: "Browse Services",
    subtitle: "Explore various categories and find the service that suits you need",
    image: "/icons/scroll.png",
  },
  {
    title: "Select & Book",
    subtitle: "Select the provider and schedule the service at your convenience",
    image: "/icons/booking.png",
  },
  {
    title: "Get served",
    subtitle: "Receive top-quality service and enjoy peace of mind. it's that easy!",
    image: "/icons/handover.png",
  },
];

const StepItem = ({ step, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex items-start gap-4 group"
    >
      <div className="w-20 text-center">
        <div className="border px-2 py-1 rounded bg-white dark:bg-gray-900 w-[80px] group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 dark:border-gray-700">
          Step {index + 1}
        </div>
      </div>
      <div className="relative pl-4 border-l-2 border-gray-300 dark:border-gray-500">
        <div className="absolute -left-2 top-1.5 w-3 h-3 bg-gray-700 rounded-full group-hover:bg-blue-600" />
        <h3 className="font-bold text-lg dark:text-gray-200">{step.title}</h3>
        <p className="text-gray-600 text-sm dark:text-gray-400">{step.subtitle}</p>
        {step.image && (
          <img src={step.image} alt={step.title} className="w-14 mt-2" />
        )}
      </div>
    </motion.div>
  );
};

export default function StepTimeline() {
  return (
    <div className="max-w-2xl p-6">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 text-gray-700 font-ReemKufi dark:text-gray-100">
        3 Easy Steps to get any service
      </h2>
      <div className="space-y-8 cursor-pointer">
        {steps.map((step, i) => (
          <StepItem key={i} step={step} index={i} />
        ))}
      </div>
    </div>
  );
}
