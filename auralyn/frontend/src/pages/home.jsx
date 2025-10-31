import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import "./Home.css";
import ModelViewer from "../components/ModelViewer";
import MotionText from "../components/MotionText";
import DarkVeil from "../components/DarkVeil";
import FlowingMenu from "../components/FlowingMenu";
import alogo from "../assets/alogo.png";

// Imported from src/assets (ensure file names/extensions are correct)
import karan from "../assets/karan.jpg";
import navvan from "../assets/navvan.jpg";
import prem from "../assets/prem.jpg";
import arijit from "../assets/arijit.jpg";
import krsna from "../assets/krsna.jpg";

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

  // Five artist images reused across all menus for now
  const artistImages = [karan, prem, arijit, navvan, krsna];

  const menuItems = [
    {
      link: "#artists",
      text: "Popular artists",
      images: artistImages,
      marqueeTexts: ["Karan Aujla", "Prem Dhillon", "Arijit Singh", "Navaan Sandhu", "Kr$na"],
    },
    {
      link: "#albums",
      text: "Popular albums",
      images: artistImages,
      marqueeTexts: ["Aashiqui 2", "Kabir Singh", "Ae Dil Hai Mushkil", "Sanam Re", "Rockstar"],
    },
    {
      link: "#radio",
      text: "Popular radio",
      images: artistImages,
      marqueeTexts: ["Bollywood Beats", "Desi Vibes", "LoFi Hindi", "Top 40 India", "Retro 90s"],
    },
    {
      link: "#charts",
      text: "Featured Charts",
      images: artistImages,
      marqueeTexts: ["India Top 50", "Punjabi Hits", "Bollywood Hot 30", "Indie India", "Viral 50"],
    },
    {
      link: "#trending",
      text: "Trending songs",
      images: artistImages,
      marqueeTexts: ["Heeriye", "Kesariya", "Apna Bana Le", "Pasoori", "O Maahi"],
    },
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

      <section className="landing-content">
        <div className="landing-inner">
          <FlowingMenu items={menuItems} theme="light" />
        </div>
      </section>
    </div>
  );
}
