import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import "./Home.css";
import ModelViewer from "../components/ModelViewer";
import MotionText from "../components/MotionText";
import DarkVeil from "../components/DarkVeil";

// logo asset
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

      {/* Hero Content */}
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

      {/* Sticky 3D Layer */}
      <div className="model-wrapper">
        <ModelViewer />
        <MotionText progress={progress} />
      </div>

      {/* Scroll Sections */}
      <section className="section">
        <h2>Discover the Sound</h2>
        <p>Dive into curated tracks, immersive visuals, and stories behind the music.</p>
        <p>Scroll to watch the model glide right, return center, expand, and fade as content appears below.</p>
      </section>

      <section className="section alt">
        <h2>Featured Sessions</h2>
        <p>Studio live-takes and acoustic cuts bring you closer to the performance with raw dynamics and texture.</p>
        <p>Hear alternate arrangements, layered harmonies, and intimate mixes that highlight the core emotion of each track.</p>
      </section>

      <section className="section">
        <h2>Playlists for Every Mood</h2>
        <p>From sunrise focus to midnight ambient, find handcrafted playlists tuned to your day.</p>
        <p>Save your favorites, share with friends, and follow evolving sets as new releases drop.</p>
      </section>

      <section className="section alt">
        <h2>Behind the Scenes</h2>
        <p>Explore writing notes, production breakdowns, and instruments used to craft signature sounds.</p>
        <p>Get a peek at sessions, stems, and the creative process that fuels each release.</p>
      </section>

      <section className="section">
        <h2>Stay in the Loop</h2>
        <p>Subscribe for new drops, live events, and experimental visuals delivered straight to your feed.</p>
        <p>Feedback shapes the journey—tell what resonates and what you want to hear next.</p>
      </section>
    </div>
  );
}
