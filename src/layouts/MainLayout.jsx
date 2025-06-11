import NavBar from "../components/NavBar";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Footer";
import MobileNabMenu from "../components/MobileMenu";
import { ToastContainer } from "react-toastify";
import { useService } from "../context/ServiceContext";
import LoadSpinner from '../components/Spinner'

export default function MainLayout() {
  const navigation = useNavigation();
  const { authLoading } = useService();

  if (authLoading || navigation.state === "loading") return <LoadSpinner />;

  return (
    <div className="dark:bg-gray-900">
      <NavBar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <MobileNabMenu />
      <ToastContainer autoClose={1000} />
    </div>
  );
}
