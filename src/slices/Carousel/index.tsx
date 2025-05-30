{
  "dependencies": {
    "@eslint/js": "^9.13.0",
    "@react-three/drei": "^9.114.0",
    "@react-three/fiber": "^8.15.19",
    "@types/node": "^20.11.24",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.5.0",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "clsx": "^2.1.1",
    "eslint": "^9.13.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "framer-motion": "^12.6.3",
    "globals": "^15.11.0",
    "gsap": "^3.12.5",
    "lucide-react": "^0.344.0",
    "postcss": "^8.4.35",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-responsive": "^9.0.2",
    "tailwind-merge": "^2.5.4",
    "tailwindcss": "^3.4.1",
    "three": "^0.159.0",
    "typescript": "^5.6.3",
    "vite": "^5.4.10"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "prettier": "^3.2.5"
  }
}
```

```typescript
// src/slices/Carousel/index.tsx
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center } from '@react-three/drei';
import { Bounded } from '../../components/ui/Bounded';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

interface ProductModelProps {
  modelPath: string;
  name: string;
  description: string;
}

const ProductModel: React.FC<ProductModelProps> = ({ modelPath, name, description }) => {
  const gltf = useGLTF(modelPath);
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.005; // subtle rotation animation
    }
  });

  return (
    <group>
      <Center>
      <mesh ref={mesh} scale={0.75} >
        <primitive object={gltf.scene} dispose={null} />
      </mesh>
      </Center>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </group>
  );
};

const Carousel: React.FC = () => {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);

  const productModels = [
    {
      modelPath: '/models/product1.glb',
      name: 'Advanced Analytics Dashboard',
      description: 'Visualize complex data with ease and gain actionable insights.'
    },
    {
      modelPath: '/models/product2.glb',
      name: 'Interactive Design Studio',
      description: 'Unleash your creativity with our intuitive 3D design tools.'
    },
    {
      modelPath: '/models/product3.glb',
      name: 'Cloud-Based Collaboration Platform',
      description: 'Seamlessly collaborate with your team in a secure, cloud-based environment.'
    },
  ];

  const handleNextModel = () => {
    setCurrentModelIndex((prevIndex) => (prevIndex + 1) % productModels.length);
  };

  const handlePrevModel = () => {
    setCurrentModelIndex((prevIndex) => (prevIndex - 1 + productModels.length) % productModels.length);
  };

  const { modelPath, name, description } = productModels[currentModelIndex];

  return (
    <Bounded as="section" className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Explore Our Innovative Products</h2>
        <p className="text-gray-600">Immerse yourself in interactive 3D models and discover key features.</p>
      </div>
      <div className="relative">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Suspense fallback={<>Loading...</>}>
            <ProductModel modelPath={modelPath} name={name} description={description}/>
            <Environment preset="city" blur={0.5} />
          </Suspense>
          <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} enablePan={false} />
        </Canvas>

        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <button onClick={handlePrevModel} className="bg-gray-200 hover:bg-gray-300 rounded-full p-2">
            &lt;
          </button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <button onClick={handleNextModel} className="bg-gray-200 hover:bg-gray-300 rounded-full p-2">
            &gt;
          </button>
        </div>
      </div>
    </Bounded>
  );
};

export default Carousel;