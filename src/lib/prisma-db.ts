import { includes } from "zod";
import { prisma } from "./prisma";

export const db = {
    user: {
        create: async (data: { userName: string; email: string; password: string }) => prisma.user.create({ data }),
        findUnique: async (where : {id?:string, email?: string; userName?: string }) => {
            if(where.email){
                return prisma.user.findUnique({ where: { email: where.email } });
            }
            if(where.userName){
                return prisma.user.findUnique({ where: { userName: where.userName } });
            }
            if(where.id){
                return prisma.user.findUnique({ where: { id: where.id } });
            }
            throw new Error("Either email, userName or id must be provided for findUnique");
        },
        update: async (where: { id: string }, data: { userName?: string; email?: string; password?: string, isVerified?: boolean }) => {
            return prisma.user.update({ where, data });
        }
    },
    verificationToken: {
        create: async (data: {token: string; userId: string, expires: Date}) => prisma.verificationToken.create({ data }),
        findUnique: async (where: { token: string }) => prisma.verificationToken.findUnique({ where }),
        delete: async (where: { id: string }) => prisma.verificationToken.delete({ where })
    },
    profile: {
        create: async(data: { userId: string, fullName?: string }) => prisma.profile.create({ data }),
        findUnique: async (where: { userId: string }) => prisma.profile.findUnique({ where, include: { achievements: true, skills: true, projects: true, experiences: true, certifications: true } }),
    },
    achievements: {
        findAll: async () => prisma.achievement.findMany()
    },
    
};

