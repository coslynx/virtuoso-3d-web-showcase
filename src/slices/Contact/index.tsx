"use client";

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../../components/ui/Button';
import { Bounded } from '../../components/ui/Bounded';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

function FloatingParticles() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
            groupRef.current.children.forEach((child, index: number) => {
                if (child instanceof THREE.Mesh) {
                    child.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5;
                    child.rotation.x = state.clock.elapsedTime * (0.5 + index * 0.1);
                }
            });
        }
    });

    return (
        <group ref={groupRef}>
            {Array.from({ length: 8 }, (_, i) => (
                <mesh
                    key={i}
                    position={[
                        Math.cos((i / 8) * Math.PI * 2) * 3,
                        0,
                        Math.sin((i / 8) * Math.PI * 2) * 3,
                    ]}
                >
                    <sphereGeometry args={[0.1, 8, 8]} />
                    <meshStandardMaterial
                        color="#6366f1"
                        emissive="#6366f1"
                        emissiveIntensity={0.2}
                    />
                </mesh>
            ))}
        </group>
    );
}

interface ContactProps {
    heading?: string;
    description?: string;
    buttonText?: string;
    email?: string;
}

const Contact = ({
    heading = "Let's Create Together",
    description = "Ready to build something amazing? Get in touch and let's bring your 3D vision to life.",
    buttonText = "Start Project",
    email = "hello@example.com"
}: ContactProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        gsap.fromTo(
            ".contact-content",
            {
                y: 50,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                },
            }
        );

    }, []);

    return (
        <Bounded
            data-slice-type="contact"
            data-slice-variation="default"
            className="contact relative min-h-screen bg-gradient-to-b from-slate-900 to-slate-950"
        >
            {/* 3D Background */}
            <div className="absolute inset-0 opacity-30">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={0.5} color="#6366f1" />
                    <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
                    <FloatingParticles />
                    <Environment preset="night" />
                </Canvas>
            </div>

            {/* Content */}
            <div
                ref={sectionRef}
                className="contact-content relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center"
            >
                <h2 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent lg:text-7xl">
                    {heading}
                </h2>

                <p className="text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
                    {description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        href={`mailto:${email}`}
                        variant="primary"
                        className="text-lg px-10 py-5"
                    >
                        {buttonText}
                    </Button>

                    <Button
                        href={`mailto:${email}`}
                        variant="secondary"
                        className="text-lg px-10 py-5"
                    >
                        {email}
                    </Button>
                </div>

                <div className="mt-12 text-sm text-slate-400">
                    <p>Scroll up to explore more</p>
                </div>
            </div>
        </Bounded>
    );
};

export default Contact;