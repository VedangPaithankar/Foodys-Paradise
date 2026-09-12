import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-[76px] bg-paper min-h-screen flex items-start justify-center">
      <div className="w-full max-w-sm mx-auto px-5 pt-16 pb-10">
        <h1 className="font-serif text-3xl text-ink mb-1 text-center">Welcome back</h1>
        <p className="font-sans text-ink-light text-center mb-8">Log in to save recipes and your fridge.</p>
        <form onSubmit={handleSubmit} className="bg-white border border-sand rounded-2xl p-6 space-y-4">
          <input
            type="email"
            className="w-full rounded-full border border-sand px-4 py-2.5 font-sans text-ink placeholder:text-ink-light/60 focus:outline-none focus:border-paprika"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full rounded-full border border-sand px-4 py-2.5 font-sans text-ink placeholder:text-ink-light/60 focus:outline-none focus:border-paprika"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="font-sans text-sm text-brick">{error}</p>}
          <button
            type="submit"
            className="w-full bg-paprika hover:bg-paprika-dark text-white font-sans font-semibold py-2.5 rounded-full transition-colors disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <p className="mt-5 font-sans text-ink-light text-center text-sm">
          No account?{" "}
          <Link to="/signup" className="text-paprika font-medium hover:text-paprika-dark">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
