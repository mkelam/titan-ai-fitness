import React, { useState } from 'react';
import { View } from '../types';
import { GlassCard } from '../components/UI';
import { DashboardWidget, WeightEntryModal, PhotoUploadModal, QuickCalorieModal } from '../components/DashboardWidgets';
import { useApp } from '../contexts/AppContext';

export const DashboardView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { profile, stats, weightHistory, getTodayNutrition, workouts } = useApp();
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showCalorieModal, setShowCalorieModal] = useState(false);

  // Get today's data
  const todayNutrition = getTodayNutrition();
  const latestWeight = weightHistory[0];
  const todayWorkout = workouts.find(w => w.date === new Date().toISOString().split('T')[0]);

  // Check if weekly photo is due (last photo > 7 days ago)
  const lastPhotoDate = weightHistory.find(e => e.photos && e.photos.length > 0)?.date;
  const isPhotoDue = !lastPhotoDate ||
    (new Date().getTime() - new Date(lastPhotoDate).getTime()) / (1000 * 60 * 60 * 24) >= 7;

  const userName = profile?.name || 'Champion';
  const userLevel = stats.level;
  const userStreak = stats.streak;

  return (
    <div className="h-full overflow-y-auto pb-24">
      {/* Hero Section - Character Sheet */}
      <div className="relative p-6 pt-12 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/30 to-transparent z-[-1]" />
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-rounded text-neon text-sm">verified</span>
              <span className="text-xs font-bold text-neon tracking-widest uppercase">Level {userLevel}</span>
            </div>
            <h1 className="text-3xl font-bold">{userName}</h1>
            <p className="text-gray-400 text-sm">Iron Lifter • {stats.totalXpEarned} total XP</p>
          </div>
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-neon p-1">
              <img src={profile?.avatar || "https://picsum.photos/100/100"} className="w-full h-full rounded-full object-cover grayscale" alt="Avatar" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-black/80 text-neon text-xs px-2 py-1 rounded-full border border-neon/30">
              ⚡ {stats.xp}/{stats.xpToNextLevel}
            </div>
          </div>
        </div>

        {/* Buffs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {stats.streak > 7 && (
            <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10 text-xs">
              <span className="material-symbols-rounded text-orange-400 text-sm">local_fire_department</span>
              <span>On Fire ({stats.streak} days)</span>
            </div>
          )}
          <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10 text-xs">
            <span className="material-symbols-rounded text-blue-400 text-sm">water_drop</span>
            <span>Hydrated</span>
          </div>
        </div>

        {/* Coach Nudge */}
        <GlassCard className="bg-gradient-to-br from-green-900/40 to-black border-l-4 border-l-neon" onClick={() => setView(View.AI_COACH_CHAT)}>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-rounded text-neon">smart_toy</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-neon mb-1">COACH NUDGE</h3>
              <p className="text-sm text-gray-200">
                {userStreak > 0
                  ? `Great momentum! You're on a ${userStreak}-day streak. Ready for today's workout?`
                  : "Let's get started! Log your first workout to begin your journey."}
              </p>
              <div className="mt-3 flex gap-2">
                <button className="bg-neon text-black text-xs font-bold px-4 py-2 rounded-lg">START SESSION</button>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Quick Actions Grid */}
      <div className="px-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Quick Actions</h2>
          <button className="text-xs text-neon font-medium">Edit Grid</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DashboardWidget
            icon="scale"
            label="WEIGHT"
            value={latestWeight?.weight}
            unit="kg"
            meta={latestWeight ? "Today" : "Log weight"}
            onClick={() => setView(View.PROGRESS_CHECKIN)}
          />
          <DashboardWidget
            icon="photo_camera"
            label="PROGRESS"
            status={isPhotoDue ? "Weekly Due" : "Up to date"}
            cta={isPhotoDue ? "Check-in now" : undefined}
            badge={isPhotoDue ? "due" : undefined}
            onClick={() => setView(View.PROGRESS_CHECKIN)}
          />
          <DashboardWidget
            icon="fitness_center"
            label="TRAINING"
            value={todayWorkout ? todayWorkout.phase.split(' ')[0] : "Leg Day"}
            meta={todayWorkout ? "Completed" : "Up Next: Squats"}
            onClick={() => setView(View.TRAINING_LOG)}
          />
          <DashboardWidget
            icon="restaurant"
            label="NUTRITION"
            value={todayNutrition?.calories || 0}
            progress={todayNutrition?.calories || 0}
            max={2500}
            meta="View Full Log"
            onClick={() => setView(View.NUTRITION_LOG)}
          />
        </div>
      </div>

      {/* Streak */}
      <div className="px-6 mb-4">
        <GlassCard onClick={() => setView(View.STREAK_CALENDAR)}>
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <span className="material-symbols-rounded text-orange-500 text-3xl">local_fire_department</span>
              <div>
                <h3 className="font-bold text-lg">{userStreak} Day Streak</h3>
                <p className="text-xs text-gray-400">
                  {userStreak > 0 ? 'Keep the fire burning' : 'Start your streak today'}
                </p>
              </div>
            </div>
            <span className="material-symbols-rounded text-gray-500">chevron_right</span>
          </div>
          {/* Heatmap mini - last 7 days */}
          <div className="flex gap-1 mt-4 justify-between opacity-50">
            {[1,1,1,1,0,1,1].map((a, i) => (
              <div key={i} className={`h-2 flex-1 rounded-full ${a ? 'bg-orange-500' : 'bg-gray-700'}`} />
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Quick Links */}
      <div className="px-6 mb-4">
        <div className="grid grid-cols-4 gap-3">
          <GlassCard className="text-center py-3 cursor-pointer" onClick={() => setView(View.QUEST_LOG)}>
            <span className="material-symbols-rounded text-green-400 text-2xl mb-1">swords</span>
            <p className="text-xs font-medium">Quests</p>
          </GlassCard>
          <GlassCard className="text-center py-3 cursor-pointer" onClick={() => setView(View.COMPARISON_ENGINE)}>
            <span className="material-symbols-rounded text-cyan-400 text-2xl mb-1">monitoring</span>
            <p className="text-xs font-medium">Analytics</p>
          </GlassCard>
          <GlassCard className="text-center py-3 cursor-pointer" onClick={() => setView(View.MONTHLY_REVIEW)}>
            <span className="material-symbols-rounded text-indigo-400 text-2xl mb-1">calendar_month</span>
            <p className="text-xs font-medium">Review</p>
          </GlassCard>
          <GlassCard className="text-center py-3 cursor-pointer" onClick={() => setView(View.XP_SHOP)}>
            <span className="material-symbols-rounded text-yellow-400 text-2xl mb-1">storefront</span>
            <p className="text-xs font-medium">Shop</p>
          </GlassCard>
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="px-6 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <GlassCard className="cursor-pointer" onClick={() => setView(View.RECOVERY_PLAN)}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-rounded text-purple-400 text-2xl">self_improvement</span>
              <div>
                <p className="font-bold text-sm">Recovery</p>
                <p className="text-xs text-gray-400">Rest & recharge</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="cursor-pointer" onClick={() => setView(View.GYM_CHECKIN)}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-rounded text-orange-400 text-2xl">location_on</span>
              <div>
                <p className="font-bold text-sm">Check In</p>
                <p className="text-xs text-gray-400">+10 XP</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Modals */}
      {showWeightModal && <WeightEntryModal onClose={() => setShowWeightModal(false)} />}
      {showPhotoModal && <PhotoUploadModal onClose={() => setShowPhotoModal(false)} />}
      {showCalorieModal && <QuickCalorieModal onClose={() => setShowCalorieModal(false)} />}
    </div>
  );
};
