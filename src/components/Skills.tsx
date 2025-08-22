"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Profile } from "@/generated/prisma/client";
import { PiLightningBold } from "react-icons/pi";
import SkillDialog from "./SkillDialog";

interface SkillsProps {
    profile:
        | (Profile & {
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
          })
        | null;
    profileLoading: boolean | null;
    onAdded: () => Promise<void>;
}

export default function Skills({ profile, profileLoading, onAdded }: SkillsProps) {
    return (
        <Carousel className="p-7 flex flex-col gap-4 w-98/100 rounded-2xl mt-5 items-center justify-start bg-black/20 backdrop-blur-sm border border-lime-500/30 shadow-lg shadow-lime-500/10">
            <div className="flex items-center justify-between w-full">
                <div className="text-lg font-semibold flex items-center justify-center gap-2">
                    <PiLightningBold className="text-3xl text-lime-300" /> Skills
                </div>
                <div className="flex items-center justify-center gap-2">
                    <SkillDialog profileId={profile?.id as string} onAdded={onAdded} />
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
                                        <div className="h-full p-4 border rounded-xl flex flex-col m-1 bg-gradient-to-b from-lime-950/30 to-black/40 border-lime-400 shadow-md shadow-lime-500/20 relative group">
                                            {/* Header with skill name and options */}
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="text-md font-medium text-lime-300">{skill.name}</h4>
                                                <button className="bg-lime-900/60 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-lime-800/70">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 text-lime-300"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Level badge */}
                                            <div className="flex items-center space-x-2 mb-3">
                                                <div className="rounded-lg bg-lime-300 pl-2 pr-3 text-black text-sm flex items-center justify-center gap-1 drop-shadow-[0_0_10px_rgba(163,230,53,0.5)]">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M13.5 3a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15 5A3 3 0 0118 8v1.5c0 .83-.67 1.5-1.5 1.5H16v4c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 014 15v-4H2.5A1.5 1.5 0 011 10.5V8a3 3 0 013-3h11z" />
                                                    </svg>
                                                    Level {skill.level}
                                                </div>
                                                <div className="text-xs bg-lime-900/40 text-lime-200 py-0.5 px-2 rounded-md">
                                                    Total XP: {skill.totalXp}
                                                </div>
                                            </div>

                                            {/* XP Progress section */}
                                            <div className="w-full mt-auto">
                                                <div className="flex items-center justify-between gap-2 w-full">
                                                    <div className="flex items-center gap-1">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 text-lime-300"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        <span className="text-[var(--foreground)] font-bold text-sm">
                                                            XP Progress
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-lime-200/90">
                                                        {xpProgress} / 100 XP
                                                    </span>
                                                </div>

                                                {/* Progress bar with animated glow */}
                                                <div className="w-full h-2 bg-gray-700 rounded-full mt-1 overflow-hidden relative">
                                                    <div
                                                        className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-lime-300/20 animate-pulse rounded-full"
                                                        style={{ width: "100%" }}
                                                    ></div>
                                                    <div
                                                        className="h-full bg-gradient-to-r from-lime-500 to-lime-300 rounded-full transition-all duration-300 relative z-10"
                                                        style={{ width: `${progressPercent}%` }}
                                                    />
                                                </div>

                                                {/* XP Remaining with icon */}
                                                <div className="text-xs text-lime-200/70 mt-1 flex items-center gap-1">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-3 w-3"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    {xpRemaining} XP until next level
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                );
                            })}
                            {profile?.skills.length === 0 && (
                                <CarouselItem className="md:basis-1/3 lg:basis-1/4">
                                    <div className="h-full p-4 border rounded-xl flex flex-col items-center justify-center m-1 bg-black/40 border-lime-400 border-dashed cursor-pointer hover:bg-lime-800/20 transition-all duration-200 shadow-inner shadow-lime-500/5 group">
                                        <div className="text-6xl font-medium text-center text-lime-300 opacity-70 group-hover:scale-110 transition-transform duration-200">
                                            +
                                        </div>
                                        <p className="text-sm text-center mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                            Add your first skill
                                        </p>
                                        <button className="mt-3 bg-lime-900/60 text-lime-300 text-xs py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-lime-800/70 flex items-center gap-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Get Started
                                        </button>
                                    </div>
                                </CarouselItem>
                            )}
                        </>
                    )}
                </CarouselContent>
            </div>
        </Carousel>
    );
}
