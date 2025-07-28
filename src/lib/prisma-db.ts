import { prisma } from "./prisma";
import type { 
  Profile,
  ProfileUpdate,
  SkillUpdate,
  ResumeUpdate,
  ProjectUpdate,
  ExperienceUpdate,
  EducationUpdate,
  CertificationUpdate,
  ActivityType
} from "@/types";
import type { JsonValue, InputJsonValue } from "@prisma/client/runtime/library";

const profile = {
  async get(userId: string): Promise<Profile | null> {
    return await prisma.profile.findUnique({
      where: { id: userId },
      include: {
        resumes: true,
        skills: true,
        projects: true,
        experiences: true,
        educations: true,
        certifications: true,
        achievements: {
          include: {
            achievement: true,
          },
        },
        activities: true,
      },
    });
  },

  async update(
    userId: string,
    data: ProfileUpdate
  ): Promise<Profile> {
    return await prisma.profile.update({
      where: { id: userId },
      data,
      include: {
        resumes: true,
        skills: true,
        projects: true,
        experiences: true,
        educations: true,
        certifications: true,
        achievements: {
          include: {
            achievement: true,
          },
        },
        activities: true,
      },
    });
  },
};

// Skill-related database operations
const skill = {
  async create(profileId: string, name: string, title?: string) {
    return await prisma.skill.create({
      data: {
        profileid: profileId,
        name,
        title,
      },
    });
  },

  async getAll(profileId: string) {
    return await prisma.skill.findMany({
      where: { profileid: profileId },
    });
  },

  async update(skillId: string, data: SkillUpdate) {
    return await prisma.skill.update({
      where: { id: skillId },
      data,
    });
  },

  async delete(skillId: string) {
    return await prisma.skill.delete({
      where: { id: skillId },
    });
  },
};

// Resume-related database operations
const resume = {
  async create(profileId: string, title: string, includedIds?: InputJsonValue) {
    return await prisma.resume.create({
      data: {
        profileid: profileId,
        title,
        includedids: includedIds,
      },
    });
  },

  async getAll(profileId: string) {
    return await prisma.resume.findMany({
      where: { profileid: profileId },
    });
  },

  async getById(resumeId: string) {
    return await prisma.resume.findUnique({
      where: { id: resumeId },
    });
  },

  async update(resumeId: string, data: ResumeUpdate) {
    return await prisma.resume.update({
      where: { id: resumeId },
      data,
    });
  },

  async delete(resumeId: string) {
    return await prisma.resume.delete({
      where: { id: resumeId },
    });
  },
};

// Project-related database operations
const project = {
  async create(
    profileId: string, 
    title: string, 
    description?: string, 
    link?: string, 
    startDate?: Date, 
    endDate?: Date
  ) {
    return await prisma.project.create({
      data: {
        profileid: profileId,
        title,
        description,
        link,
        startdate: startDate,
        enddate: endDate,
      },
    });
  },

  async getAll(profileId: string) {
    return await prisma.project.findMany({
      where: { profileid: profileId },
      include: {
        skills: true,
      },
    });
  },

  async getById(projectId: string) {
    return await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        skills: true,
      },
    });
  },

  async update(
    projectId: string, 
    data: ProjectUpdate
  ) {
    return await prisma.project.update({
      where: { id: projectId },
      data,
    });
  },

  async delete(projectId: string) {
    return await prisma.project.delete({
      where: { id: projectId },
    });
  },

  async addSkill(projectId: string, skillId: string) {
    return await prisma.projectskills.create({
      data: {
        projectid: projectId,
        skillid: skillId,
      },
    });
  },

  async removeSkill(projectId: string, skillId: string) {
    return await prisma.projectskills.deleteMany({
      where: {
        projectid: projectId,
        skillid: skillId,
      },
    });
  },
};

// Experience-related database operations
const experience = {
  async create(
    profileId: string,
    role: string,
    company: string,
    summary?: string,
    startDate?: Date,
    endDate?: Date
  ) {
    return await prisma.experience.create({
      data: {
        profileid: profileId,
        role,
        company,
        summary,
        startdate: startDate,
        enddate: endDate,
      },
    });
  },

  async getAll(profileId: string) {
    return await prisma.experience.findMany({
      where: { profileid: profileId },
      include: {
        skills: true,
      },
    });
  },

  async getById(experienceId: string) {
    return await prisma.experience.findUnique({
      where: { id: experienceId },
      include: {
        skills: true,
      },
    });
  },

  async update(
    experienceId: string,
    data: ExperienceUpdate
  ) {
    return await prisma.experience.update({
      where: { id: experienceId },
      data,
    });
  },

  async delete(experienceId: string) {
    return await prisma.experience.delete({
      where: { id: experienceId },
    });
  },

  async addSkill(experienceId: string, skillId: string) {
    return await prisma.experienceskills.create({
      data: {
        experienceid: experienceId,
        skillid: skillId,
      },
    });
  },

  async removeSkill(experienceId: string, skillId: string) {
    return await prisma.experienceskills.deleteMany({
      where: {
        experienceid: experienceId,
        skillid: skillId,
      },
    });
  },
};

