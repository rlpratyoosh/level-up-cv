"use client";
import samuraiImage from "@/assets/cute-samurai.png";
import { verifyEmail } from "@/lib/action";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";

function VerifyContent() {
    const params = useSearchParams();
    const router = useRouter();
    const token = params.get("token");
    const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
    const [message, setMessage] = useState("Verifying your email address...");
    const [error, setError] = useState<string | null>(null);
    const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([]);

    useEffect(() => {
        // Generate particle positions on client side
        const particlePositions = Array.from({ length: 6 }, () => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
        }));
        setParticles(particlePositions);

        const verifyToken = async () => {
            if (!token) {
                setStatus("error");
                setError("No verification token provided");
                return;
            }

            try {
                await verifyEmail(token);
                setStatus("success");
                setMessage("Your email has been verified successfully!");
            } catch (err) {
                setStatus("error");
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred during verification");
                }
            }
        };

        verifyToken();
    }, [token]);

    return (
        <div className="relative overflow-hidden">
            {/* Background animation elements */}
            <motion.div
                className="absolute inset-0 opacity-5"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
                <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-500 rounded-full blur-3xl"></div>
            </motion.div>

            {/* Floating particles */}
            {particles.map((particle, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20"
                    style={{
                        left: particle.left,
                        top: particle.top,
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 3 + (i % 3),
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                    }}
                />
            ))}

            <motion.div
                className="flex items-center justify-center relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="w-full flex items-center justify-center min-h-screen"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="w-full flex flex-col gap-5 items-center justify-start p-5">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Link href="/">
                                <span className="opacity-80 text-sm flex items-center gap-2 hover:opacity-100 transition-opacity duration-200">
                                    <FaArrowLeft className="transition-transform duration-200 hover:-translate-x-1" />
                                    Back to Home
                                </span>
                            </Link>
                        </motion.div>

                        <motion.div
                            className="w-full max-w-md flex flex-col items-center justify-center gap-6 p-8 rounded-2xl backdrop-blur-xl relative overflow-hidden"
                            initial={{ scale: 0.9, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
                        >
                            <motion.div
                                className="absolute -inset-1 blur-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.2 }}
                            />

                            {/* Status Icon */}
                            <motion.div
                                className="flex justify-center items-center w-20 h-20 rounded-full bg-opacity-20 backdrop-blur-sm"
                                style={{
                                    backgroundColor:
                                        status === "success"
                                            ? "rgba(34, 197, 94, 0.2)"
                                            : status === "error"
                                            ? "rgba(239, 68, 68, 0.2)"
                                            : "rgba(59, 130, 246, 0.2)",
                                }}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                {status === "verifying" && (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    >
                                        <AiOutlineLoading3Quarters className="text-4xl text-blue-500" />
                                    </motion.div>
                                )}

                                {status === "success" && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                    >
                                        <FaCheckCircle className="text-4xl text-green-500" />
                                    </motion.div>
                                )}

                                {status === "error" && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                    >
                                        <MdOutlineError className="text-4xl text-red-500" />
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Status Message */}
                            <motion.h2
                                className="text-xl font-bold text-center"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                {status === "success"
                                    ? "Email Verified!"
                                    : status === "error"
                                    ? "Verification Failed"
                                    : "Verifying Email"}
                            </motion.h2>

                            <motion.p
                                className="text-center opacity-80"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                            >
                                {error || message}
                            </motion.p>

                            {/* Action Button */}
                            {(status === "success" || status === "error") && (
                                <motion.button
                                    onClick={() => router.push(status === "success" ? "/login" : "/")}
                                    className={`px-6 py-2 rounded-lg font-medium mt-4 transition-all duration-300 ${
                                        status === "success"
                                            ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                                    }`}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {status === "success" ? "Proceed to Login" : "Return Home"}
                                </motion.button>
                            )}

                            {/* Animated particle effects inside the card */}
                            {[...Array(10)].map((_, i) => (
                                <motion.span
                                    key={i}
                                    className="absolute w-1.5 h-1.5 rounded-full"
                                    style={{
                                        background:
                                            i % 2 === 0
                                                ? "rgb(59 130 246)"
                                                : i % 3 === 0
                                                ? "rgb(168 85 247)"
                                                : "rgb(34 211 238)",
                                        top: `${15 + Math.random() * 70}%`,
                                        left: `${10 + Math.random() * 80}%`,
                                    }}
                                    initial={{ scale: 0, opacity: 0, y: 0 }}
                                    animate={{
                                        scale: [0, 1, 0.4, 1],
                                        opacity: [0, 1, 1, 0],
                                        y: [-10, -30 - i * 2, -40 - i * 4],
                                    }}
                                    transition={{
                                        duration: 2.5 + i * 0.15,
                                        repeat: Infinity,
                                        delay: i * 0.12,
                                        ease: "easeOut",
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
                <motion.div
                    className="min-h-screen w-full flex items-center justify-center relative"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {/* Decorative elements around the image */}
                    <motion.div
                        className="absolute top-20 left-10 w-16 h-16 border-2 border-cyan-400/30 rounded-full"
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute bottom-32 right-16 w-12 h-12 border-2 border-blue-400/30 rounded-lg"
                        animate={{ rotate: -360, y: [-10, 10, -10] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-1/3 right-8 w-8 h-8 bg-cyan-400/20 rounded-full"
                        animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Floating text elements */}
                    <motion.div
                        className="absolute top-16 right-1/4 text-cyan-400/40 text-sm font-semibold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: [0.4, 0.8, 0.4], y: [-5, 5, -5] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    >
                        Ready for Adventure
                    </motion.div>
                    <motion.div
                        className="absolute bottom-24 left-16 text-blue-400/40 text-sm font-semibold"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: [0.4, 0.8, 0.4], y: [5, -5, 5] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                    >
                        Almost There
                    </motion.div>

                    {/* Glowing orbs */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-6 h-6 bg-cyan-500/30 rounded-full blur-sm"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.7, 0.3],
                            x: [0, 20, 0],
                            y: [0, -15, 0],
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-blue-500/30 rounded-full blur-sm"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.6, 0.3],
                            x: [0, -15, 0],
                            y: [0, 10, 0],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />

                    {/* Main image container with enhanced styling */}
                    <div className="relative">
                        {/* Animated background ring */}
                        <motion.div
                            className="absolute inset-0 -m-8 border-2 border-cyan-400/20 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-0 -m-12 border border-blue-400/15 rounded-full"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        />

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            whileHover={{
                                scale: 1.05,
                                filter: "drop-shadow(0 0 30px rgba(34, 211, 238, 0.4))",
                                rotate: [0, 1, -1, 0],
                            }}
                            className="transition-all duration-300 filter drop-shadow-2xl relative z-10"
                        >
                            <Image src={samuraiImage} alt="Samurai" className="w-7/10 rounded-lg ml-20" />

                            {/* Sparkle effects around the image */}
                            {[...Array(4)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                                    style={{
                                        top: `${20 + i * 20}%`,
                                        left: `${15 + i * 20}%`,
                                    }}
                                    animate={{
                                        scale: [0, 1, 0],
                                        opacity: [0, 1, 0],
                                        rotate: [0, 180, 360],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.5,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>

                    {/* Inspirational quote */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        <motion.p
                            className="text-sm text-cyan-400/60 font-medium italic"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            "The path becomes clear when you take the first step"
                        </motion.p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    >
                        <AiOutlineLoading3Quarters className="text-4xl text-blue-500" />
                    </motion.div>
                </div>
            }
        >
            <VerifyContent />
        </Suspense>
    );
}
