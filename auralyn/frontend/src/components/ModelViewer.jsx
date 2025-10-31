import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center } from "@react-three/drei";
import * as THREE from "three";

function CharacterModel() {
  const { scene, animations } = useGLTF("/models/auralyn.glb");
  const mixer = useRef(null);
  const action = useRef(null);
  const hasPlayed = useRef(false);


  const scaleTarget = useRef(0.6);
  const posTarget = useRef(-1);
  const opacityTarget = useRef(1);


  const scaleRef = useRef(0.6);
  const posXRef = useRef(-1);
  const opacityRef = useRef(1);

  
  const materialsRef = useRef([]);

  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      action.current = mixer.current.clipAction(animations[0]);
      action.current.clampWhenFinished = true;
      action.current.loop = THREE.LoopOnce;
    }

   
    scene.scale.setScalar(0.6);
    scene.position.set(-1, -0.2, 0);
    scene.rotation.set(-0.2, 0, 0);

    
    const mats = [];
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        const arr = Array.isArray(obj.material) ? obj.material : [obj.material];
        arr.forEach((m) => {
          m.transparent = true; 
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

       
        if (scrollY < 20 && hasPlayed.current) {
          hasPlayed.current = false;
          if (action.current) {
            action.current.reset();
            action.current.stop();
          }
        }

      
        if (scrollY <= 200) {
          const p = Math.max(0, Math.min(1, scrollY / 200));
          const eased = easeInOut(p);
          scaleTarget.current = 0.6 - eased * 0.3;
          posTarget.current = -1 + eased * 2;
          opacityTarget.current = 1;
        }

        
        if (scrollY > 200 && scrollY <= 600) {
          const p = Math.max(0, Math.min(1, (scrollY - 200) / 400));
          const eased = easeInOut(p);
          scaleTarget.current = 0.3 + eased * (1.2 - 0.3);
          posTarget.current = 1 + (0 - 1) * eased;
          opacityTarget.current = 1;
        }

     
        if (scrollY > 600 && scrollY <= 900) {
          const p = Math.max(0, Math.min(1, (scrollY - 600) / 300));
          const eased = easeInOut(p);
          scaleTarget.current = 1.2 + eased * (4.0 - 1.2);
          posTarget.current = 0;
          opacityTarget.current = 1 - eased;
        }

       
        if (scrollY > 900) {
          scaleTarget.current = 4.0;
          posTarget.current = 0;
          opacityTarget.current = 0;
        }

      
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


    scaleRef.current = THREE.MathUtils.damp(scaleRef.current, scaleTarget.current, 6, delta);
    posXRef.current = THREE.MathUtils.damp(posXRef.current, posTarget.current, 6, delta);
    opacityRef.current = THREE.MathUtils.damp(opacityRef.current, opacityTarget.current, 6, delta);

    
    scene.scale.setScalar(scaleRef.current);
    scene.position.set(posXRef.current, -0.2, 0);
    scene.rotation.set(-0.2, 0, 0);

 
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
        gl={{ antialias: true, alpha: true }}              
        onCreated={({ gl }) => gl.setClearAlpha(0)}         
        style={{ position: "absolute", inset: 0 }}         
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
