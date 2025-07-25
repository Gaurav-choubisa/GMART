import React, { useState } from "react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import Axios from "../utiles/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utiles/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value.trimStart(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    console.log("Form Data:", data);

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accesstoken", response.data?.data.accesstoken);
        localStorage.setItem("refreshtoken", response.data.data.refreshtoken );
        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full mx-auto max-w-lg rounded p-4">
        <p>
          Welcome to{" "}
          <strong className="font-semibold text-green-900 hover:text-green-700">
            GMART
          </strong>
        </p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="enter your email"
              value={data.email}
              onChange={handleChange}
              className="bg-blue-50 p-2 border border-gray-300 focus:border-primary-200 rounded outline-none"
            />
          </div>

          <div className="grid gap-1 relative ">
            <label htmlFor="password">Password :</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="enter the password"
              value={data.password}
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
          <Link
            to={"/forgot-password"}
            className="block ml-auto hover:text-primary-200"
          >
            Forgot password ?
          </Link>
          <button
            type="submit"
            disabled={!data.email || !data.password}
            className={`text-white p-2 rounded mt-2 transition 
    ${
      !data.email || !data.password
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-800 hover:bg-green-700 animate-bounce"
    }`}
          >
            Login
          </button>
        </form>

        <p className="gap-3 mt-6 px-1">
          Not have account ?{" "}
          <Link to={"/register"} className="font-semibold text-green-800">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
