"use client";
import { signInUser } from "@/lib/action";
import { signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AnimatePresence, motion } from "framer-motion";

import samuraiImage from "@/assets/cute-samurai.png";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

type FormData = z.infer<typeof signInSchema>;

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([]);
    const router = useRouter();

    const { register, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(signInSchema),
    });

    useEffect(() => {
        const particlePositions = Array.from({ length: 6 }, () => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
        }));
        setParticles(particlePositions);
    }, []);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError(null);

        const result = await signInUser(data);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        } else {
            setLoggedIn(true);
        }
    };

    return (
        <div className="relative overflow-hidden">
            {/* Background animation elements */}
            <motion.div
                className="absolute inset-0 opacity-5"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-cyan-500 rounded-full blur-3xl"></div>
            </motion.div>

            {/* Floating particles */}
            {particles.map((particle, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
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
                    <div className="w-full flex flex-col gap-5 items-center justify-start p-5 ">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Link href="/">
                                <span className="opacity-80 text-sm flex items-center gap-2 hover:opacity-100 transition-opacity duration-200">
                                    <FaArrowLeftLong className="transition-transform duration-200 hover:-translate-x-1" />{" "}
                                    Back to Home
                                </span>
                            </Link>
                        </motion.div>
                        {!loggedIn ? (
                            <>
                                <motion.div
                                    className="flex items-center justify-center gap-1 text-3xl font-bold"
                                    initial={{ y: -30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse">
                                        Welcome
                                    </span>{" "}
                                    to the Guild
                                </motion.div>
                                <motion.p
                                    className="opacity-80"
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    Continue your quest to level up your career
                                </motion.p>
                                <motion.form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex flex-col gap-4 w-full max-w-md"
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                >
                                    <motion.label
                                        className="flex flex-col items-start w-full justify-center gap-2"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.7 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <motion.div
                                            className="flex items-center gap-2 mt-2"
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <MdOutlineMail className="text-blue-500 text-xl" />
                                            Email Address
                                        </motion.div>
                                        <motion.input
                                            type="email"
                                            placeholder="Email"
                                            {...register("email")}
                                            className="pt-2 pb-2 pl-4 pr-4  w-full rounded-sm text-sm border-2 border-blue-500 outline-0 focus:outline-2 outline-blue-500 transition-all duration-200 hover:shadow-md focus:shadow-lg"
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    </motion.label>
                                    <motion.label
                                        htmlFor="password"
                                        className="flex flex-col items-start w-full justify-center gap-2"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.75 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <motion.div
                                            className="flex items-center gap-2 mt-2"
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <CiLock className="text-blue-500 text-xl" />
                                            Password
                                        </motion.div>
                                        <motion.input
                                            type="password"
                                            placeholder="Password"
                                            {...register("password")}
                                            className="pt-2 pb-2 pl-4 pr-4  w-full rounded-sm text-sm border-2 border-blue-500 outline-0 focus:outline-2 outline-blue-500 transition-all duration-200 hover:shadow-md focus:shadow-lg"
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    </motion.label>
                                    <AnimatePresence>
                                        {error && (
                                            <motion.p
                                                className="w-full rounded-lg  text-red-600 text-sm mt-0"
                                                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                                            >
                                                {error}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                    <motion.p
                                        className="text-sm text-blue-500 text-right w-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.8 }}
                                    >
                                        <Link
                                            href="/forgot-password"
                                            className="hover:text-blue-400 transition-colors duration-200"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </motion.p>
                                    <motion.button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-blue-500 pt-2 pb-2 pr-3 pl-3 rounded-lg text-white font-bold hover:bg-blue-600 transition-colors duration-200 mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.85 }}
                                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <motion.div
                                            animate={loading ? { rotate: 360 } : { rotate: 0 }}
                                            transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
                                        >
                                            <AiOutlineThunderbolt className="text-xl" />
                                        </motion.div>
                                        {loading ? "Entering..." : "Enter Game"}
                                    </motion.button>
                                </motion.form>
                                <motion.div
                                    className="flex items-center gap-2 mt-2"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.9 }}
                                >
                                    Don't have an account yet?{" "}
                                    <span className="text-blue-500 hover:text-blue-400 transition-colors duration-200">
                                        <Link href="/signup">Create Account</Link>
                                    </span>
                                </motion.div>
                            </>
                        ) : (
                            <motion.div
                                className="w-full max-w-md flex flex-col items-center justify-center gap-6 p-8 rounded-2xl backdrop-blur-xl relative overflow-hidden"
                                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
                            >
                                {/* Ambient glow */}
                                <motion.div
                                    className="absolute -inset-1 blur-xl"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1.2 }}
                                />
                                {/* Animated confetti sparks */}
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
                                <motion.div
                                    className="flex items-center gap-3 text-3xl font-bold relative z-10"
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <motion.span
                                        animate={{ rotate: [0, 15, -15, 0] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                        className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                                    >
                                        <AiOutlineThunderbolt className="text-4xl" />
                                    </motion.span>
                                    <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                                        Logged In!
                                    </span>
                                </motion.div>
                                <motion.p
                                    className="text-sm text-blue-200/80 text-center leading-relaxed relative z-10"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.35 }}
                                >
                                    Your journey continues. Preparing your dashboard...
                                </motion.p>
                                <motion.div
                                    className="flex flex-col gap-3 w-full relative z-10"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                                >
                                    <motion.button
                                        onClick={() => router.push("/dashboard")}
                                        className="w-full bg-blue-500/90 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 shadow-[0_8px_25px_-5px_rgba(59,130,246,0.5)] transition-colors duration-200 cursor-pointer"
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        Enter Dashboard
                                        <FaArrowLeftLong className="rotate-180" />
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}
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
                        className="absolute top-20 left-10 w-16 h-16 border-2 border-blue-400/30 rounded-full"
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute bottom-32 right-16 w-12 h-12 border-2 border-purple-400/30 rounded-lg"
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
                        className="absolute top-16 right-1/4 text-blue-400/40 text-sm font-semibold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: [0.4, 0.8, 0.4], y: [-5, 5, -5] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    >
                        Level Up
                    </motion.div>
                    <motion.div
                        className="absolute bottom-24 left-16 text-purple-400/40 text-sm font-semibold"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: [0.4, 0.8, 0.4], y: [5, -5, 5] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                    >
                        Your Career
                    </motion.div>

                    {/* Glowing orbs */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-6 h-6 bg-blue-500/30 rounded-full blur-sm"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.7, 0.3],
                            x: [0, 20, 0],
                            y: [0, -15, 0],
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-purple-500/30 rounded-full blur-sm"
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
                            className="absolute inset-0 -m-8 border-2 border-blue-400/20 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-0 -m-12 border border-purple-400/15 rounded-full"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        />

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            whileHover={{
                                scale: 1.05,
                                filter: "drop-shadow(0 0 30px rgba(59, 130, 246, 0.4))",
                                rotate: [0, 1, -1, 0],
                            }}
                            className="transition-all duration-300 filter drop-shadow-2xl relative z-10"
                        >
                            <Image src={samuraiImage} alt="Samurai" className="w-7/10 rounded-lg ml-20" />

                            {/* Sparkle effects around the image */}
                            {[...Array(4)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 bg-yellow-400 rounded-full"
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
                            className="text-sm text-blue-400/60 font-medium italic"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            "Every master was once a beginner"
                        </motion.p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
