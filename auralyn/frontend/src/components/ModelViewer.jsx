// src/components/ModelViewer.jsx
import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center } from "@react-three/drei";
import * as THREE from "three";

function CharacterModel() {
  const { scene, animations } = useGLTF("/models/auralyn.glb");
  const mixer = useRef(null);
  const action = useRef(null);
  const hasPlayed = useRef(false);

  // Targets
  const scaleTarget = useRef(0.6);
  const posTarget = useRef(-1);
  const opacityTarget = useRef(1);

  // Rendered values
  const scaleRef = useRef(0.6);
  const posXRef = useRef(-1);
  const opacityRef = useRef(1);

  // Cache mesh materials for fading
  const materialsRef = useRef([]);

  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      action.current = mixer.current.clipAction(animations[0]);
      action.current.clampWhenFinished = true;
      action.current.loop = THREE.LoopOnce;
    }

    // Initial transform
    scene.scale.setScalar(0.6);
    scene.position.set(-1, -0.2, 0);
    scene.rotation.set(-0.2, 0, 0);

    // Collect materials once and enable transparency for fade
    const mats = [];
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        const arr = Array.isArray(obj.material) ? obj.material : [obj.material];
        arr.forEach((m) => {
          m.transparent = true; // allow opacity to visually change
          mats.push(m);
        });
      }
    });
    materialsRef.current = mats;
  }, [animations, scene]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Reset animation if near top
        if (scrollY < 20 && hasPlayed.current) {
          hasPlayed.current = false;
          if (action.current) {
            action.current.reset();
            action.current.stop();
          }
        }

        // Phase A: 0–200px  (-1 → +1), scale 0.6 → 0.3
        if (scrollY <= 200) {
          const p = Math.max(0, Math.min(1, scrollY / 200));
          const eased = easeInOut(p);
          scaleTarget.current = 0.6 - eased * 0.3;
          posTarget.current = -1 + eased * 2;
          opacityTarget.current = 1;
        }

        // Phase B: 200–600px  (+1 → 0), scale 0.3 → 1.2
        if (scrollY > 200 && scrollY <= 600) {
          const p = Math.max(0, Math.min(1, (scrollY - 200) / 400));
          const eased = easeInOut(p);
          scaleTarget.current = 0.3 + eased * (1.2 - 0.3);
          posTarget.current = 1 + (0 - 1) * eased;
          opacityTarget.current = 1;
        }

        // Phase C: 600–900px  (stay centered), scale 1.2 → 4.0, opacity 1 → 0
        if (scrollY > 600 && scrollY <= 900) {
          const p = Math.max(0, Math.min(1, (scrollY - 600) / 300));
          const eased = easeInOut(p);
          scaleTarget.current = 1.2 + eased * (4.0 - 1.2);
          posTarget.current = 0;
          opacityTarget.current = 1 - eased;
        }

        // Clamp beyond
        if (scrollY > 900) {
          scaleTarget.current = 4.0;
          posTarget.current = 0;
          opacityTarget.current = 0;
        }

        // Play GLTF animation once on first scroll
        if (scrollY > 0 && !hasPlayed.current && action.current) {
          action.current.play();
          hasPlayed.current = true;
        }

        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);

    // Smooth damping toward targets
    scaleRef.current = THREE.MathUtils.damp(scaleRef.current, scaleTarget.current, 6, delta);
    posXRef.current = THREE.MathUtils.damp(posXRef.current, posTarget.current, 6, delta);
    opacityRef.current = THREE.MathUtils.damp(opacityRef.current, opacityTarget.current, 6, delta);

    // Apply transforms
    scene.scale.setScalar(scaleRef.current);
    scene.position.set(posXRef.current, -0.2, 0);
    scene.rotation.set(-0.2, 0, 0);

    // Apply fade to all materials
    for (const m of materialsRef.current) {
      if (m && "opacity" in m) m.opacity = opacityRef.current;
    }
  });

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

export default function ModelViewer() {
  return (
    <div className="canvas-stage">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 2.2, 5.5], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}               // transparent WebGL context
        onCreated={({ gl }) => gl.setClearAlpha(0)}         // ensure transparent clear
        style={{ position: "absolute", inset: 0 }}          // cover the stage
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.1} />
          <directionalLight position={[3, 5, 3]} intensity={1.8} />
          <Environment preset="city" background={false} />
          <CharacterModel />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
