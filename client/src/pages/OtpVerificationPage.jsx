import React, { useEffect, useRef, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import Axios from '../utiles/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utiles/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OtpVerificationPage = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;

  useEffect(() => {
    if (!email) {
      toast.error("Email not found. Please start from Forgot Password.");
      navigate("/forgot-password");
    } else {
      inputRef.current[0]?.focus();
    }
  }, [email, navigate]);

  const allDigitsFilled = data.every(el => el);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!allDigitsFilled || loading) return;

    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.OtpVerification,
        data: {
          otp: data.join(""),
          email: email,
        },
      });

      const resData = response.data;

      if (resData.error) {
        toast.error(resData.message || "Invalid OTP");
      }

      if (resData.success) {
        toast.success("OTP verified");
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: { email: email, data: resData },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }, [data, email, loading, navigate]);

  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='font-semibold text-lg'>Enter OTP</p>
        <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor='otp'>Enter OTP sent to <b>{email}</b>:</label>
            <div className='flex items-center gap-2 justify-between mt-3'>
              {data.map((element, index) => (
                <input
                  key={index}
                  type='text'
                  id={`otp-${index}`}
                  value={element}
                  ref={(el) => inputRef.current[index] = el}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!/^\d?$/.test(value)) return;
                    const newData = [...data];
                    newData[index] = value;
                    setData(newData);
                    if (value && index < 5) {
                      inputRef.current[index + 1]?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !data[index] && index > 0) {
                      inputRef.current[index - 1]?.focus();
                    }
                  }}
                  maxLength={1}
                  className='bg-blue-50 w-full max-w-14 p-2 border rounded text-center font-semibold text-lg'
                />
              ))}
            </div>
          </div>

          <button
            type='submit'
            disabled={!allDigitsFilled || loading}
            className={`text-white py-2 rounded font-semibold my-3 tracking-wide ${
              allDigitsFilled && !loading ? "bg-green-800 hover:bg-green-700 animate-bounce" : "bg-gray-400"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className='mt-3'>
          Already have an account?{" "}
          <Link to="/login" className='text-green-700 font-medium hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default OtpVerificationPage;
