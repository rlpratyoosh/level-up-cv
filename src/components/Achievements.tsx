"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Achievement, Profile } from "@/generated/prisma/client";
import { achievementIcons } from "@/lib/achievementIcons";
import { CiTrophy } from "react-icons/ci";

interface AchievementsProps {
    profile:
        | (Profile & {
              achievements: {
                  id: string;
                  createdAt: Date;
                  profileId: string;
                  achievementId: string;
              }[];
          })
        | null;
    achievements: Achievement[];
    achievementsLoading: boolean;
}

export default function Achievements({ profile, achievements, achievementsLoading }: AchievementsProps) {
    return (
        <Carousel className="p-7 flex flex-col gap-4 w-98/100 rounded-2xl mt-5 items-center justify-start bg-black/20 backdrop-blur-sm border border-amber-500/30 shadow-lg shadow-amber-500/10">
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
                                  profile?.achievements?.some(a => a.achievementId === achievement.id) || false;
                              const Icon = achievementIcons[achievement.title];
                              return (
                                  <CarouselItem key={achievement.id} className="md:basis-1/3 lg:basis-1/4">
                                      <div
                                          className={`h-full p-4 border rounded-xl flex flex-col items-center justify-center m-1 ${
                                              isEarned
                                                  ? "bg-gradient-to-b from-amber-950/30 to-black/40 border-amber-400 shadow-md shadow-amber-500/20"
                                                  : "bg-black/30 border-gray-700 opacity-60"
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
    );
}
