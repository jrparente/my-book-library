import React, { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import Layout from "../layout";
import useToggle from "@/lib/useToggle";
import Loading from "@/components/Dashboard/Loading";

const ProfileSettings = () => {
  const { userProfile, updateUserProfile, loading } = useUser();
  const [notification, setNotification] = useState("");
  const [isEditing, toggleEditing] = useToggle(false);

  const initialFormData = {
    firstName: userProfile?.[0]?.first_name || "",
    lastName: userProfile?.[0]?.last_name || "",
    email: userProfile?.[0]?.email || "",
  };

  const [formData, setFormData] = useState(initialFormData);

  // Update formData when userProfile changes
  useEffect(() => {
    if (userProfile && userProfile[0]) {
      setFormData({
        firstName: userProfile[0]?.first_name || "",
        lastName: userProfile[0]?.last_name || "",
        email: userProfile[0]?.email || "",
      });
    }
  }, [userProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form validation: Ensure all fields are filled
  const isValid = formData.firstName && formData.lastName && formData.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid) {
      const success = await updateUserProfile(formData);
      console.log(success);
      if (success) {
        setNotification("Profile updated successfully");
      } else {
        setNotification("Failed to update profile");
      }
    } else {
      setNotification("Please fill in all fields.");
    }
    setTimeout(() => {
      setNotification("");
      toggleEditing();
    }, 3000);
  };

  if (!userProfile || loading) {
    return (
      <Layout>
        <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
          <h1 className="text-3xl mb-4 text-gray-800 dark:text-white">
            Profile Settings
          </h1>
          <Loading />
        </div>
      </Layout>
    );
  }
  console.log("userProfile", userProfile);
  console.log("formData", formData);
  console.log("loading", loading);
  return (
    <Layout>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 mt-14 md:mt-8 lg:mt-6 w-full">
        <h1 className="text-3xl mb-4 text-gray-800 dark:text-white">Profile</h1>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {notification && (
              <p className="text-green-500 mb-2">{notification}</p>
            )}
            <div className="form-group">
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={toggleEditing}
              className="button-cancel"
            >
              Cancel
            </button>

            <button type="submit" className="button ml-2">
              Update Profile
            </button>
          </form>
        ) : (
          <div className="flex flex-col space-y-6 items-start">
            {notification && (
              <p className="text-green-500 mb-2">{notification}</p>
            )}
            {/* Profile information */}
            <div className="flex space-x-4 mb-4 w-full">
              <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 rounded">
                <strong>Name:</strong> {formData.firstName} {formData.lastName}
              </div>

              <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 rounded">
                <strong>Email:</strong> {formData.email}
              </div>
            </div>

            <button onClick={toggleEditing} className="button">
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfileSettings;
