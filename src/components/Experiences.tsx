"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Profile } from "@/generated/prisma/client";
import { MdWork } from "react-icons/md";

interface ExperiencesProps {
    profile:
        | (Profile & {
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
          })
        | null;
    profileLoading: boolean | null;
}

export default function Experiences({ profile, profileLoading }: ExperiencesProps) {
    return (
        <div className="flex-1 p-7 flex flex-col gap-4 rounded-2xl items-center justify-start bg-black/20 backdrop-blur-sm border border-purple-500/30 shadow-lg shadow-purple-500/10">
            <div className="flex items-center justify-between w-full">
                <div className="text-lg font-semibold flex items-center justify-center gap-2">
                    {" "}
                    <MdWork className="text-3xl text-purple-500" /> Experiences
                </div>
                <div className="flex items-center justify-center gap-2">
                    <button className="ml-2 px-3 py-1 text-sm bg-purple-800/60 hover:bg-purple-700/80 text-purple-300 rounded-lg flex items-center cursor-pointer">
                        <span className="mr-1">+</span> Experience
                    </button>
                    <span>{profileLoading ? "--" : profile?.experiences.length || 0}</span>
                </div>
            </div>
            <Carousel orientation="vertical" className="w-full h-72">
                <CarouselContent className="h-full">
                    {profileLoading ? (
                        Array.from({ length: 2 }).map((_, i) => (
                            <CarouselItem key={i} className="h-52">
                                <div className="h-full p-4 border rounded-xl flex flex-col m-1 border-purple-400 animate-pulse">
                                    {/* Skeleton header */}
                                    <div className="flex justify-between items-start">
                                        <div className="h-5 w-32 bg-gray-700 rounded-md" />
                                        <div className="h-5 w-5 bg-gray-700 rounded-full" />
                                    </div>

                                    {/* Skeleton company badge */}
                                    <div className="h-4 w-24 bg-purple-900/40 rounded-md self-start mt-2 mb-2" />

                                    {/* Skeleton date range badge */}
                                    <div className="h-4 w-32 bg-purple-900/40 rounded-md self-start mb-2" />

                                    {/* Skeleton summary */}
                                    <div className="h-3 w-full bg-gray-700 rounded-md mt-1" />
                                    <div className="h-3 w-5/6 bg-gray-700 rounded-md mt-1" />
                                    <div className="h-3 w-4/5 bg-gray-700 rounded-md mt-1" />

                                    {/* Skeleton action buttons */}
                                    <div className="flex gap-2 mt-auto">
                                        <div className="h-5 w-14 bg-gray-700 rounded-md" />
                                        <div className="h-5 w-16 bg-gray-700 rounded-md" />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))
                    ) : (
                        <>
                            {profile?.experiences.map(experience => (
                                <CarouselItem key={experience.id} className="h-52">
                                    <div className="h-full p-4 border rounded-xl flex flex-col m-1 bg-gradient-to-b from-purple-950/30 to-black/40 border-purple-400 shadow-md shadow-purple-500/20 relative group">
                                        {/* Header with role and options */}
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-md font-medium text-purple-300 mb-1">
                                                {experience.role}
                                            </h4>
                                            <div className="bg-purple-900/60 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 text-purple-300"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Company badge */}
                                        <div className="text-xs text-purple-200/80 bg-purple-900/40 inline-flex items-center px-2 py-0.5 rounded-md self-start mb-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3 mr-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {experience.company}
                                        </div>

                                        {/* Date range badge */}
                                        <div className="text-xs text-purple-200/80 bg-purple-900/40 inline-flex items-center px-2 py-0.5 rounded-md self-start mb-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3 mr-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {experience.startDate
                                                ? new Date(experience.startDate).toLocaleDateString()
                                                : "N/A"}
                                            {experience.endDate
                                                ? ` - ${new Date(experience.endDate).toLocaleDateString()}`
                                                : " - Present"}
                                        </div>

                                        {/* Summary */}
                                        <p className="text-xs text-gray-300 line-clamp-3 mt-1">
                                            {experience.summary || "No summary available for this experience."}
                                        </p>

                                        {/* Action buttons */}
                                        <div className="flex gap-2 mt-auto">
                                            <button className="text-xs flex items-center justify-center gap-1 bg-purple-900/60 hover:bg-purple-800/70 text-purple-300 py-1 px-2 rounded-md transition-colors duration-200">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-3 w-3"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                                Edit
                                            </button>
                                            <button className="text-xs flex items-center justify-center gap-1 bg-purple-900/60 hover:bg-purple-800/70 text-purple-300 py-1 px-2 rounded-md transition-colors duration-200">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-3 w-3"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                            {profile?.experiences.length === 0 && (
                                <CarouselItem className="h-52">
                                    <div className="h-full p-4 border rounded-xl flex flex-col items-center justify-center m-1 bg-black/40 border-purple-400 border-dashed cursor-pointer hover:bg-purple-800/20 transition-colors duration-200 shadow-inner shadow-purple-500/5 group">
                                        <div className="text-6xl font-medium text-center text-purple-300 opacity-70 group-hover:scale-110 transition-transform duration-200">
                                            +
                                        </div>
                                        <p className="text-sm text-center mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                            Add your first experience
                                        </p>
                                        <button className="mt-3 bg-purple-900/60 text-purple-300 text-xs py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-800/70 flex items-center gap-1">
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
            </Carousel>
        </div>
    );
}
