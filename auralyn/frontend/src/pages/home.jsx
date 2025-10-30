import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import "./Home.css";
import ModelViewer from "../components/ModelViewer";
import MotionText from "../components/MotionText";
import BlurText from "../components/BlurText";

export default function Home() {
  const [progress, setProgress] = useState(0);

  // Smooth scroll easing
  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const raw = Math.max(0, Math.min(1, y / 200));
      setProgress(easeInOut(raw));
    };

    onScroll(); // run once at start
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="home">
      {/* === Hero Content === */}
      <div className="content">
        <BlurText
          text="Welcome to Auralyn"
          className="title"
          delay={120}
          animateBy="words"
          direction="top"
          stepDuration={0.4}
        />

        <motion.p
          className="subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Feel the rhythm. Feel the soul.
        </motion.p>

        <button className="explore-btn">Explore Music</button>
      </div>

      {/* === 3D Model Section === */}
      <div className="model-wrapper">
        <ModelViewer progress={progress} />
        <MotionText progress={progress} />
      </div>

      {/* === Scroll Test Section === */}
      <div className="scroll-test">
        <h2>Scroll Down to Test Animation 👇</h2>
        <p>Keep scrolling to see the lid animation sync with scroll!</p>
      </div>
    </div>
  );
}
