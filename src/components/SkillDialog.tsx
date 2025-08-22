import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiBookmark, FiCode } from "react-icons/fi";
import { HiOutlineLightBulb, HiSparkles } from "react-icons/hi";
import { PiLightningBold } from "react-icons/pi";
import z from "zod";

import { addSkill } from "@/lib/action";
import { useRouter } from "next/navigation";

const skillSchema = z.object({
    name: z.string().min(1, "Skill name is required"),
});

type FormData = z.infer<typeof skillSchema>;

export default function SkillDialog({
    profileId,
    onAdded,
}: {
    profileId: string;
    onAdded?: () => void | Promise<void>;
}) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(skillSchema),
    });

    const [isOpen, setIsOpen] = useState(false);
    const [adding, setAdding] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: FormData) => {
        setAdding(true);
        try {
            await addSkill(profileId, data.name);
            setIsOpen(false);
            router.refresh();
            if (onAdded) {
                await onAdded();
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                console.error("Error adding skill:", error);
            }
        } finally {
            setAdding(false);
        }
    };

    // Create suggested skill options
    const suggestedSkills = [
        { name: "JavaScript", icon: <FiCode /> },
        { name: "React", icon: <FiCode /> },
        { name: "TypeScript", icon: <FiCode /> },
        { name: "UI/UX Design", icon: <HiOutlineLightBulb /> },
        { name: "Node.js", icon: <FiCode /> },
        { name: "Python", icon: <FiCode /> },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="ml-2 px-3 py-1 text-sm bg-lime-800/60 hover:bg-lime-700/80 text-lime-300 rounded-lg flex items-center cursor-pointer relative overflow-hidden transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500/60">
                <span className="mr-1 text-lime-300">+</span>
                <span className="tracking-wide">Skill</span>
            </DialogTrigger>
            <DialogContent className="border border-lime-700/40 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-md shadow-xl shadow-lime-500/10 max-w-md">
                <AnimatePresence mode="wait">
                    {isOpen && (
                        <motion.div
                            key="skill-form"
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            <DialogHeader className="space-y-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <motion.div
                                        className="p-2 rounded-full bg-lime-500/20 text-lime-400"
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: [0, 15, -15, 0] }}
                                        transition={{ duration: 1.5, delay: 0.3, repeat: Infinity, repeatDelay: 5 }}
                                    >
                                        <PiLightningBold className="text-xl" />
                                    </motion.div>
                                    <DialogTitle className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 via-amber-200 to-lime-400 drop-shadow-[0_0_8px_rgba(190,242,100,0.15)] text-xl">
                                        Add a New Skill
                                    </DialogTitle>
                                </div>

                                <motion.div
                                    className="p-3 rounded-lg bg-lime-950/40 border border-lime-800/50 text-sm text-lime-200/90 mb-4 flex items-start gap-2"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <HiSparkles className="text-lime-300 text-lg flex-shrink-0 mt-0.5" />
                                    <p>Adding skills helps showcase your expertise and earn XP as you level up!</p>
                                </motion.div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-busy={adding}>
                                    <div className="flex flex-col gap-2">
                                        {error && (
                                            <span className="text-red-400 text-xs font-medium tracking-wide">
                                                {error}
                                            </span>
                                        )}

                                        <label className="text-xs uppercase tracking-wide text-lime-400/80 font-medium flex items-center gap-1.5">
                                            <FiBookmark className="text-lime-300" /> Skill Name
                                        </label>
                                        <motion.input
                                            type="text"
                                            {...register("name")}
                                            placeholder="e.g. JavaScript, React, UI Design"
                                            className="p-2.5 bg-lime-900/30 text-lime-200 placeholder:text-lime-300/40 rounded-lg border border-lime-700/50 focus:outline-none focus:ring-2 focus:ring-lime-500/60 focus:border-lime-400 shadow-inner shadow-lime-900/40 transition-colors"
                                            whileFocus={{
                                                boxShadow: "0 0 0 3px rgba(163,230,53,0.25)",
                                                backgroundColor: "rgba(63,98,18,0.35)",
                                            }}
                                        />
                                        {errors.name && (
                                            <span className="text-red-400 text-xs font-medium tracking-wide">
                                                {errors.name.message}
                                            </span>
                                        )}
                                    </div>

                                    {/* Suggested Skills */}
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wide text-lime-400/80 font-medium flex items-center gap-1.5">
                                            <HiOutlineLightBulb className="text-lime-300" /> Suggested Skills
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {suggestedSkills.map((skill, i) => (
                                                <motion.button
                                                    key={skill.name}
                                                    type="button"
                                                    className="px-3 py-1.5 bg-lime-900/40 hover:bg-lime-800/50 text-lime-300 text-xs rounded-full flex items-center gap-1.5 border border-lime-800/50 transition-colors"
                                                    onClick={() => {
                                                        const nameField = document.querySelector(
                                                            'input[name="name"]'
                                                        ) as HTMLInputElement;
                                                        if (nameField) nameField.value = skill.name;
                                                    }}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 + i * 0.05 }}
                                                >
                                                    {skill.icon}
                                                    {skill.name}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={adding}
                                        className="group w-full px-4 py-3 bg-gradient-to-r from-lime-600/90 to-lime-500/90 hover:from-lime-500 hover:to-lime-400 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-lime-500/60"
                                        whileHover={{ scale: adding ? 1 : 1.02 }}
                                        whileTap={{ scale: adding ? 1 : 0.97 }}
                                    >
                                        <span className="relative z-10">{adding ? "Adding..." : "Add Skill"}</span>
                                        {adding ? (
                                            <motion.span
                                                className="inline-block w-2 h-2 rounded-full bg-white/90"
                                                initial={{ opacity: 0.4, scale: 0.7 }}
                                                animate={{ opacity: [0.4, 1, 0.4], scale: [0.7, 1, 0.7] }}
                                                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                                            />
                                        ) : (
                                            <PiLightningBold className="text-white group-hover:rotate-12 transition-transform" />
                                        )}
                                    </motion.button>
                                </form>
                            </DialogHeader>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
