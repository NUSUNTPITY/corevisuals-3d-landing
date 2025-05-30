// src/hooks/use3DAnimation.ts
import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { Object3D } from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Ensure ScrollTrigger is imported
import { useFrame } from '@react-three/fiber';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AnimationParams {
    object: Object3D | null;
    property: string;
    from: number | number[];
    to: number | number[];
    duration?: number;
    ease?: string;
    delay?: number;
    scrollTrigger?: ScrollTrigger.StaticProps;
}

interface FloatingAnimationParams {
    object: Object3D | null;
    amplitude?: number;
    frequency?: number;
}

interface RotationAnimationParams {
    object: Object3D | null;
    rotationSpeed?: number;
}

const use3DAnimation = () => {
    // --- Defaults customized for CoreVisuals ---
    const defaultDuration = 0.75;  // Project-specific default duration
    const defaultEase = "power2.inOut"; // Project-specific default easing
    const defaultAmplitude = 0.1;    // Project-specific amplitude
    const defaultFrequency = 1.0;    // Project-specific frequency
    const defaultRotationSpeed = 0.01; // Project-specific Rotation Speed

    // --- Utility Functions ---
    const animate = useCallback(({ object, property, from, to, duration = defaultDuration, ease = defaultEase, delay = 0, scrollTrigger }: AnimationParams) => {
        if (!object) return;

        const animationVars: gsap.TweenVars = {
            [property]: to,
            duration: duration,
            ease: ease,
            delay: delay,
        };

        if (scrollTrigger) {
            animationVars.scrollTrigger = scrollTrigger;
        }

        gsap.to(object, animationVars);

    }, [defaultDuration, defaultEase]);


    const useFloatingAnimation = useCallback(({ object, amplitude = defaultAmplitude, frequency = defaultFrequency }: FloatingAnimationParams) => {
        const yOffset = useRef(Math.random() * 10); // Randomize initial y offset for each object.

        useFrame((state, delta) => {
            if (!object) return;
            object.position.y = amplitude * Math.sin(state.clock.elapsedTime * frequency + yOffset.current);
        });
    }, [defaultAmplitude, defaultFrequency]);

    const useRotationAnimation = useCallback(({ object, rotationSpeed = defaultRotationSpeed }: RotationAnimationParams) => {
        useFrame(() => {
            if (!object) return;
            object.rotation.x += rotationSpeed;
            object.rotation.y += rotationSpeed * 0.75; //Slightly different rotation on Y
        });
    }, [defaultRotationSpeed]);

    // useEffect to kill all ScrollTriggers on unmount
    useEffect(() => {
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return { animate, useFloatingAnimation, useRotationAnimation };
};

export default use3DAnimation;