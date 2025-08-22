"use client";

import type { Achievement, Profile } from "@/generated/prisma";
import { Project } from "@/generated/prisma";
import { useAuth } from "@/hooks/useAuth";
import { changeLevelUpState, findProfile, getAllAchievements, getAllProjects } from "@/lib/action";
import { useEffect, useRef, useState } from "react";

// Component imports
import Achievements from "@/components/Achievements";
import AnimatedBackground from "@/components/AnimatedBackground";
import Certifications from "@/components/Certifications";
import Experiences from "@/components/Experiences";
import LevelUpNotification from "@/components/LevelUpNotification";
import ProfileHeader from "@/components/ProfileHeader";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

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

type userProjects = {
    skills: {
        id: string;
        projectId: string;
        skillId: string;
    }[];
} & Project;

export default function DashboardPage() {
    const { user, loading, signUserOut } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<ProfileDetails | null>(null);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [projects, setProjects] = useState<userProjects[]>([]);
    const [profileFetched, setProfileFetched] = useState(false);
    const [achievementsFetched, setAchievementsFetched] = useState(false);
    const [showLevelUp, setShowLevelUp] = useState(false);
    const levelUpHandledRef = useRef(false);

    const fetchProfile = async () => {
        if (!user) return;
        try {
            const profileData = await findProfile(user.id);
            setProfile(profileData);

            if (profileData.hasLevelledUp && !levelUpHandledRef.current) {
                setShowLevelUp(true);
                levelUpHandledRef.current = true;
            }

            if (profileData) {
                const userProjects = await getAllProjects(profileData.id);
                setProjects(userProjects);
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
        if (profile?.hasLevelledUp) {
            setShowLevelUp(true);

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

    const onAdded = async () => {
        setProfileFetched(false);
        levelUpHandledRef.current = false;
        await fetchProfile();
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    const profileLoading = user && !profileFetched;
    const achievementsLoading = !achievementsFetched;

    if (user) {
        return (
            <div className="flex flex-col items-center justify-start min-h-screen relative overflow-hidden">
                {/* Level Up Notification */}
                <LevelUpNotification
                    showLevelUp={showLevelUp}
                    setShowLevelUp={setShowLevelUp}
                    level={profile?.level || 1}
                    profileId={profile?.id}
                    onLevelUpHandled={() => (levelUpHandledRef.current = false)}
                />

                {/* Animated Background */}
                <AnimatedBackground />

                {/* Foreground content */}
                <div className="relative z-10 w-full flex flex-col items-center">
                    {/* Profile Header */}
                    <ProfileHeader profile={profile} profileLoading={profileLoading} experiencesLength={profile?.experiences.length as number} certificationsLength={profile?.certifications.length as number}/>

                    {/* Skills */}
                    <Skills profile={profile} profileLoading={profileLoading as boolean} onAdded={onAdded} />

                    {/* Project, Internship and Certifications */}
                    <div className="flex flex-row gap-4 w-98/100 mt-5">
                        {/* Projects */}
                        <Projects profile={profile} projects={projects} onAdded={onAdded} />

                        {/* Experiences */}
                        <Experiences profile={profile} />

                        {/* Certifications */}
                        <Certifications profile={profile} />
                    </div>
                </div>
                <div className="mt-10"></div>
            </div>
        );
    }

    return null;
}
