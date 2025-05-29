"use client";

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mesh } from 'three';

gsap.registerPlugin(ScrollTrigger);

function MorphingGeometry() {
    const meshRef = useRef<Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    useEffect(() => {
        if (!meshRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".scroll-experience",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
        });

        tl.to(meshRef.current.scale, {
            x: 2,
            y: 2,
            z: 2,
            duration: 1,
        })
            .to(meshRef.current.material, {
                metalness: 0.9,
                roughness: 0.1,
                duration: 1,
            }, 0)
            .to(meshRef.current.rotation, {
                x: Math.PI * 2,
                duration: 1,
            }, 0);

    }, []);

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[1, 0.3, 100, 16]} />
            <meshStandardMaterial
                color="#f59e0b"
                metalness={0.5}
                roughness={0.5}
                emissive="#f59e0b"
                emissiveIntensity={0.1}
            />
        </mesh>
    );
}

interface ScrollExperienceProps {
    heading?: string;
    description?: string;
}

const ScrollExperience = ({
    heading = "Scroll to Transform",
    description = "Watch as the geometry morphs and scales with your scroll"
}: ScrollExperienceProps) => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom center",
                scrub: 1,
            },
        });

        tl.fromTo(
            ".scroll-text",
            {
                y: 100,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
            }
        )
            .fromTo(
                section,
                {
                    backgroundColor: "#1e293b",
                },
                {
                    backgroundColor: "#0f172a",
                    duration: 1,
                },
                0
            );

    }, []);

    return (
        <section
            ref={sectionRef}
            data-slice-type="scroll-experience"
            data-slice-variation="default"
            className="scroll-experience relative h-[200vh] bg-slate-800"
        >
            {/* Sticky 3D Scene */}
            <div className="sticky top-0 h-screen w-full">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[10, 10, 5]} intensity={0.8} />
                    <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />
                    <MorphingGeometry />
                    <Environment preset="night" />
                </Canvas>

                {/* Overlay Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="scroll-text text-center text-white max-w-2xl px-8">
                        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            {heading}
                        </h2>
                        <p className="text-xl opacity-80">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScrollExperience;