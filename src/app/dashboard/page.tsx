"use client";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {

  const {user, loading, signOut} = useAuth("/login");

  const onClick = async () => {
    await signOut();
  };

  if(user) return (
    <>
        <h1>Dashboard</h1>
        <p>Welcome, {user.email}!</p>
        <button onClick={onClick} className="bg-red-500 text-white p-2 rounded">
          Sign Out
        </button>
    </>
  )

  if(loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Unauthorized</h1>
    </div>
  );
}
