import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CoachPersonality } from '../types';

// ============================================
// DATA MODELS
// ============================================

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalXpEarned: number;
  currency: number; // In-app currency for shop
  streak: number;
  longestStreak: number;
  lastWorkoutDate?: string;
}

export interface UserGoals {
  primaryGoal: 'strength' | 'shredded' | 'performance' | null;
  targetWeight?: number;
  weeklyWorkoutFrequency: number;
  coachPersonality: CoachPersonality;
  nudgeIntensity: 'low' | 'medium' | 'high';
}

export interface WorkoutExercise {
  id: string;
  name: string;
  category: 'compound' | 'isolation';
  muscleGroup: string;
  sets: WorkoutSet[];
}

export interface WorkoutSet {
  setNumber: number;
  weight: number;
  reps: number;
  completed: boolean;
  rpe?: number; // Rate of Perceived Exertion (1-10)
}

export interface Workout {
  id: string;
  date: string;
  phase: string; // e.g., "Hypertrophy Phase", "Strength Phase"
  exercises: WorkoutExercise[];
  totalVolume: number; // kg × reps
  duration?: number; // minutes
  notes?: string;
  xpEarned: number;
  questCompleted?: string;
}

export interface NutritionLog {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: Meal[];
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface WeightEntry {
  date: string;
  weight: number;
  bodyFat?: number;
  photos?: string[]; // base64 or URLs
}

export interface ActiveQuest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  progress: number;
  target: number;
  xpReward: number;
  expiresAt: string;
}

export interface UnlockedSkill {
  id: string;
  name: string;
  description: string;
  category: 'strength' | 'consistency' | 'nutrition';
  tier: number;
  bonus: string; // e.g., "+10% XP on leg day"
}

// ============================================
// CONTEXT TYPES
// ============================================

interface AppContextType {
  // User Data
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;

  stats: UserStats;
  setStats: (stats: UserStats | ((prev: UserStats) => UserStats)) => void;

  goals: UserGoals;
  setGoals: (goals: UserGoals | ((prev: UserGoals) => UserGoals)) => void;

  // Workout Data
  workouts: Workout[];
  addWorkout: (workout: Workout) => void;
  updateWorkout: (id: string, workout: Partial<Workout>) => void;

  // Nutrition Data
  nutritionLogs: NutritionLog[];
  addNutritionLog: (log: NutritionLog) => void;
  getTodayNutrition: () => NutritionLog | null;

  // Weight Tracking
  weightHistory: WeightEntry[];
  addWeightEntry: (entry: WeightEntry) => void;

  // Gamification
  activeQuests: ActiveQuest[];
  setActiveQuests: (quests: ActiveQuest[]) => void;

  unlockedSkills: UnlockedSkill[];
  unlockSkill: (skill: UnlockedSkill) => void;

  // XP & Leveling
  addXP: (amount: number, source: string) => void;
  updateStreak: () => void;

  // Utility
  clearAllData: () => void;
  exportData: () => string;
}

// ============================================
// CONTEXT CREATION
// ============================================

const AppContext = createContext<AppContextType | undefined>(undefined);

// Default values
const defaultStats: UserStats = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  totalXpEarned: 0,
  currency: 0,
  streak: 0,
  longestStreak: 0
};

const defaultGoals: UserGoals = {
  primaryGoal: null,
  weeklyWorkoutFrequency: 3,
  coachPersonality: CoachPersonality.SAGE,
  nudgeIntensity: 'medium'
};

