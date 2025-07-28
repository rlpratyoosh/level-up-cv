"use client";
import { useAuth } from "@/hooks/useAuth";
import type { Profile } from "@/types";

export default function DashboardPage() {

  const {user, loading, signOut} = useAuth("/login");
  

  const onClick = async () => {
    await signOut();
  };

  if(user) return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="p-4 flex gap-4">

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
