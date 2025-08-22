import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { addProject, getAllSkills } from "@/lib/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const projectSchema = z.object({
    title: z.string().min(1, "Project title is required"),
    description: z.string().optional(),
    link: z.string().url("Invalid URL").optional(),
    skillIds: z.array(z.string()).min(1, "At least one related skill is required"),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});

type Skills = {
    title: string | null;
    profileId: string;
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    totalXp: number;
    level: number;
};

type FormData = z.infer<typeof projectSchema>;

export default function ProjectsDialog({
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
        setValue,
        watch,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            description: "",
            link: "",
            skillIds: [],
            startDate: "",
            endDate: "",
        },
    });

    const [skills, setSkills] = useState<Skills[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [adding, setAdding] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState<Skills[]>([]);

    // Ref for dropdown to handle click outside
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const skills = await getAllSkills(profileId);
                setSkills(skills);
            } catch (error) {
                console.error("Failed to fetch skills:", error);
            }
        };
        fetchSkills();
    }, [profileId]);

    // Watch for changes to dialog open state and reset form
    useEffect(() => {
        if (isOpen) {
            reset();
            setSelectedSkills([]);
        }
    }, [isOpen, reset]);

    // Handle skill selection
    const handleSkillSelect = (skill: Skills) => {
        if (!selectedSkills.some(s => s.id === skill.id)) {
            const newSelectedSkills = [...selectedSkills, skill];
            setSelectedSkills(newSelectedSkills);
            setValue(
                "skillIds",
                newSelectedSkills.map(s => s.id)
            );
        }
        setDropdownOpen(false);
    };

    // Handle skill removal
    const handleRemoveSkill = (skillId: string) => {
        const newSelectedSkills = selectedSkills.filter(s => s.id !== skillId);
        setSelectedSkills(newSelectedSkills);
        setValue(
            "skillIds",
            newSelectedSkills.map(s => s.id)
        );
    };

    // Handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const onSubmit = async (data: FormData) => {
        setAdding(true);
        try {
            await addProject(
                profileId,
                data.title,
                data.description,
                data.link,
                data.skillIds,
                data.startDate,
                data.endDate
            );
            setIsOpen(false);
            router.refresh();
            if (onAdded) {
                await onAdded();
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                console.error("Error adding project:", error);
            }
        } finally {
            setAdding(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="ml-2 px-3 py-1 text-sm bg-indigo-800/60 hover:bg-indigo-700/80 text-indigo-300 rounded-lg flex items-center cursor-pointer relative overflow-hidden transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/60">
                <span className="mr-1 text-indigo-300">+</span>
                <span className="tracking-wide">Project</span>
            </DialogTrigger>
            <DialogContent className="border border-indigo-700/40 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-md shadow-xl shadow-indigo-500/10">
                <AnimatePresence mode="wait">
                    {isOpen && (
                        <motion.div
                            key="project-form"
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            <DialogHeader className="space-y-4">
                                <DialogTitle className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-200 to-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.15)]">
                                    Add a Project
                                </DialogTitle>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-busy={adding}>
                                    <div className="flex flex-col gap-2">
                                        {error && (
                                            <span className="text-red-400 text-xs font-medium tracking-wide">
                                                {error}
                                            </span>
                                        )}
                                        <label className="text-xs uppercase tracking-wide text-indigo-400/80 font-medium">
                                            Project Title
                                        </label>
                                        <motion.input
                                            type="text"
                                            {...register("title")}
                                            placeholder="e.g. Personal Website, E-commerce App"
                                            className="p-2.5 bg-indigo-900/30 text-indigo-200 placeholder:text-indigo-300/40 rounded-lg border border-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-400 shadow-inner shadow-indigo-900/40 transition-colors"
                                            whileFocus={{
                                                boxShadow: "0 0 0 3px rgba(99,102,241,0.25)",
                                                backgroundColor: "rgba(49,46,129,0.35)",
                                            }}
                                        />
                                        {errors.title && (
                                            <span className="text-red-400 text-xs font-medium tracking-wide">
                                                {errors.title.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-wide text-indigo-400/80 font-medium">
                                            Description
                                        </label>
                                        <motion.textarea
                                            {...register("description")}
                                            placeholder="Describe your project"
                                            className="p-2.5 bg-indigo-900/30 text-indigo-200 placeholder:text-indigo-300/40 rounded-lg border border-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-400 shadow-inner shadow-indigo-900/40 transition-colors"
                                            whileFocus={{
                                                boxShadow: "0 0 0 3px rgba(99,102,241,0.25)",
                                                backgroundColor: "rgba(49,46,129,0.35)",
                                            }}
                                        />
                                        {errors.description && (
                                            <span className="text-red-400 text-xs font-medium tracking-wide">
                                                {errors.description.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-wide text-indigo-400/80 font-medium">
                                            Link
                                        </label>
                                        <motion.input
                                            type="url"
                                            {...register("link")}
                                            placeholder="https://example.com"
                                            className="p-2.5 bg-indigo-900/30 text-indigo-200 placeholder:text-indigo-300/40 rounded-lg border border-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-400 shadow-inner shadow-indigo-900/40 transition-colors"
                                            whileFocus={{
                                                boxShadow: "0 0 0 3px rgba(99,102,241,0.25)",
                                                backgroundColor: "rgba(49,46,129,0.35)",
                                            }}
                                        />
                                        {errors.link && (
                                            <span className="text-red-400 text-xs font-medium tracking-wide">
                                                {errors.link.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-wide text-indigo-400/80 font-medium">
                                            Start Date (optional)
                                        </label>
                                        <motion.input
                                            type="date"
                                            {...register("startDate")}
                                            className="p-2.5 bg-indigo-900/30 text-indigo-200 rounded-lg border border-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-400 shadow-inner shadow-indigo-900/40 transition-colors"
                                            whileFocus={{
                                                boxShadow: "0 0 0 3px rgba(99,102,241,0.25)",
                                                backgroundColor: "rgba(49,46,129,0.35)",
                                            }}
                                        />
                                        {errors.startDate && (
                                            <span className="text-red-400 text-xs font-medium tracking-wide">
                                                {errors.startDate.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-wide text-indigo-400/80 font-medium">
                                            End Date (optional)
                                        </label>
                                        <motion.input
                                            type="date"
                                            {...register("endDate")}
                                            className="p-2.5 bg-indigo-900/30 text-indigo-200 rounded-lg border border-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-400 shadow-inner shadow-indigo-900/40 transition-colors"
                                            whileFocus={{
                                                boxShadow: "0 0 0 3px rgba(99,102,241,0.25)",
                                                backgroundColor: "rgba(49,46,129,0.35)",
                                            }}
                                        />
                                        {errors.endDate && (
                                            <span className="text-red-400 text-xs font-medium tracking-wide">
                                                {errors.endDate.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs uppercase tracking-wide text-indigo-400/80 font-medium">
                                            Related Skills
                                        </label>

                                        {/* Selected skills tags */}
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {selectedSkills.map(skill => (
                                                <div
                                                    key={skill.id}
                                                    className="bg-indigo-700/50 text-indigo-200 text-xs py-1 px-2 rounded-md flex items-center gap-1"
                                                >
                                                    {skill.name}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSkill(skill.id)}
                                                        className="text-indigo-300 hover:text-white ml-1 focus:outline-none"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-3 w-3"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Hidden input to store selected skill IDs */}
                                        <input type="hidden" {...register("skillIds")} />

                                        {/* Custom dropdown */}
                                        <div className="relative" ref={dropdownRef}>
                                            <motion.button
                                                type="button"
                                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                                className="w-full p-2.5 bg-indigo-900/30 text-indigo-200 rounded-lg border border-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 flex justify-between items-center"
                                                whileFocus={{
                                                    boxShadow: "0 0 0 3px rgba(99,102,241,0.25)",
                                                    backgroundColor: "rgba(49,46,129,0.35)",
                                                }}
                                            >
                                                <span
                                                    className={
                                                        selectedSkills.length ? "text-indigo-200" : "text-indigo-300/40"
                                                    }
                                                >
                                                    {selectedSkills.length
                                                        ? `${selectedSkills.length} skills selected`
                                                        : "Select skills"}
                                                </span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className={`h-4 w-4 transition-transform ${
                                                        dropdownOpen ? "transform rotate-180" : ""
                                                    }`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </motion.button>

                                            {/* Dropdown options */}
                                            {dropdownOpen && (
                                                <motion.div
                                                    className="absolute z-10 mt-1 w-full bg-indigo-950/90 backdrop-blur-sm border border-indigo-700/50 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.15 }}
                                                >
                                                    {skills.length > 0 ? (
                                                        skills
                                                            .filter(
                                                                skill => !selectedSkills.some(s => s.id === skill.id)
                                                            )
                                                            .map(skill => (
                                                                <div
                                                                    key={skill.id}
                                                                    className="p-2 hover:bg-indigo-800/50 cursor-pointer text-indigo-200"
                                                                    onClick={() => handleSkillSelect(skill)}
                                                                >
                                                                    {skill.name}
                                                                </div>
                                                            ))
                                                    ) : (
                                                        <div className="p-2 text-indigo-400/60 text-center">
                                                            No skills available
                                                        </div>
                                                    )}

                                                    {skills.length > 0 &&
                                                        !skills.filter(
                                                            skill => !selectedSkills.some(s => s.id === skill.id)
                                                        ).length && (
                                                            <div className="p-2 text-indigo-400/60 text-center">
                                                                All skills selected
                                                            </div>
                                                        )}
                                                </motion.div>
                                            )}
                                        </div>

                                        <p className="text-xs text-indigo-400/60 font-medium">
                                            Click on skills to add, click on tags to remove
                                        </p>

                                        {errors.skillIds && (
                                            <span className="text-red-400 text-xs font-medium tracking-wide">
                                                {errors.skillIds.message}
                                            </span>
                                        )}
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={adding}
                                        className="group w-full px-4 py-2.5 bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                                        whileHover={{ scale: adding ? 1 : 1.02 }}
                                        whileTap={{ scale: adding ? 1 : 0.97 }}
                                    >
                                        <span className="relative z-10">{adding ? "Adding..." : "Add Project"}</span>
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
