import { prisma } from "@/lib/prisma";

const achievements = [
    {
        title: "First Steps",
        description: "Complete your first resume",
    },
    {
        title: "Hello World",
        description: "Welcome to Level Up CV! Start your journey by creating your first resume.",
    },
    {
        title: "First 20 XP",
        description: "Earn your first 20 XP by completing tasks.",
    },
    {
        title: "Learner",
        description: "Add a skill",
    },
    {
        title: "First Challenge Solved",
        description: "Complete your first challenge successfully",
    },
    {
        title: "5 Challenges Solved",
        description: "Complete 5 challenges to level up your skills",
    },
    {
        title: "10 Challenges Solved",
        description: "Master 10 different challenges",
    },
    {
        title: "Daily Streak 3 Days",
        description: "Login and complete activities for 3 consecutive days",
    },
    {
        title: "Daily Streak 7 Days",
        description: "Maintain a week-long daily activity streak",
    },
    {
        title: "First Quiz Completed",
        description: "Complete your first skill assessment quiz",
    },
    {
        title: "Explorer",
        description: "Visit all sections of the platform",
    },
    {
        title: "Thinker",
        description: "Spend time refining your profile and career materials",
    },
    {
        title: "Problem Solver",
        description: "Overcome obstacles in your career path",
    },
    {
        title: "Level 5 Reached",
        description: "Reach level 5 in your career progression",
    },
    {
        title: "Level 10 Reached",
        description: "Achieve level 10 status in your career journey",
    },
    {
        title: "Level 20 Reached",
        description: "Become a level 20 career champion",
    },
    {
        title: "Level 50 Reached",
        description: "Reach the exceptional level 50 milestone",
    },
    {
        title: "First 200 XP",
        description: "Accumulate your first 200 XP through various activities",
    },
    {
        title: "First Contribution",
        description: "Make your first contribution to the community",
    },
    {
        title: "Big Brain",
        description: "Demonstrate exceptional knowledge and skills",
    },
    {
        title: "Ultimate Champion",
        description: "Become the ultimate career champion by mastering all aspects",
    },
];

const seedAchievements = async () => {
    console.log("Seeding achievements...");
    const seed = async () => {
        achievements.forEach(async (achievement) => {
        await prisma.achievement.create({
            data: achievement,
        });
    });
    }
    await seed();
    console.log("Achievements seeded successfully.");
};

seedAchievements();