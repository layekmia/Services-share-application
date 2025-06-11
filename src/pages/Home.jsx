import { Helmet } from "react-helmet-async";
import Banner from "../components/home/Banner";
import PopularServices from "../components/home/PopulerServices";
import HowItWorks from "../components/home/WhyChoseus";
import WhyChooseUs from "../components/home/WhyChoseus";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Home | ServiceSphere";
  }, []);

  return (
    <>
      <Banner />
      <PopularServices />
      <HowItWorks />
    </>
  );
}
