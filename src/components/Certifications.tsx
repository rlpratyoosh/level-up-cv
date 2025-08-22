"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Profile } from "@/generated/prisma/client";
import { MdSchool } from "react-icons/md";

interface CertificationsProps {
    profile:
        | (Profile & {
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
          })
        | null;
}

export default function Certifications({ profile }: CertificationsProps) {
    return (
        <div className="flex-1 p-7 flex flex-col gap-4 rounded-2xl items-center justify-start bg-black/20 backdrop-blur-sm border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <div className="flex items-center justify-between w-full">
                <div className="text-lg font-semibold flex items-center justify-center gap-2"> <MdSchool className="text-3xl text-cyan-500"/> Certifications</div>
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
                            <div className="h-full p-4 border rounded-xl flex flex-col m-1 bg-gradient-to-b from-cyan-950/30 to-black/40 border-cyan-400 shadow-md shadow-cyan-500/20 relative group">
                                {/* Header with title and options */}
                                <div className="flex justify-between items-start">
                                    <h4 className="text-md font-medium text-cyan-300 mb-1">{certification.title}</h4>
                                    <div className="bg-cyan-900/60 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-cyan-300"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Issuer badge */}
                                <div className="text-xs text-cyan-200/80 bg-cyan-900/40 inline-flex items-center px-2 py-0.5 rounded-md self-start mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3 mr-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                    </svg>
                                    {certification.issuer || "No issuer"}
                                </div>

                                {/* Description (if needed) */}
                                <p className="text-xs text-gray-300 line-clamp-3 mt-1">
                                    {certification.issuer
                                        ? `Issued by ${certification.issuer}`
                                        : "No issuer information available."}
                                </p>

                                {/* Dates section */}
                                <div className="text-xs text-cyan-200/80 mt-auto mb-2">
                                    {certification.issueDate && (
                                        <div className="bg-cyan-900/40 inline-flex items-center px-2 py-0.5 rounded-md mr-2 mb-1">
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
                                            Issued: {new Date(certification.issueDate).toLocaleDateString()}
                                        </div>
                                    )}
                                    {certification.expirationDate && (
                                        <div className="bg-cyan-900/40 inline-flex items-center px-2 py-0.5 rounded-md mb-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3 mr-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Expires: {new Date(certification.expirationDate).toLocaleDateString()}
                                        </div>
                                    )}
                                    {!certification.issueDate && !certification.expirationDate && (
                                        <div className="bg-cyan-900/40 inline-flex items-center px-2 py-0.5 rounded-md mb-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3 mr-1"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            No dates provided
                                        </div>
                                    )}
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-2">
                                    <button className="text-xs flex items-center justify-center gap-1 bg-cyan-900/60 hover:bg-cyan-800/70 text-cyan-300 py-1 px-2 rounded-md transition-colors duration-200">
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
                                    <button className="text-xs flex items-center justify-center gap-1 bg-cyan-900/60 hover:bg-cyan-800/70 text-cyan-300 py-1 px-2 rounded-md transition-colors duration-200">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        View
                                    </button>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                    {profile?.certifications.length === 0 && (
                        <CarouselItem className="h-52">
                            <div className="h-full p-4 border rounded-xl flex flex-col items-center justify-center m-1 bg-black/40 border-cyan-400 border-dashed cursor-pointer hover:bg-cyan-800/20 transition-all duration-200 shadow-inner shadow-cyan-500/5 group">
                                <div className="text-6xl font-medium text-center text-cyan-300 opacity-70 group-hover:scale-110 transition-transform duration-200">
                                    +
                                </div>
                                <p className="text-sm text-center mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                    Add your first certification
                                </p>
                                <button className="mt-3 bg-cyan-900/60 text-cyan-300 text-xs py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-cyan-800/70 flex items-center gap-1">
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
                </CarouselContent>
            </Carousel>
        </div>
    );
}
