import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import UserProfileBento from "../components/UserProfileBento";
import { updateUser } from "../store/AuthSlice";

function UserProfile() {
  // get user info

  const userdata = useSelector((state) => state.auth.user);
  console.log(userdata);
  
  const user_id = userdata.user.id;
  const points = userdata.user.reward_points;

  const [editable, setEditable] = useState(false);
  const maxPoints = 200;

  const [formData, setFormData] = useState({
    fullName: userdata.user.fullname,
    phone: userdata.user.phone,
    dob: userdata.user.dob,
    email: userdata.user.email,
    username: userdata.user.username,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/customers/${user_id}`
      );
      dispatch(updateUser(response.data)); // Overwrite with fresh data
    } catch (error) {
      console.error("Error fetching user after update:", error);
    }
  };

  const dispatch = useDispatch();
  const handleUpdate = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/customers/update/${user_id}`,
        formData
      );
      await fetchUser();

      console.log("User updated and refreshed from backend");

      setEditable(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Something went wrong while updating!");
    }
  };

  return (
    <div className="h-screen w-screen flex p-10 pb-0 bg-white">
      <UserProfileBento
        user={formData}
        editable={editable}
        setEditable={setEditable}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        formData={formData}
        points={points}
        maxPoints={maxPoints}
        progress={(points / maxPoints) * 100}
      />
    </div>
  );
}

export default UserProfile;
