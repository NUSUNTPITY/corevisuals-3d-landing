{
  "dependencies": {
    "core": {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "three": "^0.169.0",
      "@react-three/fiber": "^8.17.10"
    },
    "effects": {
      "gsap": "^3.12.7",
      "framer-motion": "^12.6.3"
    },
    "ui": {
      "clsx": "^2.3.0",
      "tailwind-merge": "^2.5.4",
      "tailwindcss": "^3.4.1",
      "autoprefixer": "^10.4.17",
      "postcss": "^8.4.35",
      "lucide-react": "^0.344.0"
    },
    "build": {
      "vite": "^5.4.10",
      "typescript": "^5.6.3",
      "@vitejs/plugin-react": "^4.3.3",
      "@types/react": "^18.2.14",
      "@types/react-dom": "^18.2.6",
      "@types/node": "^20.11.0"
    },
    "code_quality": {
      "eslint": "^9.15.0",
      "eslint-plugin-react-hooks": "^5.0.0",
      "eslint-plugin-react-refresh": "^0.4.14",
      "eslint-config-prettier": "^9.1.0"
    },
    "dev_tools": {
      "three-devtools": "^2.0.0"
    },
    "testing": {
      "react-testing-library": "^14.0.0",
      "jest": "^29.7.0"
    },
      "accessibility": {
          "eslint-plugin-jsx-a11y": "^7.3.0"
      }
  },
  "structure": {
    "core": [
      "src/index.tsx",
      "src/App.tsx",
      "src/vite-env.d.ts"
    ],
    "config": [
      "vite.config.ts",
      "tsconfig.json",
      "tsconfig.app.json",
      "tsconfig.node.json",
      "tailwind.config.js",
      "postcss.config.js",
      "eslint.config.js"
    ],
    "ui": [
      "src/components/ui/Bounded.tsx",
      "src/components/ui/Button.tsx",
      "src/components/ui/TextSplitter.tsx",
      "src/index.css"
    ],
    "slices": [
      "src/slices/index.tsx",
      "src/slices/Hero/index.tsx",
      "src/slices/Carousel/index.tsx",
      "src/slices/ScrollExperience/index.tsx",
      "src/slices/Contact/index.tsx"
    ],
    "hooks": [
      "src/hooks/use3DAnimation.ts"
    ],
    "utils": [
      "src/lib/utils.ts"
    ],
    "assets": [
      "public/favicon.svg"
    ],
    "store":[
      "src/store/useStore.ts"
    ]
  }
}
```

```typescript
// src/slices/Contact/index.tsx
import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Bounded } from '../../components/ui/Bounded';
import { Button } from '../../components/ui/Button';
import { useResponsive } from '../../hooks/useResponsive'; // Added missing import

const Contact = () => {
  const { isMobile } = useResponsive();
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 1000;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        x: THREE.MathUtils.randFloatSpread(20),
        y: THREE.MathUtils.randFloatSpread(20),
        z: THREE.MathUtils.randFloatSpread(20),
      });
    }
    return temp;
  }, [particleCount]);

  useEffect(() => {
      if (!particlesRef.current) return;

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      particles.forEach((particle, i) => {
          positions[i * 3] = particle.x;
          positions[i * 3 + 1] = particle.y;
          positions[i * 3 + 2] = particle.z;
      });

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesRef.current.geometry = geometry;
  }, [particles]);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] = particles[i].y + Math.sin(clock.elapsedTime + particles[i].x) * 2;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const particleColor = new THREE.Color('#79B8F3'); // Updated particle color

  return (
    <Bounded as="section" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} color="#ffffff" />
          <points ref={particlesRef}>
            <bufferGeometry />
            <pointsMaterial size={0.05} color={particleColor} />
          </points>
        </Canvas>
      </div>

      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Connect with CoreVisuals
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Ready to elevate your SaaS experience? Contact us today to learn more.
        </p>

        <div className="flex items-center justify-center space-x-4">
          <Button variant="primary" onClick={() => window.location.href = 'mailto:info@corevisuals.com'}>
            Email Us
          </Button>
        </div>
      </div>
    </Bounded>
  );
};

export default Contact;