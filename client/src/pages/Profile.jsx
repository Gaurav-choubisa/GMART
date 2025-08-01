import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-start justify-center mt-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8">
        {/* Profile header */}
        <div className="flex items-center flex-col sm:flex-row sm:items-start sm:space-x-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shadow">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaRegUserCircle size={60} className="text-gray-500" />
            )}
          </div>

          {/* Name and email */}
          <div className="text-center sm:text-left mt-4 sm:mt-0">
            <h2 className="text-xl font-bold text-gray-800">
              {user.name || "No Name"}
            </h2>
            <p className="text-gray-500 text-sm">{user.email || "No Email"}</p>
            <button
              onClick={() => setOpenProfileAvatarEdit(true)}
              className="mt-2 inline-block border border-gray-300 text-sm text-gray-700 px-4 py-1 rounded-full hover:bg-green-800 hover:text-white transition-all"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6" />

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm text-gray-600">
          <div>
            <span className="font-semibold text-gray-800">Employee ID: </span>
            {"202504"}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Mobile Number: </span>
            {user.mobile || "+91-85293822003"}
          </div>
          <div>
  <span className="font-semibold text-gray-800">Role: </span>
  <span
    className={
      user.role === "IT-TEAM"
        ? "text-red-600 font-semibold"
        : user.role === "ADMIN"
        ? "text-yellow-700 font-semibold"
        : "text-gray-600 font-semibold"
    }
  >
    {user.role || "Software Developer Intern"}
  </span>
</div>

          <div>
            <span className="font-semibold text-gray-800">Last Login: </span>
            {user.last_login_date
              ? new Date(user.last_login_date).toLocaleString()
              : "Not Available"}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Reporting To: </span>
            {user.reportingTo?.name || "Mr. Punit Babel"}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Reporting To Me: </span>
            {Array.isArray(user.reportingToMe) && user.reportingToMe.length > 0
              ? user.reportingToMe.map((u, idx) => (
                  <div key={idx}>{u.name || "N/A"}</div>
                ))
              : "No Direct Reports"}
          </div>
        </div>

        {/* Modal */}
        {openProfileAvatarEdit && (
          <UserProfileAvatarEdit close={() => setOpenProfileAvatarEdit(false)} />
        )}
      </div>
    </div>
  );
};

export default Profile;
