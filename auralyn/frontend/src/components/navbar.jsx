import React, { useEffect, useState } from "react";
import "./Navbar.css";
import alogo from "../assets/alogo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {}
      <div className={`nav-logo-fixed ${scrolled ? "scrolled" : ""}`}>
        <img src={alogo} alt="Logo" />
      </div>

      {}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <ul className="nav-center">
          <li>Home</li>
          <li>Explore</li>
          <li>Library</li>
          <li>Settings</li>
        </ul>
      </nav>

      {}
      <div className={`auth-bar ${scrolled ? "scrolled" : ""}`}>
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </>
  );
}
