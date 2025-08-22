"use client";

import pfp from "@/assets/pfp.png";
import { Profile } from "@/generated/prisma/client";
import { CiTrophy } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdSchool, MdWork } from "react-icons/md";
import { PiLightningBold } from "react-icons/pi";

interface ProfileHeaderProps {
    profile: Profile | null;
    profileLoading: boolean | null;
    experiencesLength: number;
    certificationsLength: number;
}

export default function ProfileHeader({
    profile,
    profileLoading,
    experiencesLength,
    certificationsLength,
}: ProfileHeaderProps) {
    return (
        <div className="relative p-8 md:p-10 flex flex-col lg:flex-row gap-6 w-98/100 rounded-3xl mt-5  bg-black/20 backdrop-blur-sm border border-indigo-500/40  overflow-hidden transition-all duration-300 hover:shadow-indigo-500/30">
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl"></div>

            {/* Left section: Avatar and Name */}
            <div className="flex flex-col items-center lg:items-start">
                <div className="relative group">
                    {profileLoading ? (
                        <div className="w-28 h-28 rounded-2xl bg-gray-700 animate-pulse" />
                    ) : profile?.avatarUrl ? (
                        <div className="relative">
                            <img
                                src={profile.avatarUrl}
                                alt="Profile Avatar"
                                className="w-28 h-28 rounded-full object-cover border-2 border-indigo-500/50 shadow-lg shadow-indigo-500/30 transition-all duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 flex items-center justify-center">
                                <FaRegEdit className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    ) : (
                        <div className="relative">
                            <img
                                src={pfp.src}
                                alt="Default Profile"
                                className="w-28 h-28 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-lg shadow-indigo-500/30 transition-all duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 flex items-center justify-center">
                                <FaRegEdit className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    )}
                </div>

                <div
                    className={`mt-4 flex flex-col items-center lg:items-start ${
                        profileLoading ? "animate-pulse" : ""
                    }`}
                >
                    <div className="flex items-center gap-3 mb-2">
                        {profileLoading ? (
                            <div className="h-6 w-40 bg-gray-700 rounded-md" />
                        ) : (
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                                {profile?.fullName || "Unknown User"}
                            </h2>
                        )}
                        {profileLoading ? (
                            <div className="h-6 w-24 bg-amber-300/40 rounded-md" />
                        ) : (
                            <div className="rounded-lg bg-gradient-to-r from-amber-300 to-amber-500 pl-2 pr-3 py-1 text-black text-sm font-semibold flex items-center justify-center gap-1 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-300 hover:scale-105">
                                <CiTrophy className="text-lg" /> Level {profile?.level || "1"}
                            </div>
                        )}
                    </div>
                    {profileLoading ? (
                        <div className="h-5 w-32 bg-gray-700 rounded-md mt-2" />
                    ) : (
                        <p className="text-base text-indigo-100/80 font-medium mb-2">
                            {profile?.title || "No Title Set"}
                        </p>
                    )}

                    {/* Bio section */}
                    {!profileLoading && (
                        <p className="text-sm text-gray-300/80 max-w-xs mt-1">
                            {profile?.bio || "Add a bio to tell people about yourself..."}
                        </p>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-2 mt-4">
                        <button className="flex items-center gap-1 text-xs text-white bg-primary/80 hover:bg-primary transition-colors duration-300 rounded-full px-3 py-1.5">
                            <FaRegEdit className="text-sm" /> Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Middle section: Stats */}
            <div className="flex flex-col flex-1 lg:ml-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-indigo-500/20 transition-all duration-300 hover:border-indigo-500/40">
                        <div className="flex items-center gap-2 mb-2">
                            <MdWork className="text-indigo-400 text-xl" />
                            <span className="text-sm font-medium text-gray-300">Experiences</span>
                        </div>
                        {profileLoading ? (
                            <div className="h-5 w-40 bg-gray-700 rounded-md animate-pulse" />
                        ) : (
                            <div className="text-lg font-bold text-white">
                                {experiencesLength || "No"} {experiencesLength === 1 ? "Experience" : "Experiences"}
                            </div>
                        )}
                    </div>

                    <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-indigo-500/20 transition-all duration-300 hover:border-indigo-500/40">
                        <div className="flex items-center gap-2 mb-2">
                            <MdSchool className="text-indigo-400 text-xl" />
                            <span className="text-sm font-medium text-gray-300">Certifications</span>
                        </div>
                        {profileLoading ? (
                            <div className="h-5 w-40 bg-gray-700 rounded-md animate-pulse" />
                        ) : (
                            <div className="text-lg font-bold text-white">
                                {certificationsLength || "No"}{" "}
                                {certificationsLength === 1 ? "Certification" : "Certifications"}
                            </div>
                        )}
                    </div>

                    <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-indigo-500/20 transition-all duration-300 hover:border-indigo-500/40">
                        <div className="flex items-center gap-2 mb-2">
                            <CiTrophy className="text-amber-400 text-xl" />
                            <span className="text-sm font-medium text-gray-300">Total XP</span>
                        </div>
                        {profileLoading ? (
                            <div className="h-5 w-20 bg-gray-700 rounded-md animate-pulse" />
                        ) : (
                            <div className="text-lg font-bold text-white">{profile?.totalXp || "0"} Points</div>
                        )}
                    </div>
                </div>

                {/* XP Progress Bar Section */}
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-5 border border-indigo-500/20 transition-all duration-300 hover:border-indigo-500/40">
                    <div className="flex items-center justify-between gap-2 text-lg w-full mb-3">
                        <div className="flex items-center gap-2">
                            <div className="bg-lime-400/20 p-1.5 rounded-full">
                                <PiLightningBold className="text-lime-400 text-xl" />
                            </div>
                            <span className="text-white font-bold text-base">XP Progress</span>
                        </div>
                        {profileLoading ? (
                            <div className="h-4 w-20 bg-gray-700 rounded-md animate-pulse" />
                        ) : (
                            <span className="text-sm text-gray-300 bg-black/30 px-2 py-1 rounded-md">
                                {profile && profile?.currentXpInLevel} / {profile && profile?.level * 50} XP
                            </span>
                        )}
                    </div>
                    <div
                        className={`w-full h-3 bg-gray-800 rounded-full mt-2 overflow-hidden ${
                            profileLoading ? "animate-pulse" : ""
                        }`}
                    >
                        {!profileLoading && (
                            <div
                                className="h-full bg-gradient-to-r from-lime-400 to-lime-500 rounded-full transition-all duration-700 relative"
                                style={{
                                    width: `${profile && (profile?.currentXpInLevel / (profile?.level * 50)) * 100}%`,
                                }}
                            >
                                <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse rounded-full"></div>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                        {profileLoading ? (
                            <div className="h-4 w-36 bg-gray-700 rounded-md animate-pulse" />
                        ) : (
                            <>
                                <span className="text-gray-400">
                                    {profile && profile?.level * 50 - profile?.currentXpInLevel} XP until next level
                                </span>
                                <span className="text-lime-400/80">
                                    {profile && Math.round((profile?.currentXpInLevel / (profile?.level * 50)) * 100)}%
                                    Complete
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
