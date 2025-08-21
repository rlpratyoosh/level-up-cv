import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="ml-2 px-3 py-1 text-sm bg-lime-800/60 hover:bg-lime-700/80 text-lime-300 rounded-lg flex items-center cursor-pointer relative overflow-hidden transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500/60">
                <span className="mr-1 text-lime-300">+</span>
                <span className="tracking-wide">Skill</span>
            </DialogTrigger>
            <DialogContent className="border border-lime-700/40 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-md shadow-xl shadow-lime-500/10">
                <AnimatePresence mode="wait">
                    {isOpen && (
                        <motion.div
                            key="skill-form"
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            <DialogHeader className="space-y-4">
                                <DialogTitle className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 via-amber-200 to-lime-400 drop-shadow-[0_0_8px_rgba(190,242,100,0.15)]">
                                    Add a Skill
                                </DialogTitle>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-busy={adding}>
                                    <div className="flex flex-col gap-2">
                                        {error && (
                                            <span className="text-red-400 text-xs font-medium tracking-wide">
                                                {error}
                                            </span>
                                        )}
                                        <label className="text-xs uppercase tracking-wide text-lime-400/80 font-medium">
                                            Skill Name
                                        </label>
                                        <motion.input
                                            type="text"
                                            {...register("name")}
                                            placeholder="e.g. JavaScript, React"
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
                                    <motion.button
                                        type="submit"
                                        disabled={adding}
                                        className="group w-full px-4 py-2.5 bg-lime-600/90 hover:bg-lime-500 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-lime-500/60"
                                        whileHover={{ scale: adding ? 1 : 1.02 }}
                                        whileTap={{ scale: adding ? 1 : 0.97 }}
                                    >
                                        <span className="relative z-10">{adding ? "Adding..." : "Add Skill"}</span>
                                        {adding && (
                                            <motion.span
                                                className="inline-block w-2 h-2 rounded-full bg-white/90"
                                                initial={{ opacity: 0.4, scale: 0.7 }}
                                                animate={{ opacity: [0.4, 1, 0.4], scale: [0.7, 1, 0.7] }}
                                                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                                            />
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
