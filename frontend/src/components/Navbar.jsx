import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/NayiDisha.jpg.jpeg";

function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0f1720]/70 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/">
          <div className="flex items-center gap-3 group cursor-pointer">

<div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-[#81A6C6]/20 border border-white/10">
  <img
    src={logo}
    alt="NayiDisha Logo"
    className="w-full h-full object-cover"
  />
</div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-wide text-white">
                NayiDisha
              </h1>

              <p className="text-xs tracking-[0.3em] uppercase text-[#AACDDC]">
                AI Hiring Platform
              </p>
            </div>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">

          <Link
            to="/"
            className="text-[#F3E3D0] hover:text-[#81A6C6] transition font-medium"
          >
            Home
          </Link>

          <Link
            to="/interview"
            className="text-[#F3E3D0] hover:text-[#81A6C6] transition font-medium"
          >
            Interview
          </Link>

          <Link
            to="/dashboard"
            className="text-[#F3E3D0] hover:text-[#81A6C6] transition font-medium"
          >
            Dashboard
          </Link>

          <Link
            to="/login"
            className="text-[#F3E3D0] hover:text-[#81A6C6] transition font-medium"
          >
            Login
          </Link>

          <Link to="/register">
            <button className="primary-btn text-sm">
              Get Started
            </button>
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="md:hidden text-white text-3xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/10 px-6 py-6 space-y-5">

          <Link
            to="/"
            onClick={() =>
              setMenuOpen(false)
            }
            className="block text-[#F3E3D0] hover:text-[#81A6C6] transition"
          >
            Home
          </Link>

          <Link
            to="/interview"
            onClick={() =>
              setMenuOpen(false)
            }
            className="block text-[#F3E3D0] hover:text-[#81A6C6] transition"
          >
            Interview
          </Link>

          <Link
            to="/dashboard"
            onClick={() =>
              setMenuOpen(false)
            }
            className="block text-[#F3E3D0] hover:text-[#81A6C6] transition"
          >
            Dashboard
          </Link>

          <Link
            to="/login"
            onClick={() =>
              setMenuOpen(false)
            }
            className="block text-[#F3E3D0] hover:text-[#81A6C6] transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            <button className="primary-btn w-full">
              Get Started
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;