import Banner from "../components/home/Banner";
import PopularServices from "../components/home/PopulerServices";
import { useEffect } from "react";
import StepTimeline from "../components/home/HowItWork";
import TopServiceProviders from "../components/home/TopServiceProvder";
import Quality from "../components/home/QualityService";

export default function Home() {
  useEffect(() => {
    document.title = "Home | ServiceSphere";
  }, []);

  return (
    <>
      <Banner />
      <PopularServices />
      <div className="bg-gray-50 w-full flex justify-center dark:bg-gray-900 dark:border-b-2 dark:border-b-gray-700 text-gray-900 dark:text-white py-10">
        <StepTimeline />
      </div>
      <Quality/>
      {/* <TopServiceProviders/> */}
    </>
  );
}
