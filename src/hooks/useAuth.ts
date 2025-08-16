"use client";
import { findFullDetail } from "@/lib/action";
import { User } from "@/types";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useAuth() {
    const { data: session, status } = useSession();
    const [userDetails, setUserDetails] = useState<User | null>(null);
    const loading = status === "loading";
    const user = session?.user || null;

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (user && user.id) {
                const details = await findFullDetail(user.id as string);
                setUserDetails(details);
            }
        };
        fetchUserDetails();
    }, [user]);

    const signUserOut = () => signOut({ callbackUrl: "/login" });

    return { user: userDetails, loading, signUserOut };
}
