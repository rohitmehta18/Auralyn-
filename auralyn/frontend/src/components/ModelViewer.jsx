import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center } from "@react-three/drei";
import * as THREE from "three";

function CharacterModel() {
  const { scene, animations } = useGLTF("/models/auralyn.glb");
  const mixer = useRef(null);
  const action = useRef(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      action.current = mixer.current.clipAction(animations[0]);
      action.current.clampWhenFinished = true;
      action.current.loop = THREE.LoopOnce;
    }

    const handleScroll = () => {
      if (window.scrollY > 100 && !hasPlayed.current && action.current) {
        action.current.play();
        hasPlayed.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animations, scene]);

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return (
    <Center>
      {/* Slightly reduced scale and Y-lift for full fit */}
      <primitive object={scene} scale={0.35} position={[0, -0.2, 0]} />
    </Center>
  );
}

export default function ModelViewer() {
  return (
    <div
      style={{
        width: "100%",
        height: "600px", // Taller to avoid visual cropping
        marginTop: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
      }}
    >
      <Canvas
        camera={{
          position: [0, 2.2, 5.5], // Further back for full model view
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[3, 5, 3]} intensity={1.8} />
          <Environment preset="studio" />
          <CharacterModel />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
