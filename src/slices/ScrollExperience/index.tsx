{
  "name": "corevisuals",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@emailjs/browser": "^4.2.0",
    "@react-three/drei": "^9.99.0",
    "@react-three/fiber": "^8.17.0",
    "@reduxjs/toolkit": "^2.2.1",
    "@tailwindcss/forms": "^0.5.7",
    "@testing-library/jest-dom": "^6.4.2",
    "@testing-library/react": "^14.3.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.11.24",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.17",
    "clsx": "^2.3.1",
    "framer-motion": "^11.0.6",
    "gsap": "^3.12.6",
    "maath": "^0.5.0",
    "postcss": "^8.4.35",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-intersection-observer": "^9.8.1",
    "react-redux": "^10.0.0",
    "react-router-dom": "^6.22.1",
    "react-scripts": "5.0.1",
    "react-simple-typewriter": "^5.0.1",
    "react-spring": "^9.7.3",
    "react-tilt": "^1.0.2",
    "sharp": "^0.33.2",
    "tailwind-merge": "^2.2.1",
    "tailwindcss": "^3.4.1",
    "three": "^0.162.0",
    "typescript": "^5.4.2",
    "valtio": "^1.15.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "daisyui": "^4.7.2"
  }
}
```

```typescript
// src/slices/ScrollExperience/index.tsx
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot, MeshWobbleMaterial, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollExperience = () => {
  const torusKnotRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => {
    if (!torusKnotRef.current || !materialRef.current) return;

    const torusKnot = torusKnotRef.current;
    const material = materialRef.current;

    gsap.context(() => {
      gsap.to(torusKnot.rotation, {
        x: 10,
        scrollTrigger: {
          trigger: ".scroll-experience",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          onUpdate: (self) => {
            const progress = self.progress;

            // Smooth background transitions
            const startColor = new THREE.Color("#12182B"); // Your brand dark blue
            const endColor = new THREE.Color("#79B8F3"); // Your brand light blue
            const interpolatedColor = startColor.lerp(endColor, progress);
            document.body.style.backgroundColor = interpolatedColor.getStyle();

            // Example: Animate material properties
            material.uniforms.uTime.value = progress * 5; // Example: Animate time
          },
        },
      });
    }, torusKnotRef.current);

    return () => {
      gsap.killTweensOf(torusKnot.rotation);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.body.style.backgroundColor = ""; // Reset background color
    };
  }, []);

  return (
    <section className="scroll-experience h-screen bg-brand-dark-blue text-white flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
          <TorusKnot
            ref={torusKnotRef}
            args={[1, 0.3, 100, 32]} // Adjust detail as needed for performance
            position={[0, 0, 0]}
          >
            <MeshWobbleMaterial
              ref={materialRef}
              color="#79B8F3" // Your brand light blue
              metalness={0.8}
              roughness={0.2}
              factor={0.6} // Wobble intensity
              speed={1.2}    // Wobble speed
            />
          </TorusKnot>
        </Canvas>
      </div>
      <div className="relative z-10 text-center p-8">
        <h2 className="text-4xl font-bold mb-4">Immersive Data Insights</h2>
        <p className="text-lg">
          Experience your data like never before. Our innovative platform transforms complex information into stunning 3D visualizations, providing actionable insights and a competitive edge.
        </p>
      </div>
    </section>
  );
};

export default ScrollExperience;