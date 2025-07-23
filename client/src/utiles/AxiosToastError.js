import toast from 'react-hot-toast';

const AxiosToastError = (err) => {
  const message =
    err?.response?.data?.message ||
    err?.message ||
    "Something went wrong!";
  toast.error(message);
};

export default AxiosToastError;