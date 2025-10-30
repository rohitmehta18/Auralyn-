import React, { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <ul className="nav-links">
        <li>Home</li>
        <li>Explore</li>
        <li>Library</li>
        <li>Settings</li>
      </ul>
    </nav>
  );
}