// Education-related database operations
const education = {
  async create(
    profileId: string,
    institution: string,
    degree: string,
    startDate?: Date,
    endDate?: Date
  ) {
    return await prisma.education.create({
      data: {
        profileid: profileId,
        institution,
        degree,
        startdate: startDate,
        enddate: endDate,
      },
    });
  },

  async getAll(profileId: string) {
    return await prisma.education.findMany({
      where: { profileid: profileId },
    });
  },

  async getById(educationId: string) {
    return await prisma.education.findUnique({
      where: { id: educationId },
    });
  },

  async update(
    educationId: string,
    data: EducationUpdate
  ) {
    return await prisma.education.update({
      where: { id: educationId },
      data,
    });
  },

  async delete(educationId: string) {
    return await prisma.education.delete({
      where: { id: educationId },
    });
  },
};

// Certification-related database operations
const certification = {
  async create(
    profileId: string,
    title: string,
    issuer: string,
    issueDate?: Date,
    expirationDate?: Date,
    link?: string
  ) {
    return await prisma.certification.create({
      data: {
        profileid: profileId,
        title,
        issuer,
        issuedate: issueDate,
        expirationdate: expirationDate,
        link,
      },
    });
  },

  async getAll(profileId: string) {
    return await prisma.certification.findMany({
      where: { profileid: profileId },
    });
  },

  async getById(certificationId: string) {
    return await prisma.certification.findUnique({
      where: { id: certificationId },
    });
  },

  async update(
    certificationId: string,
    data: CertificationUpdate
  ) {
    return await prisma.certification.update({
      where: { id: certificationId },
      data,
    });
  },

  async delete(certificationId: string) {
    return await prisma.certification.delete({
      where: { id: certificationId },
    });
  },
};

// Achievement-related database operations
const achievement = {
  async create(title: string, description?: string) {
    return await prisma.achievement.create({
      data: {
        title,
        description,
      },
    });
  },

  async getAll() {
    return await prisma.achievement.findMany({
      include: {
        userachievements: true,
      },
    });
  },

  async getById(achievementId: string) {
    return await prisma.achievement.findUnique({
      where: { id: achievementId },
      include: {
        userachievements: {
          include: {
            profile: true,
          },
        },
      },
    });
  },

  async update(achievementId: string, data: Partial<{ title: string; description: string }>) {
    return await prisma.achievement.update({
      where: { id: achievementId },
      data,
    });
  },

  async delete(achievementId: string) {
    return await prisma.achievement.delete({
      where: { id: achievementId },
    });
  },

  async assignToUser(profileId: string, achievementId: string) {
    return await prisma.userAchievement.create({
      data: {
        profileid: profileId,
        achievementid: achievementId,
      },
    });
  },

  async removeFromUser(profileId: string, achievementId: string) {
    return await prisma.userAchievement.deleteMany({
      where: {
        profileid: profileId,
        achievementid: achievementId,
      },
    });
  },

  async getUserAchievements(profileId: string) {
    return await prisma.userAchievement.findMany({
      where: { profileid: profileId },
      include: {
        achievement: true,
      },
    });
  },
};

// Activity-related database operations
const activity = {
  async create(profileId: string, type: ActivityType, details: string) {
    return await prisma.activity.create({
      data: {
        profileid: profileId,
        type,
        details,
      },
    });
  },

  async getAll(profileId: string) {
    return await prisma.activity.findMany({
      where: { profileid: profileId },
      orderBy: {
        createdat: 'desc',
      },
    });
  },

  async getByType(profileId: string, type: ActivityType) {
    return await prisma.activity.findMany({
      where: { 
        profileid: profileId,
        type,
      },
      orderBy: {
        createdat: 'desc',
      },
    });
  },

  async delete(activityId: string) {
    return await prisma.activity.delete({
      where: { id: activityId },
    });
  },
};

// Main DB object
export const db = {
  profile,
  skill,
  resume,
  project,
  experience,
  education,
  certification,
  achievement,
  activity,
};
