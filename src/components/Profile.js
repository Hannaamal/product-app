import React, { useEffect, useState } from "react";
import api from "../api";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    api.get("/api/user/profile").then((res) => {
      setUser(res.data.data);
    });
  }, []);

  const handleImageUpload = async () => {
    if (!imageFile) return;
    const formData = new FormData();
    formData.append("image", imageFile);

    await api.put("/api/user/profile/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    window.location.reload();
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        
        <img
          className="profile-img"
          src={`${process.env.REACT_APP_BACKEND_URL}/${user.image}`}
          alt="profile"
        />

        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Role: {user.role}</p>

        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          accept="image/*"
        />
        <button onClick={handleImageUpload}>Upload Image</button>

      </div>
    </div>
  );
};

export default Profile;
