import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerificationPage from "../pages/OtpVerificationPage";
import ResetPassword from "../pages/ResetPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path : "search",
        element : <SearchPage/>
      },
      {
        path : "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
            {
        path : "forgot-password",
        element: <ForgotPassword />
      },
      {
        path : "Otp-Verification-Page",
        element: <OtpVerificationPage />
      },
      {
        path : "reset-password",
        element: <ResetPassword />
      },
    ],
  },
]);

export default router;
