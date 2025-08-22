import { prisma } from "@/lib/prisma";
import { db } from "@/lib/prisma-db";


const resetUser = async () => {
    
    const args = process.argv.slice(2); 
    const userId = args[0];

    console.log(userId);

    const profile = await db.profile.findUnique({ userId });

    if (!profile) {
        throw new Error("Profile not found");
    }

    await prisma.profile.update({
        where: { userId },
        data: {
            currentXpInLevel: 0,
            totalXp: 0,
            level: 1,
            hasLevelledUp: false,
        },
    });

    await prisma.skill.deleteMany({
        where: { profileId: profile.id },
    });

    await prisma.project.deleteMany({
        where: { profileId: profile.id },
    });

    console.log("User reset successfully");
};

resetUser();