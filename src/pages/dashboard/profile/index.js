import React, { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import Layout from "../layout";

const ProfileSettings = () => {
  const { userProfile, updateUserProfile } = useUser();
  const [formData, setFormData] = useState({
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    email: userProfile?.email || "",
    // Add more fields as required
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the method to update the user profile
    const success = await updateUserProfile(formData);
    if (success) {
      // Handle successful profile update
      console.log("Profile updated successfully");
    } else {
      // Handle failure
      console.log("Failed to update profile");
    }
  };

  return (
    <Layout>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
        <h1 className="text-3xl mb-4 dark:text-white">Profile Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          {/* Add more form fields here as required */}
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </Layout>
  );
};

export default ProfileSettings;
