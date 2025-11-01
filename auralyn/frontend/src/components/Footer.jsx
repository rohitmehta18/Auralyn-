import React from "react";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copy">© {year} Auralyn. All rights reserved.</p>
          <ul className="footer-legal">
            <li><a href="#" className="footer-legal-link">Privacy</a></li>
            <li><a href="#" className="footer-legal-link">Terms</a></li>
            <li><a href="#" className="footer-legal-link">Cookies</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
    