import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png"; // your logo image

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating logo circle (independent from navbar) */}
      <div className="floating-logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Main navbar */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <ul className="nav-center">
          <li>Home</li>
          <li>Explore</li>
          <li>Library</li>
          <li>Settings</li>
        </ul>

        <div className="nav-right">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </nav>
    </>
  );
}
