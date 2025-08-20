"use client";
import { findFullDetail } from "@/lib/action";
import { User } from "@/generated/prisma";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useAuth() {
    const { data: session, status } = useSession();
    const [userDetails, setUserDetails] = useState<User | null>(null);
    const loading = status === "loading";
    const user = session?.user || null;

    const signUserOut = () => signOut({ callbackUrl: "/login" });

    useEffect(() => {
      const fetchUserDetails = async () => {
        if (user && user.id) {
          try {
            const details = await findFullDetail(user.id as string);
            setUserDetails(details);
          } catch (error) {
            if (error instanceof Error && error.message.includes("User not found")) {
              signUserOut();
            }
            console.error("Error fetching user details:", error);
          }
        }
      };
      fetchUserDetails();
    }, [user]);

    

    return { user: userDetails, loading, signUserOut };
}
