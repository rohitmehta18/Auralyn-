import { useRef, useEffect } from "react";
import "./SpotlightCard.css";

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
  maxTilt = 15,
  scale = 1.05,
}) => {
  const ref = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = x / rect.width;
    const py = y / rect.height;

    const ry = (px - 0.5) * (maxTilt * 2);
    const rx = (0.5 - py) * (maxTilt * 2);

    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
    el.style.setProperty("--spotlight-color", spotlightColor);
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--scale", scale);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--scale", 1);
    el.style.setProperty("--mouse-x", `50%`);
    el.style.setProperty("--mouse-y", `50%`);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => handleMouseMove(e));
      }}
      onMouseLeave={handleMouseLeave}
      className={`card-spotlight ${className}`}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
