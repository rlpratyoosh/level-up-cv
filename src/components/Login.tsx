import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { AiOutlineThunderbolt } from "react-icons/ai";

const formSchema = z.object({
  email: z.email(),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginDialog() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  const supabase = createClientComponentClient();
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setCheckingAuth(false);
    };
    
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // Handle dialog trigger click
  const handleDialogTriggerClick = () => {
    // Always open the dialog - we'll handle logged in state inside
    setIsOpen(true);
  };

  // Handle continuing with current account
  const handleContinueWithAccount = () => {
    setIsOpen(false);
    router.push('/dashboard');
  };

  // Handle sign out
  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
    // Keep dialog open to allow new login
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password,
    });
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Login successful, redirect to dashboard
      setIsOpen(false);
      router.push('/dashboard');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          className="flex gap-2 items-center justify-center text-xl border-3 border-blue-500 pt-2 pb-2 pl-6 pr-6 rounded-xl cursor-pointer text-blue-400 font-bold"
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(59,130,246,0.1)",
            y: -2,
          }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={handleDialogTriggerClick}
        >
          {checkingAuth ? "..." : "Login"}
        </motion.div>
      </DialogTrigger>
      <AnimatePresence>
        {isOpen && (
          <DialogContent>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl text-left">
                    <motion.span
                      className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      {user ? "Account Found" : "Welcome"}
                    </motion.span>{" "}
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      {user ? "!" : "to the Guild"}
                    </motion.span>
                  </DialogTitle>
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <DialogDescription className="text-left">
                      {user 
                        ? "We found an account logged in. Choose how you'd like to continue."
                        : "Continue your quest to level up your career"
                      }
                    </DialogDescription>
                  </motion.div>
                </DialogHeader>
              </motion.div>
              {user ? (
                /* Logged in user options */
                <motion.div
                  className="flex flex-col gap-4 items-start justify-center w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <motion.div
                    className="w-full px-4 py-2 bg-blue-500 border border-[var(--border)] rounded-4xl mt-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-500 font-bold"
                      >
                        {user.email?.charAt(0).toUpperCase()}
                      </motion.div>
                      <div>
                        <motion.p 
                          className="font-semibold text-white"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6, duration: 0.3 }}
                        >
                          {user.email}
                        </motion.p>
                        <motion.p 
                          className="text-sm text-white opacity-80"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7, duration: 0.3 }}
                        >
                          Account is ready to login
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.button
                    onClick={handleContinueWithAccount}
                    className="w-full bg-blue-500 pt-3 pb-3 pr-4 pl-4 rounded-lg text-white font-bold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.8, duration: 0.3 }
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    <AiOutlineThunderbolt className="text-xl" />
                    Continue with Same Account
                  </motion.button>
                  
                  <motion.button
                    onClick={handleSignOut}
                    className="w-full bg-gray-100 hover:bg-gray-200 pt-3 pb-3 pr-4 pl-4 rounded-lg text-gray-700 font-bold transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.9, duration: 0.3 }
                    }}
                    whileHover={{ 
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    {loading ? "Signing out..." : "Sign Out & Use Different Account"}
                  </motion.button>
                </motion.div>
              ) : (
                /* Login form for non-authenticated users */
                <motion.form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4 items-start justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  {error && (
                    <motion.div
                      className="w-full p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {error}
                    </motion.div>
                  )}
                  <motion.label
                    className="flex flex-col items-start w-full justify-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mt-3">
                      <motion.div
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      >
                        <MdOutlineMail className="text-blue-500 text-xl" />
                      </motion.div>
                      Email Address
                    </div>
                    <motion.input
                      {...register("email")}
                      placeholder="developer@example.com"
                      className="pt-2 pb-2 pl-4 pr-4  w-full rounded-lg text-sm border-2 border-blue-500 outline-0 focus:outline-2 outline-blue-500 "
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      whileFocus={{ scale: 1.02 }}
                    />
                    {errors.email && (
                      <motion.p
                        className="text-red-500 text-sm"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </motion.label>
                  <motion.label
                    className="flex flex-col items-start justify-center gap-2 w-full"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                      >
                        <CiLock className="text-blue-500 text-xl" />
                      </motion.div>
                      Password
                    </div>
                    <motion.input
                      placeholder="Enter Your Password"
                      type="password"
                      className="pt-2 pb-2 pl-4 pr-4  w-full rounded-lg text-sm border-2 border-blue-500 outline-0 focus:outline-2 outline-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.label>
                  <motion.button
                    type="submit"
                    className="w-full bg-blue-500 pt-2 pb-2 pr-3 pl-3 rounded-lg text-white font-bold hover:bg-blue-600 transition-colors duration-200 mt-3 flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.7, duration: 0.3 },
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    <motion.div
                      animate={loading ? { rotate: 360 } : { rotate: 0 }}
                      transition={
                        loading
                          ? {
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }
                          : {}
                      }
                    >
                      <AiOutlineThunderbolt className="text-xl" />
                    </motion.div>
                    {loading ? "Entering..." : "Enter Game"}
                  </motion.button>
                </motion.form>
              )}

              {!user && (
                <>
                  <motion.div
                    className="w-full relative flex items-center justify-center mt-7"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  >
                    <hr className="w-full border-t" />
                    <motion.span
                      className="absolute px-1 bg-[var(--background)] text-gray-500 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.3 }}
                    >
                      OR
                    </motion.span>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center justify-center text-sm mt-5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                  >
                    <div>
                      Don't have an account yet?{" "}
                      <motion.span
                        className="text-blue-500 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Create account
                      </motion.span>{" "}
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center justify-center text-xs mt-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.3 }}
                  >
                    <div>
                      Need the full experience?{" "}
                      <motion.span
                        className="text-blue-500 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Visit our Login Page
                      </motion.span>{" "}
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
