import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import "./Home.css";
import ModelViewer from "../components/ModelViewer";
import MotionText from "../components/MotionText";
import DarkVeil from "../components/DarkVeil";
import MusicTiles from "../components/MusicTiles";
import TextType from "../components/TextType";
import AnimatedContent from "../components/AnimatedContent";
import Footer from "../components/Footer";
import alogo from "../assets/alogo.png";

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

  const musicRows = [
    {
      title: "Popular Artists",
      items: [
        { image: karan,  title: "Making Memories",  artist: "Karan Aujla",  genre: "Punjabi Pop", duration: "3:45", isExplicit: false },
        { image: prem,   title: "Check It Out",    artist: "Prem Dhillon", genre: "Hip Hop",     duration: "4:20", isExplicit: true  },
        { image: arijit, title: "Tum Hi Ho",       artist: "Arijit Singh", genre: "Romantic",    duration: "4:15", isExplicit: false },
        { image: navvan, title: "Bambiha Bole",    artist: "Navaan Sandhu",genre: "Punjabi",     duration: "3:30", isExplicit: true  },
        { image: krsna,  title: "No Cap",          artist: "Kr$na",        genre: "Rap",         duration: "3:55", isExplicit: true  },
        { image: karan,  title: "Softly",          artist: "Karan Aujla",  genre: "Punjabi Pop", duration: "3:25", isExplicit: false },
      ]
    },
    {
      title: "New Releases",
      items: [
        { image: arijit, title: "Raataan Lambiyan", artist: "Arijit Singh", genre: "Bollywood", duration: "3:50", isExplicit: false },
        { image: karan,  title: "Don't Look",       artist: "Karan Aujla",  genre: "Punjabi Pop", duration: "3:40", isExplicit: false },
        { image: navvan, title: "Players",          artist: "Navaan Sandhu",genre: "Punjabi",    duration: "3:20", isExplicit: true  },
        { image: krsna,  title: "Freeverse Feast",  artist: "Kr$na",        genre: "Rap",        duration: "4:30", isExplicit: true  },
      ]
    },
    {
      title: "Trending Now",
      items: [
        { image: karan,  title: "Gangsta",       artist: "Karan Aujla",  genre: "Punjabi Pop", duration: "3:35", isExplicit: true  },
        { image: prem,   title: "Dhaka",         artist: "Prem Dhillon", genre: "Hip Hop",     duration: "4:15", isExplicit: true  },
        { image: arijit, title: "Channa Mereya", artist: "Arijit Singh", genre: "Sad",         duration: "4:45", isExplicit: false },
        { image: navvan, title: "Ilzaam",        artist: "Navaan Sandhu",genre: "Punjabi",     duration: "3:25", isExplicit: false },
      ]
    },
    {
      title: "Punjabi Hits",
      items: [
        { image: karan,  title: "Don't Look",  artist: "Karan Aujla",  genre: "Punjabi Pop", duration: "3:40", isExplicit: false },
        { image: prem,   title: "G.O.A.T.",    artist: "Prem Dhillon", genre: "Hip Hop",     duration: "4:05", isExplicit: true  },
        { image: navvan, title: "Players",     artist: "Navaan Sandhu",genre: "Punjabi",     duration: "3:20", isExplicit: true  },
        { image: karan,  title: "Softly",      artist: "Karan Aujla",  genre: "Punjabi Pop", duration: "3:25", isExplicit: false },
      ]
    },
    {
      title: "Bollywood Favorites",
      items: [
        { image: arijit, title: "Tum Hi Ho",        artist: "Arijit Singh", genre: "Romantic",  duration: "4:15", isExplicit: false },
        { image: arijit, title: "Raataan Lambiyan", artist: "Arijit Singh", genre: "Bollywood", duration: "3:50", isExplicit: false },
        { image: arijit, title: "Kesariya",         artist: "Arijit Singh", genre: "Romantic",  duration: "4:10", isExplicit: false },
      ]
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
        <button className="make-music-btn">Explore Music</button>
      </div>

      <div className="model-wrapper">
        <ModelViewer />
        <MotionText progress={progress} />
      </div>

      {/* Full‑bleed music tiles */}
      <section className="music-tiles-section">
        <div className="music-tiles-inner">
          <MusicTiles rows={musicRows} />
        </div>
      </section>

      {/* CTA section */}
      <section id="make-music" className="make-music-section">
        <div className="make-music-inner">
          <AnimatedContent
            distance={60}
            duration={0.9}
            ease="power3.out"
            initialOpacity={0}
            direction="vertical"
            threshold={0.2}
          >
            <h2 className="make-music-heading">
              <TextType
                as="span"
                text="Wanna make your own music"
                typingSpeed={50}
                initialDelay={250}
                pauseDuration={2000}
                deletingSpeed={30}
                loop={false}
                showCursor={true}
                hideCursorWhileTyping={false}
                cursorCharacter="|"
                cursorBlinkDuration={0.5}
                textColors={["#ffffff"]}
                variableSpeed={{ min: 35, max: 75 }}
                startOnVisible={true}
                className="make-music-typer"
              />
            </h2>
          </AnimatedContent>

          <AnimatedContent
            distance={80}
            duration={0.9}
            ease="power3.out"
            initialOpacity={0}
            direction="vertical"
            threshold={0.2}
            delay={0.1}
          >
            <div className="make-music-actions">
              <button className="make-music-btn">Explore more</button>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Spotlight section removed to eliminate extra text */}
      <Footer />
    </div>
  );
}
