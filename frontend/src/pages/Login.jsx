import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import logo from "../assets/NayiDisha.jpg.jpeg";
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "recruiter",
        JSON.stringify(
          response.data.recruiter
        )
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen hero-bg text-white overflow-hidden">
      <Navbar />

      <div className="relative flex items-center justify-center min-h-[92vh] section-padding py-16">

        {/* Background Glow */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#81A6C6]/10 blur-3xl rounded-full"></div>

        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#AACDDC]/10 blur-3xl rounded-full"></div>

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-xl">

          <div
            className="
              glass
              premium-glow
              rounded-[36px]
              px-12
              py-14
            "
          >

{/* Logo */}
<div className="flex justify-center mb-8">

  <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl shadow-[#81A6C6]/20 border border-white/10">

    <img
      src={logo}
      alt="NayiDisha Logo"
      className="w-full h-full object-cover"
    />

  </div>

</div>

            {/* Heading */}
            <div className="text-center mb-12">

              <h1
                className="
                  text-3xl
                  md:text-4xl
                  font-bold
                  tracking-tight
                  text-white
                  leading-tight
                "
              >
                Recruiter Login
              </h1>

              <p
                className="
                  mt-5
                  text-[#D2C4B4]
                  text-xl
                  leading-relaxed
                  font-normal
                "
              >
                Access your AI-powered hiring dashboard securely and manage multilingual workforce interviews.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >

              {/* Email */}
              <div>

                <label className="block mb-3 text-[#F3E3D0] font-semibold text-lg">
                  Email Address
                </label>

                <div className="relative">

                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#AACDDC] text-xl">
                    ✉️
                  </span>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    className="
                      w-full
                      h-16
                      pl-14
                      pr-5
                      rounded-2xl
                      glass
                      bg-[#0B1220]/80
                      text-white text-lg
                      placeholder:text-[#D2C4B4]/60
                      border
                      border-[#81A6C6]/20
                      focus:border-[#4F8CFF]
                      outline-none
                      transition-all
                    "
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>

                <label className="block mb-3 text-[#F3E3D0] font-semibold text-lg">
                  Password
                </label>

                <div className="relative">

                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#AACDDC] text-xl">
                  </span>

                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    className="
                      w-full
                      h-16
                      pl-14
                      pr-5
                      rounded-xl
                      glass
                      bg-[#0B1220]/80
                      text-white text-lg
                      placeholder:text-[#D2C4B4]/60
                      border
                      border-white/10
                      focus:border-[#4F8CFF]
                      outline-none
                      transition-all
                      focus:ring-2
                      focus:ring-[#4F8CFF]/30
                    "
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="
                  w-full
                  h-16
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#4F8CFF]
                  to-[#7B61FF]
                  text-white
                  text-lg
                  font-semibold
                  shadow-[0_0_30px_rgba(79,140,255,0.35)]
                  hover:scale-[1.02]
                  hover:shadow-[0_0_40px_rgba(123,97,255,0.5)]
                  transition-all
                  duration-300
                "
              >
                Login to Dashboard →
              </button>
            </form>

            {/* Bottom Text */}
            <div className="mt-10 text-center">

              <p className="text-[#D2C4B4] text-base leading-relaxed">
                AI-powered multilingual workforce screening platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;