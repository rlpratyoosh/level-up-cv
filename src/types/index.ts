// Database model types based on Prisma schema
import type { JsonValue, InputJsonValue } from "@prisma/client/runtime/library";

export type ActivityType = 'SKILL' | 'PROJECT' | 'EXPERIENCE' | 'EDUCATION' | 'CERTIFICATION' | 'ACHIEVEMENT';

export interface Skill {
  id: string;
  profileid: string;
  name: string;
  totalxp: number;
  level: number;
  title: string | null;
  createdat: Date;
  updatedat: Date;
}

export interface Resume {
  id: string;
  profileid: string;
  title: string;
  includedids: JsonValue | null; // JSON type from Prisma
  createdat: Date;
  updatedat: Date;
}

export interface Project {
  id: string;
  profileid: string;
  title: string;
  description: string | null;
  link: string | null;
  startdate: Date | null;
  enddate: Date | null;
  createdat: Date;
  updatedat: Date;
  skills?: ProjectSkill[];
}

export interface ProjectSkill {
  id: string;
  projectid: string;
  skillid: string;
  skill: Skill;
}

export interface Experience {
  id: string;
  profileid: string;
  role: string;
  company: string;
  summary: string | null;
  startdate: Date | null;
  enddate: Date | null;
  createdat: Date;
  updatedat: Date;
  skills?: ExperienceSkill[];
}

export interface ExperienceSkill {
  id: string;
  experienceid: string;
  skillid: string;
  skill: Skill;
}

export interface Education {
  id: string;
  profileid: string;
  institution: string;
  degree: string;
  startdate: Date | null;
  enddate: Date | null;
  createdat: Date;
  updatedat: Date;
}

export interface Certification {
  id: string;
  profileid: string;
  title: string;
  issuer: string;
  issuedate: Date | null;
  expirationdate: Date | null;
  link: string | null;
  createdat: Date;
  updatedat: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string | null;
  createdat: Date;
}

export interface UserAchievement {
  id: string;
  profileid: string;
  achievementid: string;
  achievement: Achievement;
  createdat: Date;
}

export interface Activity {
  id: string;
  profileid: string;
  type: ActivityType;
  details: string;
  createdat: Date;
}

// Main Profile type with all relationships
export interface Profile {
  id: string;
  fullname: string | null;
  bio: string | null;
  avatarurl: string | null;
  title: string | null;
  totalxp: number;
  level: number;
  createdat: Date;
  resumes: Resume[];
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
  achievements: UserAchievement[];
  activities: Activity[];
}

// Partial types for updates
export type ProfileUpdate = Partial<Pick<Profile, 'fullname' | 'bio' | 'title' | 'avatarurl'>>;
export type SkillUpdate = Partial<Pick<Skill, 'name' | 'title' | 'totalxp' | 'level'>>;
export type ResumeUpdate = Partial<{
  title: string;
  includedids: InputJsonValue;
}>;
export type ProjectUpdate = Partial<Pick<Project, 'title' | 'description' | 'link' | 'startdate' | 'enddate'>>;
export type ExperienceUpdate = Partial<Pick<Experience, 'role' | 'company' | 'summary' | 'startdate' | 'enddate'>>;
export type EducationUpdate = Partial<Pick<Education, 'institution' | 'degree' | 'startdate' | 'enddate'>>;
export type CertificationUpdate = Partial<Pick<Certification, 'title' | 'issuer' | 'issuedate' | 'expirationdate' | 'link'>>;
export type AchievementUpdate = Partial<Pick<Achievement, 'title' | 'description'>>;

// Create types (without id, createdat, updatedat)
export type ProfileCreate = Pick<Profile, 'id'> & Partial<Pick<Profile, 'fullname' | 'bio' | 'title' | 'avatarurl'>>;
export type SkillCreate = Pick<Skill, 'profileid' | 'name'> & Partial<Pick<Skill, 'title'>>;
export type ResumeCreate = Pick<Resume, 'profileid' | 'title'> & Partial<{
  includedids: InputJsonValue;
}>;
export type ProjectCreate = Pick<Project, 'profileid' | 'title'> & 
  Partial<Pick<Project, 'description' | 'link' | 'startdate' | 'enddate'>>;
export type ExperienceCreate = Pick<Experience, 'profileid' | 'role' | 'company'> & 
  Partial<Pick<Experience, 'summary' | 'startdate' | 'enddate'>>;
export type EducationCreate = Pick<Education, 'profileid' | 'institution' | 'degree'> & 
  Partial<Pick<Education, 'startdate' | 'enddate'>>;
export type CertificationCreate = Pick<Certification, 'profileid' | 'title' | 'issuer'> & 
  Partial<Pick<Certification, 'issuedate' | 'expirationdate' | 'link'>>;
export type ActivityCreate = Pick<Activity, 'profileid' | 'type' | 'details'>;

// Re-export commonly used combinations
export type ProfileWithRelations = Profile;
export type ProjectWithSkills = Project & { skills: (ProjectSkill & { skill: Skill })[] };
export type ExperienceWithSkills = Experience & { skills: (ExperienceSkill & { skill: Skill })[] };
