"use client";

import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Group } from 'three';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useRotatingAnimation } from '../../hooks/use3DAnimation';

const SPINS_ON_CHANGE = 4;

const MODELS = [
    {
        name: "Icosahedron",
        color: "#6366f1",
        geometry: "icosahedron",
        description: "A polyhedron with 20 faces"
    },
    {
        name: "Octahedron",
        color: "#8b5cf6",
        geometry: "octahedron",
        description: "A polyhedron with 8 faces"
    },
    {
        name: "Dodecahedron",
        color: "#06b6d4",
        geometry: "dodecahedron",
        description: "A polyhedron with 12 faces"
    },
    {
        name: "Tetrahedron",
        color: "#10b981",
        geometry: "tetrahedron",
        description: "A polyhedron with 4 faces"
    },
];

function GeometryModel({ geometry, color }: { geometry: string; color: string }) {
    const meshRef = useRef(null);
    useRotatingAnimation(meshRef, 0.2);

    const renderGeometry = () => {
        switch (geometry) {
            case 'octahedron':
                return <octahedronGeometry args={[2]} />;
            case 'dodecahedron':
                return <dodecahedronGeometry args={[1.5]} />;
            case 'tetrahedron':
                return <tetrahedronGeometry args={[2]} />;
            default:
                return <icosahedronGeometry args={[2, 1]} />;
        }
    };

    return (
        <mesh ref={meshRef}>
            {renderGeometry()}
            <meshStandardMaterial
                color={color}
                metalness={0.8}
                roughness={0.2}
                emissive={color}
                emissiveIntensity={0.1}
            />
        </mesh>
    );
}

interface CarouselProps {
    heading?: string;
    description?: string;
}

const Carousel = ({
    heading = "3D Model Showcase",
    description = "Interactive 3D geometries"
}: CarouselProps) => {
    const [currentModelIndex, setCurrentModelIndex] = useState(0);
    const modelRef = useRef<Group>(null);

    function changeModel(direction: 'next' | 'prev') {
        if (!modelRef.current) return;

        const nextIndex = direction === 'next'
            ? (currentModelIndex + 1) % MODELS.length
            : (currentModelIndex - 1 + MODELS.length) % MODELS.length;

        const tl = gsap.timeline();

        tl.to(
            modelRef.current.rotation,
            {
                y: direction === 'next'
                    ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
                    : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
                ease: "power2.inOut",
                duration: 1,
            },
            0,
        )
            .to(
                ".carousel-background",
                {
                    backgroundColor: MODELS[nextIndex].color,
                    ease: "power2.inOut",
                    duration: 1,
                },
                0,
            )
            .to(".model-info", { duration: 0.2, y: -10, opacity: 0 }, 0)
            .to({}, { onStart: () => setCurrentModelIndex(nextIndex) }, 0.5)
            .to(".model-info", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
    }

    return (
        <section
            data-slice-type="carousel"
            data-slice-variation="default"
            className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-slate-900 py-12 text-white"
        >
            <div
                className="carousel-background pointer-events-none absolute inset-0 opacity-20 transition-colors duration-1000"
                style={{ backgroundColor: MODELS[currentModelIndex].color }}
            />

            <h2 className="relative text-center text-5xl font-bold mb-8">
                {heading}
            </h2>

            <div className="grid grid-cols-[auto,1fr,auto] items-center gap-8 px-8">
                {/* Left Arrow */}
                <ArrowButton
                    onClick={() => changeModel('prev')}
                    direction="left"
                    label="Previous Model"
                />

                {/* 3D Model */}
                <div className="aspect-square h-[60vmin] min-h-80 max-h-96">
                    <Canvas>
                        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
                        <Center position={[0, 0, 0]}>
                            <group ref={modelRef}>
                                <GeometryModel
                                    geometry={MODELS[currentModelIndex].geometry}
                                    color={MODELS[currentModelIndex].color}
                                />
                            </group>
                        </Center>
                        <Environment preset="night" />
                        <ambientLight intensity={0.4} />
                        <directionalLight intensity={0.8} position={[0, 1, 1]} />
                        <OrbitControls
                            enablePan={false}
                            enableZoom={false}
                            autoRotate={false}
                        />
                    </Canvas>
                </div>

                {/* Right Arrow */}
                <ArrowButton
                    onClick={() => changeModel('next')}
                    direction="right"
                    label="Next Model"
                />
            </div>

            <div className="model-info relative mx-auto text-center">
                <div className="text-4xl font-medium mb-2">
                    <p>{MODELS[currentModelIndex].name}</p>
                </div>
                <div className="text-xl font-normal opacity-90">
                    <p>{MODELS[currentModelIndex].description}</p>
                </div>
                <div className="mt-4 text-sm opacity-75">
                    <p>{description}</p>
                </div>
            </div>
        </section>
    );
};

interface ArrowButtonProps {
    direction: 'right' | 'left';
    label: string;
    onClick: () => void;
}

function ArrowButton({ label, onClick, direction }: ArrowButtonProps) {
    const Icon = direction === 'left' ? ChevronLeft : ChevronRight;

    return (
        <button
            onClick={onClick}
            className="size-16 rounded-full border-2 border-white bg-white/10 p-4 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 hover:bg-white/20 transition-all duration-200 lg:size-20"
        >
            <Icon className="w-full h-full" />
            <span className="sr-only">{label}</span>
        </button>
    );
}

export default Carousel;