"use client";

import { PiLightningBold } from "react-icons/pi";
import { IoMdArrowForward } from "react-icons/io";
import { FaRegChartBar } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { FaBullseye } from "react-icons/fa6";
import { FaCode } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { IoIosGitBranch } from "react-icons/io";
import { motion } from "framer-motion";

export default function Home() {
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
    <main className="flex min-h-screen flex-col items-center justify-start p-24 gap-10 min-w-screen overflow-hidden">
      {/* Floating Badges */}
      <motion.div
        className="absolute top-10 left-10 flex items-center justify-center gap-2 text-black bg-amber-400 pt-1 pb-1 pl-2 pr-2 rounded-lg text-xs shadow-[0_0_20px_rgba(251,191,36,0.8)]"
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
        className="absolute top-52 right-10 flex items-center justify-center gap-2 text-white font-bold bg-blue-500 pt-1 pb-1 pl-2 pr-2 rounded-full text-xl border-2 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
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
        className="absolute top-200 left-20 hidden sm:flex items-center justify-center gap-2 text-black bg-amber-400 pt-1 pb-1 pl-2 pr-2 rounded-lg text-xs shadow-[0_0_20px_rgba(251,191,36,0.8)]"
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
        className="min-w-screen flex flex-col gap-4 text-center items-center justify-center"
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
              animate={{ width: "70%" }}
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
            Dashboard 
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <IoMdArrowForward />
            </motion.div>
          </motion.button>
          <motion.button 
            className="flex gap-2 items-center justify-center text-xl border-3 border-blue-500 pt-2 pb-2 pl-6 pr-6 rounded-xl cursor-pointer text-blue-400 font-bold"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(59,130,246,0.1)",
              y: -2
            }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Login
          </motion.button>
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
      </motion.div>
    </main>
  );
}
