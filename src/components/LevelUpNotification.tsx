"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { changeLevelUpState } from "@/lib/action";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CiTrophy } from "react-icons/ci";

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

interface LevelUpNotificationProps {
    showLevelUp: boolean;
    setShowLevelUp: (show: boolean) => void;
    level: number;
    profileId: string | undefined;
    onLevelUpHandled: () => void;
}

export default function LevelUpNotification({
    showLevelUp,
    setShowLevelUp,
    level,
    profileId,
    onLevelUpHandled,
}: LevelUpNotificationProps) {
    const [isClient, setIsClient] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setIsClient(true);
        // Update window size for confetti
        const updateWindowSize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        updateWindowSize();
        window.addEventListener("resize", updateWindowSize);

        return () => window.removeEventListener("resize", updateWindowSize);
    }, []);

    return (
        <>
            {/* Confetti Effect when level up */}
            {showLevelUp && isClient && (
                <ReactConfetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={200}
                    gravity={0.25}
                    colors={["#a3e635", "#fbbf24", "#60a5fa", "#c084fc"]}
                />
            )}

            {/* Level Up Notification */}
            <Dialog open={showLevelUp} onOpenChange={setShowLevelUp}>
                <DialogContent className="border border-[var(--border)] bg-card backdrop-blur-md shadow-xl shadow-amber-500/20">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="p-6 flex flex-col items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                            className="text-5xl text-amber-300 mb-4"
                        >
                            <CiTrophy />
                        </motion.div>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 mb-2">
                            Level Up!
                        </h2>
                        <p className="text-center text-gray-300 mb-4">Congratulations! You've reached level {level}!</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setShowLevelUp(false);
                                if (profileId) {
                                    changeLevelUpState(profileId, false);
                                    onLevelUpHandled();
                                }
                            }}
                            className="px-4 py-2 bg-amber-500 text-black font-medium rounded-lg"
                        >
                            Awesome!
                        </motion.button>
                    </motion.div>
                </DialogContent>
            </Dialog>
        </>
    );
}