// ============================================
// PROVIDER COMPONENT
// ============================================

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useLocalStorage<UserProfile | null>('titan-profile', null);
  const [stats, setStats] = useLocalStorage<UserStats>('titan-stats', defaultStats);
  const [goals, setGoals] = useLocalStorage<UserGoals>('titan-goals', defaultGoals);
  const [workouts, setWorkouts] = useLocalStorage<Workout[]>('titan-workouts', []);
  const [nutritionLogs, setNutritionLogs] = useLocalStorage<NutritionLog[]>('titan-nutrition', []);
  const [weightHistory, setWeightHistory] = useLocalStorage<WeightEntry[]>('titan-weight', []);
  const [activeQuests, setActiveQuests] = useLocalStorage<ActiveQuest[]>('titan-quests', []);
  const [unlockedSkills, setUnlockedSkills] = useLocalStorage<UnlockedSkill[]>('titan-skills', []);

  // Add workout
  const addWorkout = (workout: Workout) => {
    setWorkouts(prev => [workout, ...prev]);
    addXP(workout.xpEarned, `Workout: ${workout.phase}`);
  };

  // Update workout
  const updateWorkout = (id: string, updates: Partial<Workout>) => {
    setWorkouts(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
  };

  // Add nutrition log
  const addNutritionLog = (log: NutritionLog) => {
    setNutritionLogs(prev => {
      const filtered = prev.filter(l => l.date !== log.date);
      return [log, ...filtered];
    });
  };

  // Get today's nutrition
  const getTodayNutrition = (): NutritionLog | null => {
    const today = new Date().toISOString().split('T')[0];
    return nutritionLogs.find(log => log.date === today) || null;
  };

  // Add weight entry
  const addWeightEntry = (entry: WeightEntry) => {
    setWeightHistory(prev => {
      const filtered = prev.filter(e => e.date !== entry.date);
      return [entry, ...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  };

  // Unlock skill
  const unlockSkill = (skill: UnlockedSkill) => {
    setUnlockedSkills(prev => [...prev, skill]);
  };

  // Add XP and handle level ups
  const addXP = (amount: number, source: string) => {
    setStats(prev => {
      let newXP = prev.xp + amount;
      let newLevel = prev.level;
      let newXPToNextLevel = prev.xpToNextLevel;

      // Check for level up
      while (newXP >= newXPToNextLevel) {
        newXP -= newXPToNextLevel;
        newLevel += 1;
        newXPToNextLevel = Math.floor(newXPToNextLevel * 1.5); // 50% increase per level
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newXPToNextLevel,
        totalXpEarned: prev.totalXpEarned + amount
      };
    });

    console.log(`+${amount} XP from ${source}`);
  };

  // Update streak
  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastWorkout = stats.lastWorkoutDate;

    if (!lastWorkout) {
      setStats(prev => ({ ...prev, streak: 1, lastWorkoutDate: today }));
      return;
    }

    const lastDate = new Date(lastWorkout);
    const currentDate = new Date(today);
    const daysDiff = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      // Same day, no change
      return;
    } else if (daysDiff === 1) {
      // Consecutive day
      setStats(prev => ({
        ...prev,
        streak: prev.streak + 1,
        longestStreak: Math.max(prev.longestStreak, prev.streak + 1),
        lastWorkoutDate: today
      }));
    } else {
      // Streak broken
      setStats(prev => ({
        ...prev,
        streak: 1,
        lastWorkoutDate: today
      }));
    }
  };

  // Clear all data
  const clearAllData = () => {
    setProfile(null);
    setStats(defaultStats);
    setGoals(defaultGoals);
    setWorkouts([]);
    setNutritionLogs([]);
    setWeightHistory([]);
    setActiveQuests([]);
    setUnlockedSkills([]);
  };

  // Export all data
  const exportData = (): string => {
    return JSON.stringify({
      profile,
      stats,
      goals,
      workouts,
      nutritionLogs,
      weightHistory,
      activeQuests,
      unlockedSkills,
      exportedAt: new Date().toISOString()
    }, null, 2);
  };

  const value: AppContextType = {
    profile,
    setProfile,
    stats,
    setStats,
    goals,
    setGoals,
    workouts,
    addWorkout,
    updateWorkout,
    nutritionLogs,
    addNutritionLog,
    getTodayNutrition,
    weightHistory,
    addWeightEntry,
    activeQuests,
    setActiveQuests,
    unlockedSkills,
    unlockSkill,
    addXP,
    updateStreak,
    clearAllData,
    exportData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ============================================
// CUSTOM HOOK
// ============================================

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
