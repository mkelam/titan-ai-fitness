import React, { useState } from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';
import { useApp } from '../contexts/AppContext';

interface MonthStat {
  label: string;
  value: string | number;
  change?: number;
  icon: string;
  color: string;
}

export const MonthlyReviewView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { stats, workouts, weightHistory, profile } = useApp();
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentMonth = months[activeMonth];
  const currentYear = new Date().getFullYear();

  // Calculate monthly stats
  const monthWorkouts = workouts.filter(w => {
    const date = new Date(w.date);
    return date.getMonth() === activeMonth && date.getFullYear() === currentYear;
  });

  const totalVolume = monthWorkouts.reduce((acc, w) => acc + w.totalVolume, 0);
  const totalWorkouts = monthWorkouts.length;
  const totalXpEarned = monthWorkouts.reduce((acc, w) => acc + (w.xpEarned || 0), 0);

  // Weight progress this month
  const monthWeights = weightHistory.filter(w => {
    const date = new Date(w.date);
    return date.getMonth() === activeMonth && date.getFullYear() === currentYear;
  });
  const startWeight = monthWeights[monthWeights.length - 1]?.weight;
  const endWeight = monthWeights[0]?.weight;
  const weightChange = startWeight && endWeight ? (endWeight - startWeight).toFixed(1) : 0;

  const monthStats: MonthStat[] = [
    {
      label: 'Workouts',
      value: totalWorkouts,
      change: 12,
      icon: 'fitness_center',
      color: 'text-blue-400'
    },
    {
      label: 'Volume Lifted',
      value: `${(totalVolume / 1000).toFixed(1)}k kg`,
      change: 8,
      icon: 'monitoring',
      color: 'text-purple-400'
    },
    {
      label: 'XP Earned',
      value: totalXpEarned.toLocaleString(),
      change: 15,
      icon: 'bolt',
      color: 'text-yellow-400'
    },
    {
      label: 'Weight Change',
      value: `${Number(weightChange) > 0 ? '+' : ''}${weightChange} kg`,
      icon: 'scale',
      color: Number(weightChange) <= 0 ? 'text-green-400' : 'text-red-400'
    }
  ];

  // Achievements this month
  const achievements = [
    { name: 'Week Warrior', icon: 'whatshot', unlocked: stats.longestStreak >= 7 },
    { name: 'Iron Initiate', icon: 'fitness_center', unlocked: totalVolume >= 1000 },
    { name: 'Consistent', icon: 'schedule', unlocked: totalWorkouts >= 12 },
    { name: 'PR Hunter', icon: 'emoji_events', unlocked: false },
  ];

  // Best lifts of the month (mock data)
  const bestLifts = [
    { exercise: 'Bench Press', weight: 85, reps: 5, date: '2024-01-15' },
    { exercise: 'Squat', weight: 120, reps: 3, date: '2024-01-18' },
    { exercise: 'Deadlift', weight: 140, reps: 2, date: '2024-01-22' },
  ];

  // Grade based on consistency
  const getGrade = () => {
    if (totalWorkouts >= 20) return { grade: 'A+', label: 'Elite', color: 'text-yellow-400' };
    if (totalWorkouts >= 16) return { grade: 'A', label: 'Excellent', color: 'text-green-400' };
    if (totalWorkouts >= 12) return { grade: 'B', label: 'Good', color: 'text-blue-400' };
    if (totalWorkouts >= 8) return { grade: 'C', label: 'Average', color: 'text-orange-400' };
    return { grade: 'D', label: 'Needs Work', color: 'text-red-400' };
  };

  const gradeInfo = getGrade();

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header
          title="Monthly Review"
          leftIcon="arrow_back"
          onLeftClick={() => setView(View.DASHBOARD)}
          rightIcon="calendar_month"
        />

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Month Selector */}
          <div className="px-6 pt-4 mb-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActiveMonth(prev => Math.max(0, prev - 1))}
                className="w-10 h-10 rounded-full glass-light flex items-center justify-center"
              >
                <span className="material-symbols-rounded">chevron_left</span>
              </button>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{currentMonth}</h2>
                <p className="text-white/70 text-sm">{currentYear}</p>
              </div>
              <button
                onClick={() => setActiveMonth(prev => Math.min(11, prev + 1))}
                className="w-10 h-10 rounded-full glass-light flex items-center justify-center"
              >
                <span className="material-symbols-rounded">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Grade Card */}
          <div className="px-6 mb-6">
            <GlassCard className="bg-gradient-to-br from-indigo-900/30 to-black border border-indigo-500/30">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center">
                  <span className={`text-4xl font-black ${gradeInfo.color}`}>{gradeInfo.grade}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{gradeInfo.label} Month</h3>
                  <p className="text-white/70 text-sm">
                    {totalWorkouts} workouts completed this month
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-neon">
                    <span className="material-symbols-rounded text-sm">trending_up</span>
                    <span>Better than 65% of users</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Stats Grid */}
          <div className="px-6 mb-6">
            <h3 className="text-sm text-white/70 uppercase tracking-wider mb-3">Month Overview</h3>
            <div className="grid grid-cols-2 gap-3">
              {monthStats.map((stat, i) => (
                <GlassCard key={i} className="text-center">
                  <span className={`material-symbols-rounded ${stat.color} text-2xl mb-2`}>
                    {stat.icon}
                  </span>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-white/70">{stat.label}</p>
                  {stat.change && (
                    <div className="flex items-center justify-center gap-1 mt-1 text-xs text-green-400">
                      <span className="material-symbols-rounded text-xs">arrow_upward</span>
                      <span>{stat.change}%</span>
                    </div>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Best Lifts */}
          <div className="px-6 mb-6">
            <h3 className="text-sm text-white/70 uppercase tracking-wider mb-3">Personal Bests</h3>
            <GlassCard>
              {bestLifts.map((lift, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-3 ${
                    i !== bestLifts.length - 1 ? 'border-b border-white/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                      <span className="material-symbols-rounded text-yellow-400">emoji_events</span>
                    </div>
                    <div>
                      <p className="font-bold">{lift.exercise}</p>
                      <p className="text-xs text-white/70">{lift.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-neon">{lift.weight} kg</p>
                    <p className="text-xs text-white/70">x{lift.reps} reps</p>
                  </div>
                </div>
              ))}
            </GlassCard>
          </div>

          {/* Achievements Unlocked */}
          <div className="px-6 mb-6">
            <h3 className="text-sm text-white/70 uppercase tracking-wider mb-3">Achievements</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {achievements.map((ach, i) => (
                <div
                  key={i}
                  className={`flex-shrink-0 w-20 text-center p-3 rounded-xl ${
                    ach.unlocked
                      ? 'bg-gradient-to-br from-yellow-500/20 to-amber-600/20 border border-yellow-500/30'
                      : 'bg-black/30 border border-white/5 opacity-50'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                    ach.unlocked ? 'bg-white/10' : 'bg-black/30'
                  }`}>
                    <span className={`material-symbols-rounded text-xl ${
                      ach.unlocked ? 'text-yellow-400' : 'text-white/40'
                    }`}>
                      {ach.unlocked ? ach.icon : 'lock'}
                    </span>
                  </div>
                  <p className="text-[10px] font-medium">{ach.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Summary */}
          <div className="px-6 mb-6">
            <GlassCard className="border-l-4 border-l-neon bg-neon/5">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-neon/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-rounded text-neon">smart_toy</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neon mb-1">AI ANALYSIS</h4>
                  <p className="text-sm text-white/80">
                    Great progress this month, {profile?.name || 'Champion'}! Your consistency has improved by 15%.
                    Focus on increasing your squat frequency next month to balance your leg development.
                    You're on track to hit your goals!
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-6">
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setView(View.COMPARISON_ENGINE)}>
                <span className="material-symbols-rounded mr-2 text-sm">compare</span>
                Compare
              </Button>
              <Button className="flex-1" onClick={() => setView(View.DASHBOARD)}>
                <span className="material-symbols-rounded mr-2 text-sm">share</span>
                Share Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
