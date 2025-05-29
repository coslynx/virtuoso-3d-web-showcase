"use client";

import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Bounded } from '../../components/ui/Bounded';
import { Button } from '../../components/ui/Button';
import { TextSplitter } from '../../components/ui/TextSplitter';
import { setReady } from '../../store/useStore';
import { useRotatingAnimation } from '../../hooks/use3DAnimation';

function FloatingGeometry() {
    const meshRef = useRef(null);
    useRotatingAnimation(meshRef, 0.3);

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[2.5, 1]} />
            <meshStandardMaterial
                color="#6366f1"
                metalness={0.8}
                roughness={0.2}
                emissive="#1e1b4b"
                emissiveIntensity={0.1}
            />
        </mesh>
    );
}

interface HeroProps {
    heading?: string;
    subheading?: string;
    body?: string;
    buttonText?: string;
    buttonLink?: string;
}

const Hero = ({
    heading = "Immersive 3D Web",
    subheading = "Next Generation Experiences",
    body = "Create stunning interactive 3D experiences using React, Three.js, and GSAP",
    buttonText = "Explore",
    buttonLink = "#carousel"
}: HeroProps) => {
    useEffect(() => {
        const timer = setTimeout(() => setReady(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Bounded
            data-slice-type="hero"
            data-slice-variation="default"
            className="hero min-h-screen bg-gradient-to-b from-slate-900 to-slate-800"
        >
            {/* 3D Scene */}
            <div className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[10, 10, 5]} intensity={0.8} />
                    <FloatingGeometry />
                    <OrbitControls
                        enablePan={false}
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                    <Environment preset="night" />
                </Canvas>
            </div>

            <div className="grid">
                {/* Main Hero Section */}
                <div className="grid h-screen place-items-center">
                    <div className="grid auto-rows-min place-items-center text-center">
                        <h1 className="hero-header text-6xl font-black uppercase leading-[.8] text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text md:text-[8rem] lg:text-[12rem]">
                            <TextSplitter
                                text={heading}
                                wordDisplayStyle="block"
                                className="hero-header-word"
                            />
                        </h1>
                        <div className="hero-subheading mt-8 text-4xl font-semibold text-slate-200 lg:text-5xl">
                            {subheading}
                        </div>
                        <div className="hero-body mt-4 text-xl font-normal text-slate-300 max-w-2xl">
                            {body}
                        </div>
                        <Button
                            href={buttonLink}
                            className="hero-button mt-8"
                        >
                            {buttonText}
                        </Button>
                    </div>
                </div>

                {/* Second Section */}
                <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
                    <div className="h-[400px] bg-slate-800/50 rounded-xl overflow-hidden md:hidden">
                        <Canvas>
                            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
                            <ambientLight intensity={0.4} />
                            <directionalLight position={[10, 10, 5]} intensity={0.6} />
                            <FloatingGeometry />
                            <OrbitControls enablePan={false} enableZoom={false} />
                            <Environment preset="night" />
                        </Canvas>
                    </div>
                    <div>
                        <h2 className="text-side-heading text-balance text-5xl font-black uppercase text-slate-100 lg:text-7xl">
                            <TextSplitter text="Revolutionary Design" />
                        </h2>
                        <div className="text-side-body mt-4 max-w-xl text-balance text-lg font-normal text-slate-300">
                            Experience the future of web design with immersive 3D environments,
                            smooth animations, and interactive elements that captivate your audience.
                        </div>
                    </div>
                </div>
            </div>
        </Bounded>
    );
};

export default Hero;