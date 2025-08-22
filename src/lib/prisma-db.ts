import { includes } from "zod";
import { prisma } from "./prisma";

export const db = {
    user: {
        create: async (data: { userName: string; email: string; password: string }) => prisma.user.create({ data }),
        findUnique: async (where: { id?: string; email?: string; userName?: string }) => {
            if (where.email) {
                return prisma.user.findUnique({ where: { email: where.email } });
            }
            if (where.userName) {
                return prisma.user.findUnique({ where: { userName: where.userName } });
            }
            if (where.id) {
                return prisma.user.findUnique({ where: { id: where.id } });
            }
            throw new Error("Either email, userName or id must be provided for findUnique");
        },
        update: async (
            where: { id: string },
            data: { userName?: string; email?: string; password?: string; isVerified?: boolean }
        ) => {
            return prisma.user.update({ where, data });
        },
    },
    verificationToken: {
        create: async (data: { token: string; userId: string; expires: Date }) =>
            prisma.verificationToken.create({ data }),
        findUnique: async (where: { token: string }) => prisma.verificationToken.findUnique({ where }),
        delete: async (where: { id: string }) => prisma.verificationToken.delete({ where }),
    },
    profile: {
        create: async (data: { userId: string; fullName?: string }) => prisma.profile.create({ data }),
        findUnique: async (where: { userId: string }) =>
            prisma.profile.findUnique({
                where,
                include: { achievements: true, skills: true, experiences: true, certifications: true },
            }),
        findUniqueWithProfileId: async (where: { id: string }) =>
            prisma.profile.findUnique({
                where,
            }),
        update: async (
            where: { id: string },
            data: {
                fullName?: string;
                currentXpInLevel?: number;
                totalXp?: number;
                level?: number;
                hasLevelledUp?: boolean;
            }
        ) => prisma.profile.update({ where, data }),
    },
    achievements: {
        findAll: async () => prisma.achievement.findMany(),
    },
    skills: {
        create: async (data: { profileId: string; name: string }) => prisma.skill.create({ data }),
        findMany: async (where: { profileId: string }) => prisma.skill.findMany({ where }),
        findWithName: async (where: { profileId: string; name: string }) => prisma.skill.findFirst({ where }),
    },
    projects: {
        create: async (data: {
            title: string;
            description?: string;
            link?: string;
            profileId: string;
            startDate?: Date;
            endDate?: Date;
        }) => prisma.project.create({ data }),
        findMany: async (where: { profileId: string }) => prisma.project.findMany({ where, include: { skills: true } }),
        findWithName: async (where: { profileId: string; title: string }) => prisma.project.findFirst({ where }),
    },
    project_skills: {
        create: async (data: { projectId: string; skillId: string }) => prisma.projectSkills.create({ data }),
    }
};
