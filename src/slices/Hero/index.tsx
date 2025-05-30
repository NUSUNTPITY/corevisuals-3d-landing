{
  "dependencies": {
    "core": [
      "react@^18.3.1",
      "react-dom@^18.3.1",
      "@react-three/fiber@^8.17.10",
      "three@^0.169.0"
    ],
    "animations": [
      "gsap@^3.12.5",
      "framer-motion@^12.6.3"
    ],
    "3d-helpers": [
      "@react-three/drei@^9.114.0"
    ],
    "styling": [
      "clsx@^2.1.1",
      "tailwind-merge@^2.5.4",
      "tailwindcss@^3.4.14"
    ],
    "types": [
      "@types/react",
      "@types/react-dom",
      "@types/three",
      "@types/node"
    ],
    "bundler": [
      "vite@^5.4.10",
      "@vitejs/plugin-react@^4.3.3"
    ],
    "linting": [
      "eslint@^9.15.0",
      "@eslint/js@^9.13.0",
      "typescript-eslint@^8.10.0",
      "eslint-plugin-react-hooks@^5.0.0",
      "eslint-plugin-react-refresh@^0.4.14"
    ],
    "responsive": [
      "react-responsive@^9.0.2"
    ],
    "tooling": [
      "postcss@^8.4.35",
      "autoprefixer@^10.4.20",
      "typescript@^5.6.3"
    ],
    "icons": [
      "lucide-react@^0.344.0"
    ],
      "dev_tools":[]
  },
  "package_selection_criteria": {
    "3d_rendering": "Three.js ecosystem for robust 3D rendering, animations and Drei for community components.",
    "responsive_design": "react-responsive for media query logic.",
    "bundling": "Vite for fast dev builds and optimized production bundles.",
    "styling": "Tailwind CSS for utility-first styling with Tailwind Merge and clsx for function class names.",
    "tooling": "Typescript and ESLint for code quality."
  }
}
```

```typescript
// src/slices/Hero/index.tsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bounded } from '../../components/ui/Bounded';
import { Button } from '../../components/ui/Button';
import { TextSplitter } from '../../components/ui/TextSplitter';
import { use3DAnimation } from '../../hooks/use3DAnimation';
import * as THREE from 'three';
import { Sphere, MeshWobbleMaterial, OrbitControls } from '@react-three/drei';

const Hero = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const { floatingAnimation } = use3DAnimation(sphereRef);

  useFrame(() => {
    if (sphereRef.current) {
      floatingAnimation(sphereRef.current);
    }
  });

  return (
    <Bounded as="section" className="bg-gradient-to-br from-blue-900 to-purple-700 text-white py-24">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <TextSplitter>
            Unleash the Power of 3D Visualization
          </TextSplitter>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Transform your SaaS product showcase with immersive 3D experiences.
        </p>
        <Button variant="primary" onClick={() => window.open('https://example.com/demo', '_blank')}>
          Request a Demo
        </Button>

        <Canvas className="mt-12" dpr={[1, 2]} camera={{ position: [0, 0, 3.5], fov: 50 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-5, 5, -5]} intensity={0.5} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          <Sphere ref={sphereRef} args={[1, 100, 100]}>
            <MeshWobbleMaterial
              attach="material"
              color="#6246EA"
              factor={0.6}
              speed={1.2}
              roughness={0}
            />
          </Sphere>
        </Canvas>
      </div>
    </Bounded>
  );
};

export default Hero;