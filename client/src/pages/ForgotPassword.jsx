import React, { useState } from "react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import toast from 'react-hot-toast';
import Axios from "../utiles/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utiles/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate()
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value.trimStart(),
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if ( !data.email) {
      toast.error("Please fill in all field.");
      return;
    }

    console.log("Form Data:", data);


   try {
     const response = await Axios({
        ...SummaryApi.ForgotPassword,
        data: data
    })
        if(response.data.error){
        toast.error(response.data.message)
    }
    if(response.data.success){
        toast.success(response.data.message)
        navigate("/Otp-Verification-Page",{
          state : data
        })
        setData({
            email: "",
        })
        
    }
   } catch (error) {
    AxiosToastError(error)
   }

  };

  

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full mx-auto max-w-lg rounded p-4 shadow-sd">
        <p className="font-semibold text-green-800">
          Forgot Passwword Verification for <strong className="font-semibold text-green-800 ">GMART</strong>
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
          <button
            type="submit"
            disabled={
              !data.email 
            }
            className={`text-white p-2 rounded mt-2 transition 
    ${
      !data.email  
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-800 hover:bg-green-700 animate-bounce"
    }`}
          >
            Send OTP
          </button>
        </form>
         <p className="gap-3 mt-6 px-1">
                    Already have account ? <Link to={"/login"} className="font-semibold text-green-800">Login</Link>
                </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
