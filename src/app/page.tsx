"use client";

import { PiLightningBold } from "react-icons/pi";
import { IoMdArrowForward } from "react-icons/io";
import { FaRegChartBar } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { FaBullseye } from "react-icons/fa6";
import { FaCode } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { IoIosGitBranch } from "react-icons/io";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import LoginDialog from "@/components/Login";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [particles, setParticles] = useState<Array<{left: string, top: string}>>([]);
  const [footerSparkles, setFooterSparkles] = useState<Array<{left: string, top: string}>>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Generate particles for background
    const newParticles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticles(newParticles);

    // Generate sparkles for footer
    const newSparkles = [...Array(6)].map(() => ({
      left: `${20 + Math.random() * 60}%`,
      top: `${20 + Math.random() * 60}%`,
    }));
    setFooterSparkles(newSparkles);
  }, []);

  const cards = [
    {
      icon: <FaRegChartBar />,
      title: "XP System",
      content:
        "Gain experience points for every project, skill, and achievement. Watch your developer level grow with each contribution.",
      glowEffect: "hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]",
      iconBG: "bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]",
    },
    {
      icon: <FaTrophy />,
      title: "Achievement Badges",
      content:
        "Unlock exclusive badges for milestones like 'First PR', 'Bug Hunter', 'Code Reviewer', and 100+ more achievements.",
      glowEffect: "hover:shadow-[0_0_30px_rgba(234,179,8,0.6)]",
      iconBG: "bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.6)]",
    },
    {
      icon: <FaBullseye />,
      title: "Skill Levels",
      content:
        "Track your proficiency in different technologies with detailed level progression and skill trees.",
      glowEffect: "hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]",
      iconBG: "bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]",
    },
    {
      icon: <IoIosGitBranch />,
      title: "GitHub Integration",
      content:
        "Automatically sync your repositories, contributions, and coding activity to boost your XP and unlock new badges.",
      glowEffect: "hover:shadow-[0_0_30px_rgba(250,204,21,0.6)]",
      iconBG: "bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)]",
    },
    {
      icon: <FaCode />,
      title: "Real-time Builder",
      content:
        "See your resume update instantly as you add projects, skills, and experiences. No more tedious formatting.",
      glowEffect: "hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]",
      iconBG: "bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]",
    },
    {
      icon: <FiDownload />,
      title: "Multiple Exports",
      content:
        "Export your gamified resume in PDF, JSON, or traditional formats. Perfect for any application scenario.",
      glowEffect: "hover:shadow-[0_0_30px_rgba(190,242,100,0.6)]",
      iconBG: "bg-lime-300 shadow-[0_0_20px_rgba(190,242,100,0.6)]",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 gap-10 min-w-screen overflow-hidden relative">
      {/* Enhanced Background Animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 50, -100, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, 150, -75, 0],
            y: [0, -100, 150, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />

        {/* Floating particles */}
        {isClient && particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
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
          animate={{
            rotate: [45, 405, 45],
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-6 h-6 border-2 border-purple-400/40 rounded-full"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/6 w-3 h-12 bg-gradient-to-b from-green-400/30 to-transparent rounded-full"
          animate={{
            scaleY: [1, 1.5, 0.5, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 45, -45, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Pulsing rings */}
        <motion.div
          className="absolute top-1/6 left-1/2 w-32 h-32 border border-blue-400/20 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-24 h-24 border border-purple-400/20 rounded-full"
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeOut",
            delay: 2
          }}
        />
      </div>
      {/* Floating Badges */}
      <motion.div
        className="absolute top-10 left-10 flex items-center justify-center gap-2 text-black bg-amber-400 pt-1 pb-1 pl-2 pr-2 rounded-lg text-xs shadow-[0_0_20px_rgba(251,191,36,0.8)] z-20"
        initial={{ opacity: 0, x: -100 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          y: [0, -10, 0]
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.5 },
          x: { duration: 0.8, delay: 0.5 },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
      >
        <FaTrophy /> BETA
      </motion.div>

      <motion.div
        className="absolute top-52 right-10 flex items-center justify-center gap-2 text-white font-bold bg-blue-500 pt-1 pb-1 pl-2 pr-2 rounded-full text-xl border-2 shadow-[0_0_10px_rgba(59,130,246,0.5)] z-20"
        initial={{ opacity: 0, x: 100, rotate: 180 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          rotate: 0,
          y: [0, -10, 0]
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.7 },
          x: { duration: 0.8, delay: 0.7 },
          rotate: { duration: 0.8, delay: 0.7 },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
      >
        15
      </motion.div>

      <motion.div
        className="absolute top-200 left-20 hidden sm:flex items-center justify-center gap-2 text-black bg-amber-400 pt-1 pb-1 pl-2 pr-2 rounded-lg text-xs shadow-[0_0_20px_rgba(251,191,36,0.8)] z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -10, 0]
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.9 },
          scale: { duration: 0.8, delay: 0.9, type: "spring", stiffness: 200 },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
      >
        <FaCode /> CODE
      </motion.div>

      <motion.div 
        className="min-w-screen flex flex-col gap-4 text-center items-center justify-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Title */}
        <motion.h1 
          className="text-7xl md:text-8xl font-extrabold pl-10 pr-10"
          variants={itemVariants}
        >
          <motion.span 
            className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Gamify{" "}
          </motion.span>
          Your Resume. <br />
          Show Off Your{" "}
          <motion.span 
            className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Skills
          </motion.span>
          .
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p 
          className="text-2xl md:text-3xl text-gray-500 p-5 md:max-w-8/10 lg:max-w-6/10"
          variants={itemVariants}
        >
          Transform your boring CV into an epic RPG character sheet. Level up
          your career with XP, badges, and achievements that actually matter to
          recruiters.
        </motion.p>

        {/* XP Card */}
        <motion.div 
          className="flex flex-col gap-4 items-center justify-center mt-10 w-8/10 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-card p-4 md:p-6 rounded-2xl shadow-lg"
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
          }}
        >
          <div className="flex items-center justify-between gap-2 text-lg md:text-xl lg:text-2xl w-full px-2 md:px-4 lg:px-5">
            <motion.div 
              className="text-lime-300 flex items-center gap-1 md:gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                <PiLightningBold className="text-lg md:text-xl lg:text-2xl" />
              </motion.div>
              <span className="text-[var(--foreground)] font-bold text-base md:text-lg lg:text-xl">
                Frontend Skills
              </span>
            </motion.div>
            <motion.span 
              className="text-sm md:text-base lg:text-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
            >
              Level 15
            </motion.span>
          </div>
          <div className="w-9/10 h-2 bg-[var(--foreground)] rounded-full mt-2">
            <motion.hr 
              className="border-2 border-lime-400 h-full bg-lime-400 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
            />
          </div>
          <motion.div 
            className="text-sm md:text-base lg:text-lg opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 2 }}
          >
            7,500 / 10,000 XP to next level
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex gap-10 items-center justify-center mt-10"
          variants={itemVariants}
        >
          <motion.button 
            className="flex gap-2 items-center justify-center text-xl bg-blue-500 pt-2 pb-2 pl-6 pr-6 rounded-xl cursor-pointer font-bold" 
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 20px rgba(59,130,246,0.6)",
              y: -2
            }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link href="/dashboard">Dashboard</Link>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <IoMdArrowForward />
            </motion.div>
          </motion.button>
          <LoginDialog />
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="mt-10 flex items-center justify-around w-8/10 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          variants={itemVariants}
        >
          <motion.div 
            className="flex flex-col items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span 
              className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] text-3xl font-bold"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ∞
            </motion.span>
            <span className="opacity-80">XP to Earn</span>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span 
              className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] text-3xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              100+
            </motion.span>
            <span className="opacity-80">Unique Badges</span>
          </motion.div>
        </motion.div>

        {/* Second Hero Section */}
        <motion.h1 
          className="text-7xl md:text-8xl font-extrabold pl-10 pr-10 mt-30"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Level Up{" "}
          </motion.span>
          Your Career <br />
        </motion.h1>

        <motion.p 
          className="text-2xl md:text-3xl text-gray-500 p-5 md:max-w-8/10 lg:max-w-6/10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Turn your professional journey into an engaging RPG experience. Every
          skill learned and project completed makes you stronger.
        </motion.p>

        {/* Feature Cards Grid */}
        <motion.div 
          className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-6/10 md:w-8/10 mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`flex flex-col items-start p-6 rounded-2xl shadow-lg bg-card ${card.glowEffect}`}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex gap-4 items-center justify-center">
                <motion.div 
                  className={`text-4xl mb-4 ${card.iconBG} p-3 rounded-xl`}
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {card.icon}
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold mb-2 text-left"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {card.title}
                </motion.h3>
              </div>
              <motion.p 
                className="text-base opacity-80 text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.7 }}
              >
                {card.content}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          className="flex flex-col items-start justify-start gap-2 text-lg md:text-xl lg:text-2xl w-6/10 md:w-1/3 md:px-4 lg:px-5 mt-10 border rounded-xl p-4"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
          }}
        >
          <div className="text-lime-300 flex items-center gap-1 md:gap-2">
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <PiLightningBold className="text-lg md:text-xl lg:text-2xl" />
            </motion.div>
            <span className="text-[var(--foreground)] font-bold text-sm md:text-lg lg:text-xl text-left">
              Ready to start your journey?
            </span>
          </div>
          <motion.p 
            className="text-left text-xs ms:text-sm opacity-80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Join thousands of developers who've already leveled up their careers
          </motion.p>
        </motion.div>

        {/* Beautiful Footer */}
        <motion.footer 
          className="w-full max-w-4xl mt-32 mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Footer Content */}
          <motion.div 
            className="relative bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-gray-800/50 dark:to-gray-900/50 rounded-3xl p-8 md:p-12 border border-blue-100/50 dark:border-gray-700/50 backdrop-blur-sm shadow-2xl"
            whileHover={{ 
              scale: 1.01,
              boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>

            <div className="relative z-10 text-center space-y-6">
              {/* Project Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold mb-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span 
                    className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    animate={{ 
                      textShadow: [
                        "0 0 10px rgba(59,130,246,0.5)",
                        "0 0 20px rgba(59,130,246,0.8)",
                        "0 0 10px rgba(59,130,246,0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Level Up CV
                  </motion.span>
                </motion.h3>
              </motion.div>

              {/* Made with love message */}
              <motion.div 
                className="flex items-center justify-center gap-2 text-lg md:text-xl text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <span>Made with</span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FaHeart className="text-red-500 text-xl" />
                </motion.div>
                <span>by</span>
                <motion.span 
                  className="font-bold text-blue-600 dark:text-blue-400"
                  whileHover={{ 
                    scale: 1.1,
                    color: "#3b82f6"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Pratyoosh
                </motion.span>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex items-center justify-center gap-6 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.a
                  href="https://github.com/rlpratyoosh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  whileHover={{ 
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="text-2xl text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" />
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/in/pratyoosh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  whileHover={{ 
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin className="text-2xl text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.a>
                
                <motion.a
                  href="https://twitter.com/pratyoosh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  whileHover={{ 
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTwitter className="text-2xl text-sky-500 group-hover:text-sky-600 transition-colors duration-300" />
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-sky-700 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.a>
              </motion.div>

              {/* Floating sparkles around footer */}
              {isClient && footerSparkles.map((sparkle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
                  style={{
                    left: sparkle.left,
                    top: sparkle.top,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    x: [-5, 5, -5],
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.footer>
      </motion.div>
    </main>
  );
}
