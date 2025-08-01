"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { motion, AnimatePresence } from "framer-motion";

import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { AiOutlineThunderbolt } from "react-icons/ai";
import samuraiImage from '@/assets/cute-samurai.png'

const formSchema = z.object({
  email: z.string().email("Invalid Email"),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{left: string, top: string}>>([]);

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    // Generate particle positions on client side to avoid hydration mismatch
    const particlePositions = Array.from({ length: 6 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticles(particlePositions);
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    const supabase = createClientComponentClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    } else {
      setLoading(false);
      router.push("/dashboard");
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
          <Link href="/"><span className="opacity-80 text-sm flex items-center gap-2 hover:opacity-100 transition-opacity duration-200"><FaArrowLeftLong className="transition-transform duration-200 hover:-translate-x-1" /> Back to Home</span></Link>
        </motion.div>
        <motion.div 
          className="flex items-center justify-center gap-1 text-3xl font-bold"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
        <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse">Welcome</span> to the Guild
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <Link href="/forgot-password" className="hover:text-blue-400 transition-colors duration-200">Forgot your password?</Link>
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
          Don't have an account yet? <span className="text-blue-500 hover:text-blue-400 transition-colors duration-200"><Link href="/signup">Create Account</Link></span>
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
            y: [0, -15, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-purple-500/30 rounded-full blur-sm"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -15, 0],
            y: [0, 10, 0]
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
            transition={{ duration: 0.8}}
            whileHover={{ 
              scale: 1.05, 
              filter: "drop-shadow(0 0 30px rgba(59, 130, 246, 0.4))",
              rotate: [0, 1, -1, 0]
            }}
            className="transition-all duration-300 filter drop-shadow-2xl relative z-10"
          >
            <Image src={samuraiImage} alt="Samurai" className="w-7/10 rounded-lg ml-20"/>
            
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
