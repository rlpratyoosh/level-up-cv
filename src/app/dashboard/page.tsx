"use client";
import { useAuth } from "@/hooks/useAuth";
import type { Profile } from "@/types";
import { getProfile } from "@/lib/action";
import { useEffect, useState } from "react";

export default function DashboardPage() {

  const {user, loading, signOut} = useAuth("/login");
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

  if(user) return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="p-4 flex gap-4">
            {profile?.fullname}
        </div>
    </div>
  )

  if(loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Unauthorized</h1>
    </div>
  );
}
