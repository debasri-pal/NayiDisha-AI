import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import logo from "../assets/NayiDisha.jpg.jpeg";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen hero-bg text-white overflow-hidden">
      <Navbar />

      <div className="relative flex items-center justify-center min-h-[92vh] px-6">

        {/* Background Glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full"></div>

        <div className="absolute w-[450px] h-[450px] bg-purple-500/10 blur-[140px] rounded-full right-20 top-20"></div>

        {/* Register Card */}
        <div className="relative w-full max-w-2xl">

          <div className="glass premium-glow rounded-[32px] px-12 py-14">
{/* Logo */}
<div className="flex justify-center mb-8">

  <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl shadow-[#AACDDC]/20 border border-white/10 bg-white">

    <img
      src={logo}
      alt="NayiDisha Logo"
      className="w-full h-full object-contain"
    />

  </div>

</div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-black text-center leading-tight tracking-tight text-white">
              Recruiter Register
            </h1>

            {/* Subtitle */}
            <p className="text-center text-[#D2C4B4] text-lg mt-5 leading-relaxed max-w-xl mx-auto">
              Create your recruiter account and start managing
              multilingual AI-powered hiring interviews.
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-12 space-y-7"
            >

              {/* Name */}
              <div>
                <label className="block text-lg font-semibold text-[#F3E3D0] mb-3">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="
                    w-full
                    h-16
                    px-6
                    rounded-xl
                    bg-[#0A1325]/80
                    border
                    border-white/10
                    text-white
                    text-lg
                    placeholder:text-gray-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#4F8CFF]/30
                    transition-all
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-lg font-semibold text-[#F3E3D0] mb-3">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="
                    w-full
                    h-16
                    px-6
                    rounded-xl
                    bg-[#0A1325]/80
                    border
                    border-white/10
                    text-white
                    text-lg
                    placeholder:text-gray-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#4F8CFF]/30
                    transition-all
                  "
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-lg font-semibold text-[#F3E3D0] mb-3">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleChange}
                  className="
                    w-full
                    h-16
                    px-6
                    rounded-xl
                    bg-[#0A1325]/80
                    border
                    border-white/10
                    text-white
                    text-lg
                    placeholder:text-gray-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#4F8CFF]/30
                    transition-all
                  "
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="
                  w-full
                  h-16
                  rounded-xl
                  text-xl
                  font-bold
                  bg-gradient-to-r
                  from-[#3B82F6]
                  to-[#C084FC]
                  hover:scale-[1.02]
                  transition-all
                  duration-300
                  shadow-2xl
                  shadow-purple-500/20
                  mt-2
                "
              >
                Create Recruiter Account →
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-[#D2C4B4] text-base mt-10">
              AI-powered multilingual workforce screening platform.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;