import Banner from "../components/home/Banner";
import PopularServices from "../components/home/PopulerServices";
import { useEffect } from "react";
import StepTimeline from "../components/home/HowItWork";
import TopServiceProviders from "../components/home/TopServiceProvder";

export default function Home() {
  useEffect(() => {
    document.title = "Home | ServiceSphere";
  }, []);

  return (
    <>
      <Banner />
      <PopularServices />
      <div className="bg-gray-50 w-full flex justify-center dark:bg-gray-800 text-gray-900 dark:text-white min-h-screen">
        <StepTimeline />
      </div>
      <TopServiceProviders/>
    </>
  );
}
