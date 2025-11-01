import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./MusicTiles.css";

function MusicTiles({ rows = [] }) {
  return (
    <div className="music-tiles-root">
      {rows.map((row, index) => (
        <MusicRow
          key={index}
          title={row.title}
          items={row.items}
          rowIndex={index}
        />
      ))}
    </div>
  );
}

function MusicRow({ title, items = [], rowIndex }) {
  const sliderRef = useRef(null);
  const progressRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const resizeObsRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScroll = () => Math.max(1, slider.scrollWidth - slider.clientWidth);

    const updateNavStates = () => {
      const leftDisabled = slider.scrollLeft <= 1;
      const rightDisabled = slider.scrollLeft >= maxScroll() - 1;
      if (prevBtnRef.current) {
        prevBtnRef.current.classList.toggle("is-disabled", leftDisabled);
        prevBtnRef.current.setAttribute("aria-disabled", String(leftDisabled));
      }
      if (nextBtnRef.current) {
        nextBtnRef.current.classList.toggle("is-disabled", rightDisabled);
        nextBtnRef.current.setAttribute("aria-disabled", String(rightDisabled));
      }
    };

    const updateProgress = () => {
      const progress = slider.scrollLeft / maxScroll();
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: progress,
          duration: 0.2,
          overwrite: true,
          ease: "power2.out",
        });
      }
      updateNavStates();
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    slider.addEventListener("scroll", onScroll, { passive: true });

    if ("ResizeObserver" in window) {
      resizeObsRef.current = new ResizeObserver(() => updateProgress());
      resizeObsRef.current.observe(slider);
    }

    updateProgress();

    return () => {
      slider.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeObsRef.current) {
        resizeObsRef.current.disconnect();
        resizeObsRef.current = null;
      }
    };
  }, []);

  const scroll = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const amount = Math.min(slider.clientWidth * 0.85, 900);
    const target = slider.scrollLeft + (direction === "left" ? -amount : amount);

    // Use native scrollLeft tween (no ScrollToPlugin required)
    gsap.to(slider, {
      scrollLeft: target,
      duration: 0.7,
      ease: "power2.out",
    });
  };

  return (
    <section
      className="music-row"
      style={{ "--row-index": rowIndex }}
      aria-label={title}
    >
      <div className="row-header">
        <h2 className="row-title">{title}</h2>
        <div className="row-controls" aria-label={`${title} controls`}>
          <button
            ref={prevBtnRef}
            className="nav-btn prev-btn"
            onClick={() => scroll("left")}
            aria-label="Previous"
            type="button"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button
            ref={nextBtnRef}
            className="nav-btn next-btn"
            onClick={() => scroll("right")}
            aria-label="Next"
            type="button"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="slider-container">
        <div className="slider" ref={sliderRef}>
          <div className="slider-track">
            {items.map((item, index) => (
              <MusicTile key={index} {...item} />
            ))}
          </div>
        </div>

        <div className="scroll-progress" aria-hidden="true">
          <div className="progress-bar">
            <div className="progress-fill" ref={progressRef} />
          </div>
        </div>
      </div>
    </section>
  );
}

function MusicTile({ image, title, artist, genre, duration, isExplicit }) {
  const tileRef = useRef(null);
  const playBtnRef = useRef(null);
  const infoRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    gsap.set(playBtnRef.current, { scale: 0.85, opacity: 0 });
    gsap.set(infoRef.current, { y: 16, opacity: 0 });
    return () => {
      if (tlRef.current) tlRef.current.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    if (!tileRef.current) return;
    tlRef.current?.kill();
    const tl = gsap.timeline();
    tl.to(tileRef.current, {
      scale: 1.05,
      y: -8,
      duration: 0.25,
      ease: "back.out(1.6)",
    })
      .to(
        playBtnRef.current,
        { scale: 1, opacity: 1, duration: 0.18, ease: "power2.out" },
        "-=0.08"
      )
      .to(
        infoRef.current,
        { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
        "-=0.14"
      );
    tlRef.current = tl;
  };

  const handleMouseLeave = () => {
    if (!tileRef.current) return;
    tlRef.current?.kill();
    const tl = gsap.timeline();
    tl.to(tileRef.current, {
      scale: 1,
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    })
      .to(
        playBtnRef.current,
        { scale: 0.85, opacity: 0, duration: 0.18 },
        "-=0.12"
      )
      .to(
        infoRef.current,
        { y: 16, opacity: 0, duration: 0.18 },
        "-=0.16"
      );
    tlRef.current = tl;
  };

  const handlePlayClick = (e) => {
    e.preventDefault();
    gsap.fromTo(
      playBtnRef.current,
      { scale: 1 },
      { scale: 1.15, duration: 0.1, yoyo: true, repeat: 1 }
    );
    // hook real play logic here
  };

  return (
    <a
      className="music-tile"
      ref={tileRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      href="#"
      aria-label={`Open ${title}`}
    >
      <div className="tile-media">
        <img className="tile-img" src={image} alt={title} loading="lazy" />
        <div className="tile-overlay" />
        {isExplicit && <div className="explicit-badge">E</div>}
        <div className="duration-badge">{duration}</div>
      </div>

      <div className="tile-info" ref={infoRef}>
        <div className="tile-info-text">
          <h3 className="tile-title">{title}</h3>
          <p className="tile-artist">{artist}</p>
          <div className="tile-meta">
            <span className="tile-genre">{genre}</span>
          </div>
        </div>

        <button
          className="play-btn in-info"
          ref={playBtnRef}
          onClick={handlePlayClick}
          type="button"
          aria-label={`Play ${title}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </a>
  );
}

export default MusicTiles;
