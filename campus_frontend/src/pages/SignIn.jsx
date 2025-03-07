import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShowHideButton from "../components/ShowHideButton";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8000/appuser/signin/", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('showWelcomeFade', 'true');
        navigate("/welcome");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center min-h-screen w-screen bg-white text-black">


      {/* Right side - Sign In Form */}
      <div className="w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-1 text-center">Welcome Back</h2>
          <p className="text-gray-600 text-center mb-6">Sign in to your Campus account</p>
    
          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
    
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ShowHideButton
                showPassword={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
    
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </form>
    
          <p className="text-center text-gray-600 mt-6">
            New to Campus? <a href="/register" className="text-blue-500">Create an account</a>
          </p>
    
          {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
}  

export default SignIn;
