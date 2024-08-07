import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import ToursOverview from "./pages/ToursOverview";
import TourDetail from "./pages/TourDetail";
import Login from "./pages/Login";
import ProtectedRoute from "./context/ProtectedRoute";
import Account from "./pages/Account";
import SuccessPage from "./pages/SuccessPage";
import MyBookings from "./pages/MyBookings";
import Signup from "./pages/Signup";
import AccountSetting from "./pages/AccountSetting";
import "./index.css";
import Error from "./pages/Error";
import ManageUsers from "./pages/ManageUsers";
import MyReviews from "./pages/MyReviews";
import ManageReviews from "./pages/ManageReviews";
import ManageTours from "./pages/ManageTours";
import ManageBookings from "./pages/ManageBookings";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <ToursOverview />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "resetPassword/:resetToken",
        element: <ResetPassword />,
      },
      {
        path: "tour-detail/:tourId",
        element: <TourDetail />,
      },
      {
        path: "tourBooked",
        element: <SuccessPage />,
      },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <AccountSetting />,
          },
          {
            path: "myBookings",
            element: <MyBookings />,
          },

          {
            path: "myReviews",
            element: <MyReviews />,
          },
          {
            path: "users",
            element: <ManageUsers />,
          },
          {
            path: "reviews",
            element: <ManageReviews />,
          },
          {
            path: "tours",
            element: <ManageTours />,
          },
          {
            path: "bookings",
            element: <ManageBookings />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
