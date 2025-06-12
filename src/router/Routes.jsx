import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../components/ErrorPage";
import AllServices from "../pages/AllServices";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateAuth from "../components/PrivateAuth";
import PrivateRoute from "../components/PrivateRoute";
import AddService from "../pages/AddService";
import ManageServices from "../pages/ManageServices";
import BookedServices from "../pages/BookedServices";
import ServiceToDo from "../pages/ServiceToDo";
import ServiceDetails from "../pages/ServiceDetails";
import AboutUs from "../pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/services", element: <AllServices /> },
      {
        path: "/login",
        element: (
          <PrivateAuth>
            <Login />
          </PrivateAuth>
        ),
      },
      {
        path: "/register",
        element: (
          <PrivateAuth>
            <Register />
          </PrivateAuth>
        ),
      },
      {
        path: "/add-service",
        element: (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-services",
        element: (
          <PrivateRoute>
            <ManageServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/booked-services",
        element: (
          <PrivateRoute>
            <BookedServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/todo",
        element: (
          <PrivateRoute>
            <ServiceToDo />
          </PrivateRoute>
        ),
      },
      {
        path: "/services/:id",
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
      },
      {path:'/about-us', element: <AboutUs/>}
    ],
  },
]);

export default router;
