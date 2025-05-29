import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

type AnimationOptions = {
    duration?: number;
    ease?: string;
    delay?: number;
    repeat?: number;
    yoyo?: boolean;
};

export function use3DAnimation(
    object: React.MutableRefObject<THREE.Object3D | null>,
    property: 'position' | 'rotation' | 'scale',
    target: { x?: number; y?: number; z?: number },
    options: AnimationOptions = {}
) {
    const animationRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        if (!object.current) return;

        const {
            duration = 2,
            ease = 'power2.inOut',
            delay = 0,
            repeat = 0,
            yoyo = false
        } = options;

        if (animationRef.current) {
            animationRef.current.kill();
        }

        animationRef.current = gsap.to(object.current[property], {
            x: target.x !== undefined ? target.x : object.current[property].x,
            y: target.y !== undefined ? target.y : object.current[property].y,
            z: target.z !== undefined ? target.z : object.current[property].z,
            duration,
            ease,
            delay,
            repeat,
            yoyo,
        });

        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [object, property, target, options]);

    return {
        pause: () => animationRef.current?.pause(),
        resume: () => animationRef.current?.resume(),
        restart: () => animationRef.current?.restart(),
        reverse: () => animationRef.current?.reverse(),
    };
}

export function useFloatingAnimation(
    object: React.MutableRefObject<THREE.Object3D | null>,
    intensity: number = 0.1
) {
    useEffect(() => {
        if (!object.current) return;

        const originalY = object.current.position.y;

        const timeline = gsap.timeline({ repeat: -1, yoyo: true });

        timeline.to(object.current.position, {
            y: originalY + intensity,
            duration: 1.5,
            ease: 'sine.inOut'
        });

        timeline.to(object.current.position, {
            y: originalY - intensity,
            duration: 1.5,
            ease: 'sine.inOut'
        });

        return () => {
            timeline.kill();
        };
    }, [object, intensity]);
}

export function useRotatingAnimation(
    object: React.MutableRefObject<THREE.Object3D | null>,
    speed: number = 0.5,
    axis: 'x' | 'y' | 'z' = 'y'
) {
    useEffect(() => {
        if (!object.current) return;

        const timeline = gsap.timeline({ repeat: -1 });

        timeline.to(object.current.rotation, {
            [axis]: Math.PI * 2,
            duration: 1 / speed,
            ease: 'none',
        });

        return () => {
            timeline.kill();
        };
    }, [object, speed, axis]);
}