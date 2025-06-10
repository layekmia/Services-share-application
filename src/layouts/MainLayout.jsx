import NavBar from "../components/NavBar";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Footer";
import MobileNabMenu from "../components/MobileMenu";
import { ToastContainer } from "react-toastify";
import auth from "../firebase/firebase";
import { useService } from "../context/ServiceContext";
import LoadSpinner from '../components/Spinner'

export default function MainLayout() {
  const navigation = useNavigation();
  const {isUserLoggedIn} = useService();

  if(isUserLoggedIn || navigation.state === 'loading') return <LoadSpinner/>


  return (
    <>
      <NavBar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <MobileNabMenu />
      <ToastContainer/>
    </>
  );
}
