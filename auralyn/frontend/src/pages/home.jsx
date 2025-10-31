import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import "./Home.css";
import ModelViewer from "../components/ModelViewer";
import MotionText from "../components/MotionText";
import DarkVeil from "../components/DarkVeil";
import FlowingMenu from "../components/FlowingMenu";
import alogo from "../assets/alogo.png";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const raw = Math.max(0, Math.min(1, y / 200));
      setProgress(easeInOut(raw));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = [
    { link: "#one", text: "Popular artists", image: "/images/feat1.jpg" },
    { link: "#two", text: "Popular radio", image: "/images/feat2.jpg" },
    { link: "#three", text: "Featured Charts", image: "/images/feat3.jpg" },
    { link: "#four", text: "Trending songs", image: "/images/feat4.jpg" },
  ];

  return (
    <div className="home">
      <div className="darkveil-bg">
        <DarkVeil
          hueShift={20}
          noiseIntensity={0.02}
          scanlineIntensity={0.0}
          speed={0.8}
          scanlineFrequency={6.0}
          warpAmount={0.12}
          resolutionScale={1.5}
        />
      </div>

      <div className="content top-hero">
        <motion.h1
          className="brand-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          aria-label="Welcome to Auralyn"
        >
          <span className="brand-line">
            <span className="brand-kicker">Welcome to</span>
            <span className="brand-word">
              <img src={alogo} alt="A" className="brand-logo" />
              <span className="brand-text">uralyn</span>
            </span>
          </span>
        </motion.h1>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          Feel the rhythm. Feel the soul.
        </motion.p>
        <button className="explore-btn">Explore Music</button>
      </div>

      <div className="model-wrapper">
        <ModelViewer />
        <MotionText progress={progress} />
      </div>

      {/* White Section */}
<section className="landing-content">
  <div className="landing-inner">

    <FlowingMenu items={menuItems} theme="light" />
  </div>
</section>
    </div>
  );
}
