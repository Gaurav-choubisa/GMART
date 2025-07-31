import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const[openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false)
  return (
    <div>
      <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img alt={user.name} src={user.avatar} className="w-full h-full " />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>
     <button onClick={()=>setOpenProfileAvatarEdit(true)}   className="text-sm w-31 h-8 border border-secondary-200 hover:border-secondary-200 hover:bg-green-800 hover:text-white font-semibold px-1.5 rounded-full mt-4">
  Update profile
</button>
{
   openProfileAvatarEdit && (<UserProfileAvatarEdit close={()=>setOpenProfileAvatarEdit(false)}/>)
}
         
    </div>
  );
};

export default Profile;
