"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineMail, MdCheckCircle } from "react-icons/md";
import { AiOutlineThunderbolt } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import samuraiImage from '@/assets/cute-samurai.png';

export default function ConfirmEmailPage() {
  const [particles, setParticles] = useState<Array<{left: string, top: string}>>([]);

  useEffect(() => {
    // Generate particle positions on client side to avoid hydration mismatch
    const particlePositions = Array.from({ length: 6 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticles(particlePositions);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background animation elements */}
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-500 rounded-full blur-3xl"></div>
      </motion.div>
      
      {/* Floating particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20"
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
          <div className="w-full flex flex-col gap-6 items-center justify-start p-5 max-w-md">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/"><span className="opacity-80 text-sm flex items-center gap-2 hover:opacity-100 transition-opacity duration-200"><FaArrowLeftLong className="transition-transform duration-200 hover:-translate-x-1" /> Back to Home</span></Link>
            </motion.div>

            {/* Success Icon */}
            <motion.div
              className="flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 300 }}
              >
                <MdCheckCircle className="text-4xl text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex items-center justify-center gap-2 text-3xl font-bold text-center"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse">Quest</span> Initiated!
            </motion.div>

            <motion.div
              className="text-center space-y-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-lg opacity-90">
                Your guild registration is almost complete!
              </p>
              <p className="opacity-80 text-sm leading-relaxed">
                We've sent a magical scroll (confirmation email) to your inbox. 
                Click the link inside to activate your account and officially join the guild.
              </p>
            </motion.div>

            {/* Email Icon with Animation */}
            <motion.div
              className="flex items-center justify-center gap-3 bg-purple-500/10 p-4 rounded-lg border border-purple-500/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatDelay: 3
                }}
              >
                <MdOutlineMail className="text-2xl text-purple-500" />
              </motion.div>
              <span className="text-purple-500 font-medium">Check your email inbox</span>
            </motion.div>

            {/* Instructions */}
            <motion.div
              className="w-full space-y-3 text-sm opacity-80"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-purple-500 font-bold min-w-[20px]">1.</span>
                <span>Open your email application or webmail</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-500 font-bold min-w-[20px]">2.</span>
                <span>Look for an email from Level Up CV</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-500 font-bold min-w-[20px]">3.</span>
                <span>Click the confirmation link in the email</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-500 font-bold min-w-[20px]">4.</span>
                <span>Return here and proceed to login</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col gap-3 w-full mt-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(168, 85, 247, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/login" className="w-full bg-purple-500 pt-3 pb-3 pr-4 pl-4 rounded-lg text-white font-bold hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center gap-2">
                  <AiOutlineThunderbolt className="text-xl" />
                  Proceed to Login
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full border-2 border-purple-500 pt-2 pb-2 pr-4 pl-4 rounded-lg text-purple-500 font-bold hover:bg-purple-500 hover:text-white transition-all duration-200"
                >
                  Didn't receive email? Refresh page
                </button>
              </motion.div>
            </motion.div>

            {/* Help text */}
            <motion.p
              className="text-xs opacity-60 text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Having trouble? Check your spam folder or contact support
            </motion.p>
          </div>
        </motion.div>

        {/* Right side with samurai image */}
        <motion.div 
          className="min-h-screen w-full flex items-center justify-center relative"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Decorative elements */}
          <motion.div
            className="absolute top-20 left-10 w-16 h-16 border-2 border-green-400/30 rounded-full"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-32 right-16 w-12 h-12 border-2 border-purple-400/30 rounded-lg"
            animate={{ rotate: -360, y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating text elements */}
          <motion.div
            className="absolute top-16 right-1/4 text-green-400/40 text-sm font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0.4, 0.8, 0.4], y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            Email Sent
          </motion.div>
          <motion.div
            className="absolute bottom-24 left-16 text-purple-400/40 text-sm font-semibold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: [0.4, 0.8, 0.4], y: [5, -5, 5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          >
            Confirm & Login
          </motion.div>
          
          {/* Main image */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 -m-8 border-2 border-green-400/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ 
                scale: 1.05, 
                filter: "drop-shadow(0 0 30px rgba(34, 197, 94, 0.4))",
              }}
              className="transition-all duration-300 filter drop-shadow-2xl relative z-10"
            >
              <Image src={samuraiImage} alt="Samurai" className="w-7/10 rounded-lg ml-20"/>
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
              className="text-sm text-green-400/60 font-medium italic"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              "Patience, young warrior. Great things await."
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
