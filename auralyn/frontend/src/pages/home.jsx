// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import "./Home.css";
import ModelViewer from "../components/ModelViewer";
import MotionText from "../components/MotionText";
import BlurText from "../components/BlurText";

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
      <div className="content top-hero">
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

      {/* Sticky full-viewport 3D layer */}
      <div className="model-wrapper">
        <ModelViewer />
        <MotionText progress={progress} />
      </div>

      {/* Scroll content below */}
      <section className="section">
        <h2>Discover the Sound</h2>
        <p>
          Dive into curated tracks, immersive visuals, and stories behind the music.
          Scroll to watch the model glide right, return center, expand, and fade as content appears below.
        </p>
        <p>
          Each section showcases evolving atmospheres, instrumentation, and narratives to deepen the listening journey.
          Keep scrolling to explore playlists, sessions, and behind-the-scenes features.
        </p>
      </section>

      <section className="section alt">
        <h2>Featured Sessions</h2>
        <p>
          Studio live-takes and acoustic cuts bring you closer to the performance with raw dynamics and texture.
        </p>
        <p>
          Hear alternate arrangements, layered harmonies, and intimate mixes that highlight the core emotion of each track.
        </p>
      </section>

      <section className="section">
        <h2>Playlists for Every Mood</h2>
        <p>
          From sunrise focus to midnight ambient, find handcrafted playlists tuned to your day.
        </p>
        <p>
          Save your favorites, share with friends, and follow evolving sets as new releases drop.
        </p>
      </section>

      <section className="section alt">
        <h2>Behind the Scenes</h2>
        <p>
          Explore writing notes, production breakdowns, and instruments used to craft signature sounds.
        </p>
        <p>
          Get a peek at sessions, stems, and the creative process that fuels each release.
        </p>
      </section>

      <section className="section">
        <h2>Stay in the Loop</h2>
        <p>
          Subscribe for new drops, live events, and experimental visuals delivered straight to your feed.
        </p>
        <p>
          Feedback shapes the journey—tell what resonates and what you want to hear next.
        </p>
      </section>
    </div>
  );
}
