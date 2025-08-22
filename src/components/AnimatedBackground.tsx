"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
    const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const newParticles = [...Array(15)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Gradient orbs */}
            <motion.div
                className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
                animate={{ x: [0, 100, -50, 0], y: [0, -50, 100, 0], scale: [1, 1.2, 0.8, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl"
                animate={{ x: [0, -100, 50, 0], y: [0, 50, -100, 0], scale: [1, 0.8, 1.3, 1] }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
                className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"
                animate={{ x: [0, 150, -75, 0], y: [0, -100, 150, 0], scale: [1, 1.1, 0.9, 1] }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            />
            {/* Floating particles */}
            {isClient &&
                particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                        style={{ left: p.left, top: p.top }}
                        animate={{
                            y: [-20, 20, -20],
                            x: [-15, 15, -15],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 8 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            {/* Geometric shapes */}
            <motion.div
                className="absolute top-1/4 right-1/4 w-4 h-4 border-2 border-blue-400/40 rotate-45"
                animate={{ rotate: [45, 405, 45], scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/3 left-1/3 w-6 h-6 border-2 border-purple-400/40 rounded-full"
                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.7, 0.3], rotate: [0, 180, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
            <motion.div
                className="absolute top-3/4 right-1/6 w-3 h-12 bg-gradient-to-b from-green-400/30 to-transparent rounded-full"
                animate={{ scaleY: [1, 1.5, 0.5, 1], opacity: [0.3, 0.6, 0.3], rotate: [0, 45, -45, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            {/* Pulsing rings */}
            <motion.div
                className="absolute top-1/6 left-1/2 w-32 h-32 border border-blue-400/20 rounded-full"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/3 w-24 h-24 border border-purple-400/20 rounded-full"
                animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeOut", delay: 2 }}
            />
        </div>
    );
}
