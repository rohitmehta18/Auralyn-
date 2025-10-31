import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function MotionText({ progress }) {
  const p = useMotionValue(progress);
  useEffect(() => p.set(progress), [progress]);
  const ps = useSpring(p, { stiffness: 140, damping: 22, mass: 0.9 });

  const [endX, setEndX] = useState(-280);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1440) setEndX(-460);
      else if (w >= 1280) setEndX(-420);
      else if (w >= 1024) setEndX(-360);
      else if (w >= 768) setEndX(-300);
      else setEndX(-220);
    };
    calc();
    window.addEventListener("resize", calc, { passive: true });
    return () => window.removeEventListener("resize", calc);
  }, []);

  const x = useTransform(ps, [0, 1], [0, endX]);
  const y = useTransform(ps, [0, 1], [0, -10]);
  const opacity = useTransform(ps, [0, 0.3, 1], [0, 0.8, 1]);
  const scale = useTransform(ps, [0, 1], [0.6, 1.0]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        x,
        y,
        scale,
        opacity,
        pointerEvents: "none",
        zIndex: 20,
        maxWidth: 520,
        color: "#e6f2ff",
        textAlign: "left",
        textRendering: "optimizeLegibility",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "2.4rem", lineHeight: 1.1 }}>Auralyn</h2>
      <p style={{ marginTop: 10, fontSize: "1.05rem", lineHeight: 1.5 }}>
        Feel the rhythm. Feel the soul.
      </p>
    </motion.div>
  );
}
