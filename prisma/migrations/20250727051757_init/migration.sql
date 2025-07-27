/*
  Warnings:

  - You are about to drop the column `createdAt` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `activity` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `activity` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `certification` table. All the data in the column will be lost.
  - You are about to drop the column `expirationDate` on the `certification` table. All the data in the column will be lost.
  - You are about to drop the column `issueDate` on the `certification` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `certification` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `certification` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `education` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `education` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `education` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `education` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `education` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `experience` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `experience` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `experience` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `experience` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `experience` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `totalXp` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `resume` table. All the data in the column will be lost.
  - You are about to drop the column `includedIds` on the `resume` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `resume` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `resume` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `totalXp` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `achievementId` on the `userAchievement` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `userAchievement` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `userAchievement` table. All the data in the column will be lost.
  - You are about to drop the `experienceSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projectSkills` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `profileid` to the `activity` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `activity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `profileid` to the `certification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedat` to the `certification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileid` to the `education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedat` to the `education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileid` to the `experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedat` to the `experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileid` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedat` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileid` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedat` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileid` to the `skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedat` to the `skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `achievementid` to the `userAchievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileid` to the `userAchievement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "activitytype" AS ENUM ('SKILL', 'PROJECT', 'EXPERIENCE', 'EDUCATION', 'CERTIFICATION', 'ACHIEVEMENT');

-- DropForeignKey
ALTER TABLE "activity" DROP CONSTRAINT "activity_profileId_fkey";

-- DropForeignKey
ALTER TABLE "certification" DROP CONSTRAINT "certification_profileId_fkey";

-- DropForeignKey
ALTER TABLE "education" DROP CONSTRAINT "education_profileId_fkey";

-- DropForeignKey
ALTER TABLE "experience" DROP CONSTRAINT "experience_profileId_fkey";

-- DropForeignKey
ALTER TABLE "experienceSkills" DROP CONSTRAINT "experienceSkills_experienceId_fkey";

-- DropForeignKey
ALTER TABLE "experienceSkills" DROP CONSTRAINT "experienceSkills_skillId_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_profileId_fkey";

-- DropForeignKey
ALTER TABLE "projectSkills" DROP CONSTRAINT "projectSkills_projectId_fkey";

-- DropForeignKey
ALTER TABLE "projectSkills" DROP CONSTRAINT "projectSkills_skillId_fkey";

-- DropForeignKey
ALTER TABLE "resume" DROP CONSTRAINT "resume_profileId_fkey";

-- DropForeignKey
ALTER TABLE "skill" DROP CONSTRAINT "skill_profileId_fkey";

-- DropForeignKey
ALTER TABLE "userAchievement" DROP CONSTRAINT "userAchievement_achievementId_fkey";

-- DropForeignKey
ALTER TABLE "userAchievement" DROP CONSTRAINT "userAchievement_profileId_fkey";

-- AlterTable
ALTER TABLE "achievement" DROP COLUMN "createdAt",
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "activity" DROP COLUMN "createdAt",
DROP COLUMN "profileId",
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profileid" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "activitytype" NOT NULL;

-- AlterTable
ALTER TABLE "certification" DROP COLUMN "createdAt",
DROP COLUMN "expirationDate",
DROP COLUMN "issueDate",
DROP COLUMN "profileId",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expirationdate" TIMESTAMP(3),
ADD COLUMN     "issuedate" TIMESTAMP(3),
ADD COLUMN     "profileid" TEXT NOT NULL,
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "education" DROP COLUMN "createdAt",
DROP COLUMN "endDate",
DROP COLUMN "profileId",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "enddate" TIMESTAMP(3),
ADD COLUMN     "profileid" TEXT NOT NULL,
ADD COLUMN     "startdate" TIMESTAMP(3),
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "experience" DROP COLUMN "createdAt",
DROP COLUMN "endDate",
DROP COLUMN "profileId",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "enddate" TIMESTAMP(3),
ADD COLUMN     "profileid" TEXT NOT NULL,
ADD COLUMN     "startdate" TIMESTAMP(3),
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "avatarUrl",
DROP COLUMN "createdAt",
DROP COLUMN "fullName",
DROP COLUMN "totalXp",
ADD COLUMN     "avatarurl" TEXT,
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fullname" TEXT,
ADD COLUMN     "totalxp" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "project" DROP COLUMN "createdAt",
DROP COLUMN "endDate",
DROP COLUMN "profileId",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "enddate" TIMESTAMP(3),
ADD COLUMN     "profileid" TEXT NOT NULL,
ADD COLUMN     "startdate" TIMESTAMP(3),
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "resume" DROP COLUMN "createdAt",
DROP COLUMN "includedIds",
DROP COLUMN "profileId",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "includedids" JSONB,
ADD COLUMN     "profileid" TEXT NOT NULL,
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "skill" DROP COLUMN "createdAt",
DROP COLUMN "profileId",
DROP COLUMN "totalXp",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profileid" TEXT NOT NULL,
ADD COLUMN     "totalxp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "userAchievement" DROP COLUMN "achievementId",
DROP COLUMN "createdAt",
DROP COLUMN "profileId",
ADD COLUMN     "achievementid" TEXT NOT NULL,
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profileid" TEXT NOT NULL;

-- DropTable
DROP TABLE "experienceSkills";

-- DropTable
DROP TABLE "projectSkills";

-- DropEnum
DROP TYPE "type";

-- CreateTable
CREATE TABLE "projectskills" (
    "id" TEXT NOT NULL,
    "projectid" TEXT NOT NULL,
    "skillid" TEXT NOT NULL,

    CONSTRAINT "projectskills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experienceskills" (
    "id" TEXT NOT NULL,
    "experienceid" TEXT NOT NULL,
    "skillid" TEXT NOT NULL,

    CONSTRAINT "experienceskills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "resume" ADD CONSTRAINT "resume_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill" ADD CONSTRAINT "skill_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectskills" ADD CONSTRAINT "projectskills_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectskills" ADD CONSTRAINT "projectskills_skillid_fkey" FOREIGN KEY ("skillid") REFERENCES "skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experienceskills" ADD CONSTRAINT "experienceskills_experienceid_fkey" FOREIGN KEY ("experienceid") REFERENCES "experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experienceskills" ADD CONSTRAINT "experienceskills_skillid_fkey" FOREIGN KEY ("skillid") REFERENCES "skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification" ADD CONSTRAINT "certification_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAchievement" ADD CONSTRAINT "userAchievement_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAchievement" ADD CONSTRAINT "userAchievement_achievementid_fkey" FOREIGN KEY ("achievementid") REFERENCES "achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
