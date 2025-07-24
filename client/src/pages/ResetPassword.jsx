import React, { useEffect, useState } from "react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utiles/Axios";
import AxiosToastError from "../utiles/AxiosToastError";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((preve) => {
        return {
          ...preve,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value.trimStart(),
    }));
  };

  console.log("data reset password", data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email) {
      toast.error("Please fill in all field.");
      return;
    }

    console.log("Form Data:", data);

    try {
      const response = await Axios({
        ...SummaryApi.ResetPassword,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login", {
          state: data,
        });
        setData({
          email: "",
          newPassword : "",
          confirmPassword : ""
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full mx-auto max-w-lg rounded p-4 shadow-sd">
        <p className="font-semibold text-green-800">
          Forgot Passwword Verification for{" "}
          <strong className="font-semibold text-green-800 ">GMART</strong>
        </p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1 relative">
            <label htmlFor="newPassword">New Password :</label>
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              placeholder="Enter the new password"
              value={data.newPassword}
              onChange={handleChange}
              className="bg-blue-50 p-2 border border-gray-300 focus:border-primary-200 rounded outline-none"
            />
            <span
              className="absolute right-3 top-10 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOffSharp /> : <IoEyeSharp />}
            </span>
          </div>

          <div className="grid gap-1 relative">
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <input
              type={showConfirm ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={data.confirmPassword}
              onChange={handleChange}
              className="bg-blue-50 p-2 border border-gray-300 focus:border-primary-200 rounded outline-none"
            />
            <span
              className="absolute right-3 top-10 cursor-pointer text-gray-600"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <IoEyeOffSharp /> : <IoEyeSharp />}
            </span>
          </div>

          <button
            type="submit"
            disabled={!data.email}
            className={`text-white p-2 rounded mt-2 transition 
    ${
      !data.email
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-800 hover:bg-green-700 animate-bounce"
    }`}
          >
            Summit
          </button>
        </form>
        <p className="gap-3 mt-6 px-1">
          Already have account ?{" "}
          <Link to={"/login"} className="font-semibold text-green-800">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
