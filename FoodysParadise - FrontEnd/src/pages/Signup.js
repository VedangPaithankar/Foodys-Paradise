import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signup(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create an account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="custom-font mt-[100px] p-4 mx-auto w-[90%] max-w-md">
      <p className="md:text-[30px] font-bold mb-6">Sign up</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="w-full rounded-full border border-gray-300 p-2 mb-4 focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full rounded-full border border-gray-300 p-2 mb-4 focus:outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-full w-full"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Sign up"}
        </button>
      </form>
      <p className="mt-4">
        Already have an account? <Link to="/login" className="underline-effect-pink">Log in</Link>
      </p>
    </div>
  );
};

export default Signup;
