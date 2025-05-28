import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../../admin/src/App";
const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up"); // default is "Sign Up"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Use the navigate hook for redirection

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(""); // Clear the message on form submission

    try {
      const endpoint =
        currentState === "Login"
          ? backendUrl+"/api/user/login"
          : backendUrl+"/api/user/register"; // Set endpoint depending on current state (Login or SignUp)

      const payload =
        currentState === "Login"
          ? { email, password }
          : { name, email, password }; // Set payload based on current state

      const response = await axios.post(endpoint, payload); // Send POST request to API

      setMessage(response.data.message || "Success!");

      if (currentState === "Sign Up") {
        // If it's Sign Up, after successful registration, switch to login form
        setCurrentState("Login");
        setMessage("Account created successfully. Please login.");
        setName(""); // Clear input fields after sign up
        setEmail("");
        setPassword("");
      } else {
        // After successful login, store the token in localStorage and navigate to the profile page
        localStorage.setItem("token", response.data.token); // Store JWT token
        navigate("/profile"); // Redirect to profile page
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setMessage(
        error.response?.data?.message || "Something went wrong. Try again."
      ); // Display error message
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl font-semibold">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState !== "Login" && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Full Name"
          required
        />
      )}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="flex justify-between w-full text-sm mt-[-8px]">
        <p className="cursor-pointer text-gray-500">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer text-blue-600"
          >
            Create a new account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer text-blue-600"
          >
            Login here
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-8 py-2 mt-4 font-light text-white bg-black hover:bg-gray-900 transition"
      >
        {loading
          ? "Please wait..."
          : currentState === "Login"
          ? "Sign In"
          : "Sign Up"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-center text-blue-600">{message}</p>
      )}
    </form>
  );
};

export default Login;
