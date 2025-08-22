"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Profile, Project } from "@/generated/prisma/client";
import { FaChalkboardUser } from "react-icons/fa6";
import ProjectsDialog from "./ProjectDialog";

interface ProjectsProps {
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
    projects: (Project & {
        skills: {
            id: string;
            projectId: string;
            skillId: string;
        }[];
    })[];
    projectsLoading: boolean | null;
    onAdded: () => Promise<void>;
}

export default function Projects({ profile, projects, projectsLoading, onAdded }: ProjectsProps) {
    return (
        <div className="flex-1 p-7 flex flex-col gap-4 rounded-2xl items-center justify-start bg-black/20 backdrop-blur-sm border border-indigo-500/30 shadow-lg shadow-indigo-500/10">
            <div className="flex items-center justify-between w-full">
                <div className="text-lg font-semibold flex items-center justify-center gap-3">
                    {" "}
                    <FaChalkboardUser className="text-3xl text-indigo-500" /> Projects
                </div>
                <div className="flex items-center justify-center gap-2">
                    <ProjectsDialog profileId={profile?.id as string} onAdded={onAdded} />
                    <span>{projectsLoading ? "--" : projects.length || 0}</span>
                </div>
            </div>
            <Carousel orientation="vertical" className="w-full">
                <CarouselContent className="h-full">
                    {projectsLoading ? (
                        Array.from({ length: 2 }).map((_, i) => (
                            <CarouselItem key={i} className="h-52">
                                <div className="h-full p-4 border rounded-xl flex flex-col m-1 border-indigo-400 animate-pulse">
                                    {/* Skeleton header */}
                                    <div className="flex justify-between items-start">
                                        <div className="h-5 w-40 bg-gray-700 rounded-md" />
                                        <div className="h-5 w-5 bg-gray-700 rounded-full" />
                                    </div>

                                    {/* Skeleton date badge */}
                                    <div className="h-4 w-32 bg-indigo-900/40 rounded-md self-start mt-2 mb-2" />

                                    {/* Skeleton description */}
                                    <div className="h-3 w-full bg-gray-700 rounded-md mt-1" />
                                    <div className="h-3 w-4/5 bg-gray-700 rounded-md mt-1" />

                                    {/* Skeleton skills tags */}
                                    <div className="flex flex-wrap gap-1 mt-auto mb-2">
                                        <div className="h-4 w-16 bg-indigo-900/40 rounded-full" />
                                        <div className="h-4 w-20 bg-indigo-900/40 rounded-full" />
                                        <div className="h-4 w-14 bg-indigo-900/40 rounded-full" />
                                    </div>

                                    {/* Skeleton action buttons */}
                                    <div className="flex gap-2 mt-auto">
                                        <div className="h-5 w-24 bg-gray-700 rounded-md" />
                                        <div className="h-5 w-16 bg-gray-700 rounded-md" />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))
                    ) : (
                        <>
                            {projects.map(project => (
                                <CarouselItem key={project.id} className="h-52">
                                    <div className="h-full p-4 border rounded-xl flex flex-col m-1 bg-gradient-to-b from-indigo-950/30 to-black/40 border-indigo-400 shadow-md shadow-indigo-500/20 relative group">
                                        {/* Header with title */}
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-md font-medium text-indigo-300 mb-1">
                                                {project.title}
                                            </h4>
                                            <div className="bg-indigo-900/60 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 text-indigo-300"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Project dates badge */}
                                        <div className="text-xs text-indigo-200/80 bg-indigo-900/40 inline-flex items-center px-2 py-0.5 rounded-md self-start mb-2">
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
                                            {project.startDate
                                                ? new Date(project.startDate).toLocaleDateString()
                                                : "N/A"}
                                            {project.endDate
                                                ? ` - ${new Date(project.endDate).toLocaleDateString()}`
                                                : " - Present"}
                                        </div>

                                        {/* Description */}
                                        <p className="text-xs text-gray-300 line-clamp-2 mb-2 mt-1">
                                            {project.description || "No description available for this project."}
                                        </p>

                                        {/* Skills tags */}
                                        {project.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-auto mb-2">
                                                {project.skills.map(ps => {
                                                    const matchingSkill = profile?.skills?.find(
                                                        skill => skill.id === ps.skillId
                                                    );
                                                    return matchingSkill ? (
                                                        <span
                                                            key={ps.id}
                                                            className="px-2 py-0.5 text-xs bg-indigo-900/60 text-indigo-300 rounded-full border border-indigo-700/50"
                                                        >
                                                            {matchingSkill.name}
                                                        </span>
                                                    ) : null;
                                                })}
                                            </div>
                                        )}

                                        {/* Action buttons */}
                                        <div className="flex gap-2 mt-auto">
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs flex items-center justify-center gap-1 bg-indigo-900/60 hover:bg-indigo-800/70 text-indigo-300 py-1 px-2 rounded-md transition-colors duration-200"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-3 w-3"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                                    </svg>
                                                    View Project
                                                </a>
                                            )}
                                            <button className="text-xs flex items-center justify-center gap-1 bg-indigo-900/60 hover:bg-indigo-800/70 text-indigo-300 py-1 px-2 rounded-md transition-colors duration-200">
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
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                            {projects.length === 0 && (
                                <CarouselItem className="h-52">
                                    <div className="h-full p-4 border rounded-xl flex flex-col items-center justify-center m-1 bg-black/40 border-indigo-400 border-dashed cursor-pointer hover:bg-indigo-800/20 transition-colors duration-200 shadow-inner shadow-indigo-500/5 group">
                                        <div className="text-6xl font-medium text-center text-indigo-300 opacity-70 group-hover:scale-110 transition-transform">
                                            +
                                        </div>
                                        <p className="text-sm text-center mt-2 opacity-70 group-hover:text-indigo-300 transition-colors">
                                            Add your first project
                                        </p>
                                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 mt-3">
                                            <button className="bg-indigo-900/60 text-indigo-300 text-xs py-1 px-3 rounded-md hover:bg-indigo-800/70 flex items-center gap-1">
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
