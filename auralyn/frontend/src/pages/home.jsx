import React from "react";
import "./Home.css";
import ModelViewer from "../components/ModelViewer";

export default function Home() {
  return (
    <div className="home">
      <div className="content">
        <h1 className="title">Welcome to Auralyn</h1>
        <p className="subtitle">Feel the rhythm. Feel the soul.</p>
        <button className="explore-btn">Explore Music</button>
      </div>

      {/* 3D Model Section */}
      <div className="model-wrapper">
        <ModelViewer />
      </div>
    </div>
  );
}
