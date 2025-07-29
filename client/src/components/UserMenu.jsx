import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utiles/Axios";
import SummaryApi from "../common/SummaryApi";
import { LogOut } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utiles/AxiosToastError";
import { TbExternalLink } from "react-icons/tb";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.Logout,
      });

      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(LogOut());
        localStorage.clear();
        toast.success(response.data.message);
        window.history.back();
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm">
        {user.name || user.mobile}
        <Link to={"/dashboard/profile"} className="hover:text-primary-200">
          <TbExternalLink size={15} />
        </Link>
      </div>

      <Divider />
      <div className="grid text-sm gap-2">
        <Link to={""} className="px-2 hover:bg-orange-200 py-1 rounded">
          My Order
        </Link>
        <Link to={""} className="px-2 hover:bg-orange-200 py-1 rounded">
          Save Address
        </Link>
        <button
          onClick={handleLogOut}
          className="text-left px-2 hover:bg-orange-200 py-1 rounded"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
