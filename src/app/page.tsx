"use client";

import { PiLightningBold } from "react-icons/pi";
import { IoMdArrowForward } from "react-icons/io";
import { FaRegChartBar } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { FaBullseye } from "react-icons/fa6";
import { FaCode } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { IoIosGitBranch } from "react-icons/io";
import { easeIn, motion } from "framer-motion";

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 gap-10 min-w-screen">
      <motion.div 
        className="absolute top-10 left-10 flex items-center justify-center gap-2 text-black bg-amber-400 pt-1 pb-1 pl-2 pr-2 rounded-lg text-xs shadow-[0_0_20px_rgba(251,191,36,0.8)]"
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <FaTrophy /> BETA
      </motion.div>
      <motion.div 
        className="absolute top-52 right-10 flex items-center justify-center gap-2 text-white font-bold bg-blue-500 pt-1 pb-1 pl-2 pr-2 rounded-full text-xl border-2 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        15
      </motion.div>
      <motion.div 
        className="absolute top-200 left-20 hidden sm:flex items-center justify-center gap-2 text-black bg-amber-400 pt-1 pb-1 pl-2 pr-2 rounded-lg text-xs shadow-[0_0_20px_rgba(251,191,36,0.8)]"
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <FaCode /> CODE
      </motion.div>
      <div className="min-w-screen flex flex-col gap-4 text-center items-center justify-center">
        <h1 className="text-7xl md:text-8xl font-extrabold pl-10 pr-10">
          <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            Gamify{" "}
          </span>
          Your Resume. <br />
          Show Off Your{" "}
          <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            Skills
          </span>
          .
        </h1>
        <p className="text-2xl md:text-3xl text-gray-500 p-5 md:max-w-8/10 lg:max-w-6/10">
          Transform your boring CV into an epic RPG character sheet. Level up
          your career with XP, badges, and achievements that actually matter to
          recruiters.
        </p>
        <div className="flex flex-col gap-4 items-center justify-center mt-10 w-8/10 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-card p-4 md:p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between gap-2 text-lg md:text-xl lg:text-2xl w-full px-2 md:px-4 lg:px-5">
            <div className="text-lime-300 flex items-center gap-1 md:gap-2">
              <PiLightningBold className="text-lg md:text-xl lg:text-2xl" />
              <span className="text-[var(--foreground)] font-bold text-base md:text-lg lg:text-xl">
                Frontend Skills
              </span>
            </div>
            <span className="text-sm md:text-base lg:text-lg">Level 15</span>
          </div>
          <div className="w-9/10 h-2 bg-[var(--foreground)] rounded-full mt-2">
            <hr className="border-2 h-full bg-lime-400 w-7/10 rounded-full" />
          </div>
          <div className="text-sm md:text-base lg:text-lg opacity-70">
            7,500 / 10,000 XP to next level
          </div>
        </div>
        <div className="flex gap-10 items-center justify-center mt-10">
          <button className="flex gap-2 items-center justify-center text-xl bg-blue-500 pt-2 pb-2 pl-6 pr-6 rounded-xl cursor-pointer font-bold">
            Try Dashboard <IoMdArrowForward />
          </button>
          <button className="flex gap-2 items-center justify-center text-xl border-4 border-blue-500 pt-2 pb-2 pl-6 pr-6 rounded-xl cursor-pointer text-blue-400 font-bold">
            Login
          </button>
        </div>
        <div className="mt-10 flex items-center justify-around w-8/10 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ">
          <div className="flex flex-col items-center justify-center">
            <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] text-3xl font-bold">
              ∞
            </span>
            <span className="opacity-80">XP to Earn</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] text-3xl font-bold">
              100+
            </span>
            <span className="opacity-80">Unique Badges</span>
          </div>
        </div>
        <h1 className="text-7xl md:text-8xl font-extrabold pl-10 pr-10 mt-30">
          <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            Level Up{" "}
          </span>
          Your Career <br />
        </h1>
        <p className="text-2xl md:text-3xl text-gray-500 p-5 md:max-w-8/10 lg:max-w-6/10">
          Turn your professional journey into an engaging RPG experience. Every
          skill learned and project completed makes you stronger.
        </p>
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-6/10 md:w-8/10 mt-20">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`flex flex-col items-start p-6 rounded-2xl shadow-lg bg-card ${card.glowEffect}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className={`text-4xl mb-4 ${card.iconBG} p-3 rounded-xl`}>
            {card.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-left">{card.title}</h3>
              <p className="text-base opacity-80 text-left">{card.content}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col items-start justify-start gap-2 text-lg md:text-xl lg:text-2xl w-6/10 md:w-1/3 md:px-4 lg:px-5 mt-10 border rounded-xl p-4">
            <div className="text-lime-300 flex items-center gap-1 md:gap-2">
              <PiLightningBold className="text-lg md:text-xl lg:text-2xl" />
              <span className="text-[var(--foreground)] font-bold text-sm md:text-lg lg:text-xl text-left">
                Ready to start your journey?
              </span>
            </div>
            <p className="text-left text-xs ms:text-sm opacity-80">Join thousands of developers who've already leveled up their careers</p>
        </div>
      </div>
      
      
    </main>
  );
}
