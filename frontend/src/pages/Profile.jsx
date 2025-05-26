import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe", // Default name
    email: "johndoe@example.com", // Default email
    picture: "", // Default profile picture
  });
  const [newName, setNewName] = useState(user.name);
  const [newPicture, setNewPicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For showing the image preview
  const navigate = useNavigate();

  // Handle profile update
  const handleUpdateProfile = (event) => {
    event.preventDefault();

    // Simulate profile update by updating the user state
    const updatedUser = { ...user, name: newName, picture: imagePreview };
    setUser(updatedUser); // Update the user state with the new data

    // Simulate a backend call for updating the profile (axios put request)
    alert("Profile updated successfully!");
  };

  // Handle logout
  const handleLogout = () => {
    // Simulate clearing data (logging out)
    localStorage.removeItem("token"); // Simulate token removal
    navigate("/login"); // Redirect to login page
  };

  // Handle delete profile
  const handleDeleteProfile = () => {
    // Simulate profile deletion by clearing the user state and redirecting to login
    setUser({
      name: "",
      email: "",
      picture: "",
    });
    localStorage.removeItem("token"); // Simulate token removal
    navigate("/login"); // Redirect to login page
  };

  // Handle picture change (image preview)
  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the image file to preview it
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setNewPicture(file); // Store the file for future use (if submitting)
    }
  };

  return (
    <div className="profile-container">
      <h1 className="text-2xl font-semibold">Your Profile</h1>
      <div>
        {/* Display the profile picture */}
        <img
          src={imagePreview || user.picture || "default-profile.jpg"} // Use imagePreview if available, or fallback to default
          alt="Profile"
          className="profile-pic"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }} // Optional styling for the image
        />
        <form onSubmit={handleUpdateProfile}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2 mt-2"
            placeholder="Enter new name"
          />
          <input
            type="file"
            onChange={handlePictureChange}
            className="border p-2 mt-2"
          />
          <button type="submit" className="px-8 py-2 mt-4 ml-5 text-white bg-black">
            Update Profile
          </button>
        </form>

        {/* Delete Profile Button */}
        <button
          onClick={handleDeleteProfile}
          className="mt-4 mr-10 px-8 py-2 bg-red-500 text-white"
        >
          Delete Profile
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-4 px-8 py-2 bg-blue-500 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
