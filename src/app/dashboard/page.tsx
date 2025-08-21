"use client";
import pfp from "@/assets/pfp.png";
import SkillDialog from "@/components/Skill";
import type { Achievement, Profile } from "@/generated/prisma";
import { useAuth } from "@/hooks/useAuth";
import { achievementIcons } from "@/lib/achievementIcons";
import { changeLevelUpState, findProfile, getAllAchievements } from "@/lib/action";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { CiTrophy } from "react-icons/ci";
import { PiLightningBold } from "react-icons/pi";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

type ProfileDetails = {
    skills: {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        totalXp: number;
        level: number;
        profileId: string;
    }[];
    achievements: {
        id: string;
        createdAt: Date;
        profileId: string;
        achievementId: string;
    }[];
    projects: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        link: string | null;
        profileId: string;
        startDate: Date | null;
        endDate: Date | null;
    }[];
    experiences: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        profileId: string;
        startDate: Date | null;
        endDate: Date | null;
        role: string;
        company: string;
        summary: string | null;
    }[];
    certifications: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        profileId: string;
        title: string;
        issuer: string | null;
        issueDate: Date | null;
        expirationDate: Date | null;
    }[];
} & Profile;

export default function DashboardPage() {
    const { user, loading, signUserOut } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<ProfileDetails | null>(null);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [profileFetched, setProfileFetched] = useState(false);
    const [achievementsFetched, setAchievementsFetched] = useState(false);

    const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([]);
    const [isClient, setIsClient] = useState(false);
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const levelUpHandledRef = useRef(false);

    const fetchProfile = async () => {
        if (!user) return;
        try {
            const profileData = await findProfile(user.id);
            setProfile(profileData);

            // Check if the user has leveled up
            if (profileData.hasLevelledUp && !levelUpHandledRef.current) {
                setShowLevelUp(true);
                levelUpHandledRef.current = true;
            }
        } catch (error) {
            if (error instanceof Error) setError(error.message);
        } finally {
            setProfileFetched(true);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [user]);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const allAchievements = await getAllAchievements();
                setAchievements(allAchievements);
            } catch (error) {
                if (error instanceof Error) setError(error.message);
            } finally {
                setAchievementsFetched(true);
            }
        };
        fetchAchievements();
    }, []);

    useEffect(() => {
        setIsClient(true);
        const newParticles = [...Array(15)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
        }));
        setParticles(newParticles);

        // Update window size for confetti
        const updateWindowSize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        updateWindowSize();
        window.addEventListener("resize", updateWindowSize);

        return () => window.removeEventListener("resize", updateWindowSize);
    }, []);

    // Handle level up notification and reset state
    useEffect(() => {
        if (profile?.hasLevelledUp) {
            setShowLevelUp(true);

            // Reset hasLevelledUp to false after 5 seconds
            const timer = setTimeout(async () => {
                if (profile?.id) {
                    try {
                        await changeLevelUpState(profile.id, false);
                        setShowLevelUp(false);
                        levelUpHandledRef.current = false;
                    } catch (error) {
                        console.error("Failed to reset level up state:", error);
                    }
                }
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [profile?.hasLevelledUp, profile?.id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const profileLoading = user && !profileFetched;
    const achievementsLoading = !achievementsFetched;

    if (user) {
        return (
            <div className="flex flex-col items-center justify-start min-h-screen relative overflow-hidden">
                {/* Confetti Effect when level up */}
                {showLevelUp && isClient && (
                    <ReactConfetti
                        width={windowSize.width}
                        height={windowSize.height}
                        recycle={false}
                        numberOfPieces={200}
                        gravity={0.25}
                        colors={["#a3e635", "#fbbf24", "#60a5fa", "#c084fc"]}
                    />
                )}

                {/* Level Up Notification */}
                <Dialog open={showLevelUp} onOpenChange={setShowLevelUp}>
                    <DialogContent className="border border-[var(--border)] bg-card backdrop-blur-md shadow-xl shadow-amber-500/20">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="p-6 flex flex-col items-center justify-center"
                        >
                            <motion.div
                                initial={{ scale: 1 }}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                className="text-5xl text-amber-300 mb-4"
                            >
                                <CiTrophy />
                            </motion.div>
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 mb-2">
                                Level Up!
                            </h2>
                            <p className="text-center text-gray-300 mb-4">
                                Congratulations! You've reached level {profile?.level}!
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setShowLevelUp(false);
                                    if (profile?.id) {
                                        changeLevelUpState(profile.id, false);
                                        levelUpHandledRef.current = false;
                                    }
                                }}
                                className="px-4 py-2 bg-amber-500 text-black font-medium rounded-lg"
                            >
                                Awesome!
                            </motion.button>
                        </motion.div>
                    </DialogContent>
                </Dialog>

                {/* Animated Background (replicated from landing page) */}
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
                {/* Foreground content */}
                <div className="relative z-10 w-full flex flex-col items-center">
                    {/* Profile Information */}
                    <div className="p-7 flex gap-4 w-98/100  rounded-2xl mt-5 items-center justify-start  ">
                        {profileLoading ? (
                            <div className="w-20 h-20 rounded-full bg-gray-700 animate-pulse" />
                        ) : profile?.avatarUrl ? (
                            <img
                                src={profile.avatarUrl}
                                alt="Profile Avatar"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : (
                            <img src={pfp.src} alt="Default Profile" className="w-20 h-20 rounded-full object-cover" />
                        )}
                        <div
                            className={`flex flex-col items-start justify-center ${
                                profileLoading ? "animate-pulse" : ""
                            }`}
                        >
                            <div className="flex items-center justify-start gap-4">
                                {profileLoading ? (
                                    <div className="h-5 w-40 bg-gray-700 rounded-md" />
                                ) : (
                                    <h2 className="text-lg font-semibold">{profile?.fullName || "Unknown User"}</h2>
                                )}
                                {profileLoading ? (
                                    <div className="h-6 w-24 bg-amber-300/40 rounded-md" />
                                ) : (
                                    <div className="rounded-lg bg-amber-300 pl-2 pr-3 text-black text-sm flex items-center justify-center gap-1 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                                        <CiTrophy className="text-lg" /> Level {profile?.level || "No Level Found"}
                                    </div>
                                )}
                            </div>
                            {profileLoading ? (
                                <div className="h-4 w-32 bg-gray-700 rounded-md mt-2" />
                            ) : (
                                <p className="text-sm text-gray-500">{profile?.title || "No Title Set"}</p>
                            )}
                        </div>
                        <div className="ml-4 w-1/3">
                            <div className="flex items-center justify-between gap-2 text-lg w-full">
                                <div className="text-lime-300 flex items-center gap-2">
                                    <PiLightningBold className="text-xl" />
                                    <span className="text-[var(--foreground)] font-bold text-base">
                                        Experience Points
                                    </span>
                                </div>
                                {profileLoading ? (
                                    <div className="h-4 w-20 bg-gray-700 rounded-md animate-pulse" />
                                ) : (
                                    <span className="text-sm opacity-80">
                                        {profile && profile?.currentXpInLevel} / {profile && profile?.level * 50} XP
                                    </span>
                                )}
                            </div>
                            <div
                                className={`w-full h-2 bg-gray-700 rounded-full mt-2 overflow-hidden ${
                                    profileLoading ? "animate-pulse" : ""
                                }`}
                            >
                                {!profileLoading && (
                                    <div
                                        className="h-full bg-lime-400 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${
                                                profile && (profile?.currentXpInLevel / (profile?.level * 50)) * 100
                                            }%`,
                                        }}
                                    />
                                )}
                            </div>
                            <div className="text-sm opacity-70 mt-1">
                                {profileLoading ? (
                                    <div className="h-4 w-36 bg-gray-700 rounded-md animate-pulse" />
                                ) : (
                                    <>
                                        {profile && profile?.level * 50 - profile?.currentXpInLevel} XP until next level
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Achievements */}
                    <Carousel className="p-7 flex flex-col gap-4 w-98/100 border-2 rounded-2xl mt-5 items-center justify-start  ">
                        <div className="flex items-center justify-between w-full">
                            <div className="text-lg font-semibold flex items-center justify-center gap-2">
                                <CiTrophy className="text-3xl text-amber-300" /> Achievements
                            </div>
                            <span>{achievementsLoading ? "--" : profile?.achievements.length || 0}</span>
                        </div>
                        <CarouselPrevious className="left-52 top-10.5" />
                        <CarouselNext className="left-62 top-10.5" />
                        <div className="w-full">
                            <CarouselContent className="py-4">
                                {achievementsLoading
                                    ? Array.from({ length: 4 }).map((_, i) => (
                                          <CarouselItem key={i} className="md:basis-1/3 lg:basis-1/4">
                                              <div className="h-full p-4 border rounded-xl flex flex-col items-center justify-center m-1 border-gray-700 animate-pulse">
                                                  <div className="w-10 h-10 rounded-full bg-gray-700" />
                                                  <div className="h-4 w-24 bg-gray-700 rounded-md mt-3" />
                                                  <div className="h-3 w-32 bg-gray-800 rounded-md mt-2" />
                                              </div>
                                          </CarouselItem>
                                      ))
                                    : achievements.map(achievement => {
                                          const isEarned =
                                              profile?.achievements?.some(a => a.achievementId === achievement.id) ||
                                              false;
                                          const Icon = achievementIcons[achievement.title];
                                          return (
                                              <CarouselItem key={achievement.id} className="md:basis-1/3 lg:basis-1/4">
                                                  <div
                                                      className={`h-full p-4 border rounded-xl flex flex-col items-center justify-center m-1 ${
                                                          isEarned
                                                              ? "  border-amber-400"
                                                              : " /50 border-gray-700 opacity-60"
                                                      }`}
                                                  >
                                                      {Icon && <Icon className="text-3xl" />}
                                                      <h4
                                                          className={`text-md font-medium text-center mt-2 ${
                                                              isEarned ? "text-amber-300" : "text-gray-400"
                                                          }`}
                                                      >
                                                          {achievement.title}
                                                      </h4>
                                                      <p
                                                          className={`text-xs mt-2 text-center ${
                                                              isEarned ? "text-gray-300" : "text-gray-500"
                                                          }`}
                                                      >
                                                          {achievement.description}
                                                      </p>
                                                  </div>
                                              </CarouselItem>
                                          );
                                      })}
                            </CarouselContent>
                        </div>
                    </Carousel>

                    {/* Skills */}
                    <Carousel className="p-7 flex flex-col gap-4 w-98/100 border-2 rounded-2xl mt-5 items-center justify-start  ">
                        <div className="flex items-center justify-between w-full">
                            <div className="text-lg font-semibold flex items-center justify-center gap-2">
                                <PiLightningBold className="text-3xl text-lime-300" /> Skills
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <SkillDialog
                                    profileId={profile?.id as string}
                                    onAdded={async () => {
                                        setProfileFetched(false); // show loading placeholders briefly
                                        levelUpHandledRef.current = false; // Reset the ref to allow new level up notifications
                                        await fetchProfile(); // This will check for hasLevelledUp
                                    }}
                                />
                                <span>{profileLoading ? "--" : profile?.skills.length || 0}</span>
                            </div>
                        </div>
                        <CarouselPrevious className="left-32 top-10.5" />
                        <CarouselNext className="left-42 top-10.5" />
                        <div className="w-full">
                            <CarouselContent className="py-4">
                                {profileLoading ? (
                                    Array.from({ length: 3 }).map((_, i) => (
                                        <CarouselItem key={i} className="md:basis-1/3 lg:basis-1/4">
                                            <div className="h-full p-4 border rounded-xl flex flex-col items-center justify-center m-1 border-lime-400 animate-pulse">
                                                <div className="h-5 w-24 bg-gray-700 rounded-md" />
                                                <div className="h-6 w-20 bg-lime-300/40 rounded-md mt-3" />
                                                <div className="w-full mt-4">
                                                    <div className="flex items-center justify-between w-full">
                                                        <div className="h-4 w-8 bg-gray-700 rounded-md" />
                                                        <div className="h-4 w-16 bg-gray-700 rounded-md" />
                                                    </div>
                                                    <div className="w-full h-2 bg-gray-700 rounded-full mt-2" />
                                                    <div className="h-4 w-24 bg-gray-700 rounded-md mt-2" />
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))
                                ) : (
                                    <>
                                        {profile?.skills.map(skill => {
                                            const xpForNextLevel = skill.level * 100;
                                            const currentXp = skill.totalXp;
                                            const xpProgress = currentXp - (skill.level - 1) * 100;
                                            const progressPercent = Math.min((xpProgress / 100) * 100, 100);
                                            const xpRemaining = xpForNextLevel - currentXp;
                                            return (
                                                <CarouselItem key={skill.id} className="md:basis-1/3 lg:basis-1/4">
                                                    <div className="h-full p-4 border rounded-xl flex flex-col items-center justify-center m-1   border-lime-400">
                                                        <h4 className="text-md font-medium text-center mt-2 text-lime-300">
                                                            {skill.name}
                                                        </h4>
                                                        <div className="rounded-lg bg-lime-300 pl-2 pr-3 text-black text-sm flex items-center justify-center gap-1 mt-2 drop-shadow-[0_0_10px_rgba(163,230,53,0.5)]">
                                                            Level {skill.level}
                                                        </div>
                                                        <div className="w-full mt-3">
                                                            <div className="flex items-center justify-between gap-2 text-lg w-full">
                                                                <span className="text-[var(--foreground)] font-bold text-base">
                                                                    XP
                                                                </span>
                                                                <span className="text-sm opacity-80">
                                                                    {xpProgress} / 100 XP
                                                                </span>
                                                            </div>
                                                            <div className="w-full h-2 bg-gray-700 rounded-full mt-2 overflow-hidden">
                                                                <div
                                                                    className="h-full bg-lime-400 rounded-full transition-all duration-300"
                                                                    style={{ width: `${progressPercent}%` }}
                                                                />
                                                            </div>
                                                            <div className="text-sm opacity-70 mt-1">
                                                                {xpRemaining} XP until next level
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CarouselItem>
                                            );
                                        })}
                                        {profile?.skills.length === 0 && (
                                            <CarouselItem className="md:basis-1/3 lg:basis-1/4">
                                                <div className="h-full p-4 border rounded-xl flex flex-col items-center justify-center m-1   border-lime-400 border-dashed cursor-pointer hover:bg-lime-800/20 transition-color duration-100">
                                                    <div className="text-6xl font-medium text-center text-lime-300 opacity-70">
                                                        +
                                                    </div>
                                                    <p className="text-sm text-center mt-2 opacity-70">
                                                        Add your first skill
                                                    </p>
                                                </div>
                                            </CarouselItem>
                                        )}
                                    </>
                                )}
                            </CarouselContent>
                        </div>
                    </Carousel>

                    {/* Project, Internship and Certifications */}
                    <div className="flex flex-row gap-4 w-98/100 mt-5">
                        {/* Projects */}
                        <div className="flex-1 p-7 flex flex-col gap-4 border-2 rounded-2xl items-center justify-start  ">
                            <div className="flex items-center justify-between w-full">
                                <div className="text-lg font-semibold">Projects</div>
                                <div className="flex items-center justify-center gap-2">
                                    <button className="ml-2 px-3 py-1 text-sm bg-indigo-800/60 hover:bg-indigo-700/80 text-indigo-300 rounded-lg flex items-center cursor-pointer">
                                        <span className="mr-1">+</span> Project
                                    </button>
                                    <span>{profile?.projects.length || 0}</span>
                                </div>
                            </div>
                            <Carousel orientation="vertical" className="w-full h-72">
                                <CarouselContent className="h-full">
                                    {profile?.projects.map(project => (
                                        <CarouselItem key={project.id} className="h-52">
                                            <div className="h-full p-4 border rounded-xl flex flex-col m-1   border-indigo-400">
                                                <h4 className="text-md font-medium text-indigo-300">{project.title}</h4>
                                                <p className="text-xs mt-2 text-gray-300 line-clamp-3">
                                                    {project.description || "No description"}
                                                </p>
                                                {project.link && (
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-indigo-300 mt-2 underline"
                                                    >
                                                        View Project
                                                    </a>
                                                )}
                                                <div className="text-xs text-gray-400 mt-auto">
                                                    {project.startDate
                                                        ? new Date(project.startDate).toLocaleDateString()
                                                        : "N/A"}
                                                    {project.endDate
                                                        ? ` - ${new Date(project.endDate).toLocaleDateString()}`
                                                        : " - Present"}
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                    {profile?.projects.length === 0 && (
                                        <CarouselItem className="h-52">
                                            <div className="h-full p-4 border rounded-xl flex flex-col items-center justify-center m-1   border-indigo-400 border-dashed cursor-pointer hover:bg-indigo-800/20 transition-color duration-100">
                                                <div className="text-6xl font-medium text-center text-indigo-300 opacity-70">
                                                    +
                                                </div>
                                                <p className="text-sm text-center mt-2 opacity-70">
                                                    Add your first project
                                                </p>
                                            </div>
                                        </CarouselItem>
                                    )}
                                </CarouselContent>
                            </Carousel>
                        </div>

                        {/* Experiences */}
                        <div className="flex-1 p-7 flex flex-col gap-4 border-2 rounded-2xl items-center justify-start  ">
                            <div className="flex items-center justify-between w-full">
                                <div className="text-lg font-semibold">Experiences</div>
                                <div className="flex items-center justify-center gap-2">
                                    <button className="ml-2 px-3 py-1 text-sm bg-purple-800/60 hover:bg-purple-700/80 text-purple-300 rounded-lg flex items-center cursor-pointer">
                                        <span className="mr-1">+</span> Experience
                                    </button>
                                    <span>{profile?.experiences.length || 0}</span>
                                </div>
                            </div>
                            <Carousel orientation="vertical" className="w-full h-72">
                                <CarouselContent className="h-full">
                                    {profile?.experiences.map(experience => (
                                        <CarouselItem key={experience.id} className="h-52">
                                            <div className="h-full p-4 border rounded-xl flex flex-col m-1   border-purple-400">
                                                <h4 className="text-md font-medium text-purple-300">
                                                    {experience.role}
                                                </h4>
                                                <p className="text-sm text-gray-300">{experience.company}</p>
                                                <p className="text-xs mt-2 text-gray-300 line-clamp-3">
                                                    {experience.summary || "No summary"}
                                                </p>
                                                <div className="text-xs text-gray-400 mt-auto">
                                                    {experience.startDate
                                                        ? new Date(experience.startDate).toLocaleDateString()
                                                        : "N/A"}
                                                    {experience.endDate
                                                        ? ` - ${new Date(experience.endDate).toLocaleDateString()}`
                                                        : " - Present"}
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                    {profile?.experiences.length === 0 && (
                                        <CarouselItem className="h-52">
                                            <div className="h-full p-4 border rounded-xl flex flex-col items-center justify-center m-1   border-purple-400 border-dashed cursor-pointer hover:bg-purple-800/20 transition-color duration-100">
                                                <div className="text-6xl font-medium text-center text-purple-300 opacity-70">
                                                    +
                                                </div>
                                                <p className="text-sm text-center mt-2 opacity-70">
                                                    Add your first experience
                                                </p>
                                            </div>
                                        </CarouselItem>
                                    )}
                                </CarouselContent>
                            </Carousel>
                        </div>

                        {/* Certifications */}
                        <div className="flex-1 p-7 flex flex-col gap-4 border-2 rounded-2xl items-center justify-start  ">
                            <div className="flex items-center justify-between w-full">
                                <div className="text-lg font-semibold">Certifications</div>
                                <div className="flex items-center justify-center gap-2">
                                    <button className="ml-2 px-3 py-1 text-sm bg-cyan-800/60 hover:bg-cyan-700/80 text-cyan-300 rounded-lg flex items-center cursor-pointer">
                                        <span className="mr-1">+</span> Certification
                                    </button>
                                    <span>{profile?.certifications.length || 0}</span>
                                </div>
                            </div>
                            <Carousel orientation="vertical" className="w-full h-72">
                                <CarouselContent className="h-full">
                                    {profile?.certifications.map(certification => (
                                        <CarouselItem key={certification.id} className="h-52">
                                            <div className="h-full p-4 border rounded-xl flex flex-col m-1   border-cyan-400">
                                                <h4 className="text-md font-medium text-cyan-300">
                                                    {certification.title}
                                                </h4>
                                                <p className="text-sm text-gray-300">
                                                    {certification.issuer || "No issuer"}
                                                </p>
                                                <div className="text-xs text-gray-400 mt-auto">
                                                    {certification.issueDate
                                                        ? `Issued: ${new Date(
                                                              certification.issueDate
                                                          ).toLocaleDateString()}`
                                                        : ""}
                                                    {certification.expirationDate
                                                        ? `, Expires: ${new Date(
                                                              certification.expirationDate
                                                          ).toLocaleDateString()}`
                                                        : ""}
                                                    {!certification.issueDate &&
                                                        !certification.expirationDate &&
                                                        "No dates provided"}
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                    {profile?.certifications.length === 0 && (
                                        <CarouselItem className="h-52">
                                            <div className="h-full p-4 border rounded-xl flex flex-col items-center justify-center m-1   border-cyan-400 border-dashed cursor-pointer hover:bg-cyan-800/20 transition-color duration-100">
                                                <div className="text-6xl font-medium text-center text-cyan-300 opacity-70">
                                                    +
                                                </div>
                                                <p className="text-sm text-center mt-2 opacity-70">
                                                    Add your first certification
                                                </p>
                                            </div>
                                        </CarouselItem>
                                    )}
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </div>
                </div>
                {/* End outer container */}
            </div>
        );
    }

    return null;
}
