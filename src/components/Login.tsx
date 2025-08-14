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
import { useRouter } from "next/navigation";

import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { AiOutlineThunderbolt } from "react-icons/ai";
import Link from "next/link";

const formSchema = z.object({
    email: z.string().email("Invalid Email"),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginDialog() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  const router = useRouter();

  // Check authentication status on mount
  // useEffect(() => {
  //   const checkUser = async () => {
  //     const { data: { user } } = await supabase.auth.getUser();
  //     setUser(user);
  //     setCheckingAuth(false);
  //   };
    
  //   checkUser();

  //   // Listen for auth changes
  //   const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setUser(session?.user ?? null);
  //   });

  //   return () => subscription.unsubscribe();
  // }, [supabase.auth]);

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
  // const handleSignOut = async () => {
  //   setLoading(true);
  //   await supabase.auth.signOut();
  //   setUser(null);
  //   setLoading(false);
  //   // Keep dialog open to allow new login
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // const onSubmit = async (data: FormData) => {
  //   setLoading(true);
  //   setError(null);
    
  //   const { error } = await supabase.auth.signInWithPassword({
  //     email: data.email,
  //     password,
  //   });
    
  //   if (error) {
  //     setError(error.message);
  //     setLoading(false);
  //   } else {
  //     // Login successful, redirect to dashboard
  //     setIsOpen(false);
  //     router.push('/dashboard');
  //   }
  // };

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
          {checkingAuth ? "..." : "Enter game"}
        </motion.div>
      </DialogTrigger>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="sm:max-w-[500px] p-8">
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
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              {/* Background decoration */}
              <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-20 -left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.15, 0.1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                
                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      x: [-5, 5, -5],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="relative z-10"
              >
                <DialogHeader className=" mb-8">
                  <DialogTitle className="text-3xl text-left font-bold">
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
                    <DialogDescription className="text-left text-lg opacity-80">
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
                  className="flex flex-col gap-6 items-start justify-center w-full relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <motion.div
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 border border-blue-400/20 rounded-2xl shadow-lg"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)" }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 200 }}
                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-blue-500 font-bold text-xl shadow-lg"
                        whileHover={{ rotate: 360 }}
                      >
                        {user.email?.charAt(0).toUpperCase()}
                      </motion.div>
                      <div className="flex-1">
                        <motion.p 
                          className="font-semibold text-white text-lg"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6, duration: 0.3 }}
                        >
                          {user.email}
                        </motion.p>
                        <motion.p 
                          className="text-sm text-blue-100 opacity-90"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7, duration: 0.3 }}
                        >
                          Account is ready to continue
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.button
                    onClick={handleContinueWithAccount}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 pt-4 pb-4 pr-6 pl-6 rounded-xl text-white font-bold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.8, duration: 0.3 }
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                      y: -2
                    }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <AiOutlineThunderbolt className="text-xl" />
                    </motion.div>
                    Continue with Same Account
                  </motion.button>
                  
                  <motion.button
                    // onClick={handleSignOut}
                    className="w-full bg-gray-50 hover:bg-gray-100 pt-4 pb-4 pr-6 pl-6 rounded-xl text-gray-700 font-bold transition-all duration-200 flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.9, duration: 0.3 }
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -1
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
                  // onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-6 items-start justify-center relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  
                  <motion.label
                    className="flex flex-col items-start w-full justify-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        initial={{ rotate: -90, opacity: 0, scale: 0 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
                        className="p-2 bg-blue-500/10 rounded-lg"
                      >
                        <MdOutlineMail className="text-blue-500 text-xl" />
                      </motion.div>
                      <span className="text-lg font-medium">Email Address</span>
                    </div>
                    <motion.input
                        {...register("email")}
                        placeholder="developer@example.com"
                      className="pt-3 pb-3 pl-4 pr-4 w-full rounded-xl text-base border-2 border-blue-500/20 focus:border-blue-500 outline-0 transition-all duration-200 shadow-sm"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        transition: { duration: 0.3 }
                      }}
                      whileFocus={{ 
                        scale: 1.02,
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)"
                      }}
                    />
                    {errors.email && (
                      <motion.p
                        className="text-red-500 text-sm flex items-center gap-2"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                      >
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        {errors.email.message}
                      </motion.p>
                    )}
                  </motion.label>
                  <motion.label
                    className="flex flex-col items-start justify-center gap-3 w-full"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        initial={{ rotate: -90, opacity: 0, scale: 0 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.4, type: "spring" }}
                        className="p-2 bg-blue-500/10 rounded-lg"
                      >
                        <CiLock className="text-blue-500 text-xl" />
                      </motion.div>
                      <span className="text-lg font-medium">Password</span>
                    </div>
                    <motion.input
                      placeholder="Enter Your Password"
                      type="password"
                      className="pt-3 pb-3 pl-4 pr-4 w-full rounded-xl text-base border-2 border-blue-500/20 focus:border-blue-500 outline-0 transition-all duration-200 shadow-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, transition: { duration: 0.3 } }}
                      whileFocus={{ 
                        scale: 1.02,
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)"
                      }}
                    />
                  </motion.label>
                  {error && (
                    <motion.div
                      className="w-full rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-600 text-sm"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        {error}
                      </div>
                    </motion.div>
                  )}
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 pt-4 pb-4 pr-6 pl-6 rounded-xl text-white font-bold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg disabled:opacity-70"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.7, duration: 0.3 },
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                      y: -2
                    }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    <motion.div
                      animate={loading ? { rotate: 360 } : { rotate: [0, 15, -15, 0] }}
                      transition={
                        loading
                          ? {
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }
                          : {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
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
                    className="w-full relative flex items-center justify-center mt-8"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  >
                    <hr className="w-full border-t border-gray-200" />
                    <motion.span
                      className="absolute px-3 bg-[var(--background)] text-gray-500 text-sm font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9, duration: 0.3 }}
                    >
                      OR
                    </motion.span>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center justify-center text-base mt-6 space-y-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                  >
                    <div className="text-center">
                      Don't have an account yet?{" "}
                      <motion.span
                        className="text-blue-500 cursor-pointer font-semibold hover:text-blue-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link href="/signup">Create account</Link>
                      </motion.span>{" "}
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center justify-center text-sm mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.3 }}
                  >
                    <div className="text-center text-gray-600">
                      Need the full experience?{" "}
                      <motion.span
                        className="text-blue-500 cursor-pointer font-medium hover:text-blue-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                       <Link href="/login">Visit our Login Page</Link>
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
