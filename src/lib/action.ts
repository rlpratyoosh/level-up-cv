"use server";

import { db } from "./prisma-db";
import { Profile } from "@/types";


export async function getProfile(profileId: string): Promise<Profile | null> {
  const response = await db.profile.get(profileId);
  if (!response) {
    throw new Error("Failed to fetch profile");
  }
  return response;
}