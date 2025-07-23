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
      
      {/* Footer */}
      <footer className="min-w-screen border-t mt-20 px-4 md:px-8 py-12 md:py-16 flex items-center justify-center">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 md:mb-12">
            {/* Logo and Description */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <PiLightningBold className="text-white text-lg md:text-xl" />
                </div>
                <span className="text-blue-500 text-lg md:text-xl font-bold">LevelUp CV</span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 max-w-xs">
                Transform your resume into an epic RPG character sheet. Level up your career with XP, badges, and achievements.
              </p>
              <div className="flex gap-3 md:gap-4">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                  <span className="text-gray-400 hover:text-white text-xs md:text-sm">𝕏</span>
                </div>
                <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                  <span className="text-gray-400 hover:text-white text-xs md:text-sm">⚡</span>
                </div>
                <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                  <span className="text-gray-400 hover:text-white text-xs md:text-sm">in</span>
                </div>
                <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                  <span className="text-gray-400 hover:text-white text-xs md:text-sm">✉</span>
                </div>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Product</h3>
              <ul className="space-y-2 md:space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs md:text-sm">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs md:text-sm">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs md:text-sm">Templates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs md:text-sm">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs md:text-sm">API</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Resources</h3>
              <ul className="space-y-2 md:space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs md:text-sm">🛟 Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs md:text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs md:text-sm">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs md:text-sm">Career Tips</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs md:text-sm">Resume Examples</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Company</h3>
              <ul className="space-y-2 md:space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs md:text-sm">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs md:text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs md:text-sm">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs md:text-sm">🔒 Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-xs md:text-sm">📄 Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-xs md:text-sm text-center md:text-left">
              © 2024 LevelUp CV. All rights reserved. Made with <span className="text-red-500">❤</span> for developers.
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
              <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>50K+ developers leveled up</span>
              </div>
              <div className="bg-yellow-500 text-black px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                ⚡ Live
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
