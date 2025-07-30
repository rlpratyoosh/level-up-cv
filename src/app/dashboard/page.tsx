"use client";
import { useAuth } from "@/hooks/useAuth";
import type { Profile } from "@/types";
import { getProfile } from "@/lib/action";
import { useEffect, useState } from "react";
import pfp from "@/assets/pfp.png";
import { CiTrophy } from "react-icons/ci";
import { PiLightningBold } from "react-icons/pi";

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth("/login");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const profileData = await getProfile(user.id);
          setProfile(profileData);
        } catch (error) {
          setError("Failed to fetch profile");
        }
      }
    };
    fetchProfile();
  }, [user]);

  const onClick = async () => {
    await signOut();
  };

  if (user)
    return (
      <div className="flex flex-col items-center justify-start h-screen">
        <div className="p-7 flex gap-4 w-98/100 border-2 rounded-2xl mt-5 items-center justify-start bg-card">
          {profile?.avatarurl ? (
            <img
              src={profile.avatarurl}
              alt="Profile Avatar"
              className="w-20 rounded-full"
            />
          ) : (
            <img
              src={pfp.src}
              alt="Default Profile"
              className="w-20 rounded-full"
            />
          )}
          <div className="flex flex-col items-start justify-center">
            <div className="flex items-center justify-start gap-4">
              <h2 className="text-lg font-semibold">
                {profile?.fullname || "Unknown User"}
              </h2>
              <div className="rounded-lg bg-amber-300 pl-2 pr-3 text-black text-sm flex items-center justify-center gap-1 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                <CiTrophy className="text-lg" /> Level{" "}
                {profile?.level || "No Level Found"}
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {profile?.title || "No Title Set"}
            </p>
          </div>
            <div className="flex-1 ml-4">
            <div className="flex items-center justify-between gap-2 text-lg w-full">
              <div className="text-lime-300 flex items-center gap-2">
              <PiLightningBold className="text-xl" />
              <span className="text-[var(--foreground)] font-bold text-base">
                Experience Points
              </span>
              </div>
              <span className="text-sm opacity-80">{profile?.totalxp ? profile?.totalxp % 200 : 0} / 200 XP</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full mt-2 overflow-hidden">
              <div 
              className="h-full bg-lime-400 rounded-full transition-all duration-300"
              style={{ width: `${profile?.totalxp ? ((profile.totalxp % 200) / 200) * 100 : 0}%` }}
              />
            </div>
            <div className="text-sm opacity-70 mt-1">
              {profile?.totalxp ? 200 - (profile?.totalxp % 200) : 200} XP until next level
            </div>
            </div>
        </div>
        <div className=""></div>
      </div>
    );

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Unauthorized</h1>
    </div>
  );
}
