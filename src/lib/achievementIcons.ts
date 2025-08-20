import { 
  FaUserGraduate, FaKeyboard, FaLayerGroup, FaCodeBranch, FaStackOverflow,
  FaScroll, FaBrain, FaLightbulb, FaRocket, FaAward, FaMedal, FaStar,
} from "react-icons/fa";
import { FiCpu, FiCode, FiBookOpen } from "react-icons/fi";
import { MdQuiz, MdOutlineAutoGraph } from "react-icons/md";
import { GiProgression, GiAchievement, GiTrophy, GiLaurels } from "react-icons/gi";

export const achievementIcons: Record<string, React.ElementType> = {
  // Learning
  "First Steps": FaUserGraduate,
  "Hello World": FiCpu,
  "First 20 XP": FaKeyboard,
  "Learner": FiBookOpen,

  // Practice & Consistency
  "First Challenge Solved": FiCode,
  "5 Challenges Solved": FaLayerGroup,
  "10 Challenges Solved": FaStackOverflow,
  "Daily Streak 3 Days": GiProgression,
  "Daily Streak 7 Days": GiAchievement,

  // Knowledge & Growth
  "First Quiz Completed": MdQuiz,
  "Explorer": FaScroll,
  "Thinker": FaBrain,
  "Problem Solver": FaLightbulb,

  // Level Progression
  "Level 5 Reached": FaAward,
  "Level 10 Reached": FaMedal,
  "Level 20 Reached": FaStar,
  "Level 50 Reached": GiLaurels,

  // Big Milestones
  "First 200 XP": MdOutlineAutoGraph,
  "First Contribution": FaCodeBranch,
  "Big Brain": FaRocket,
  "Ultimate Champion": GiTrophy,
};
