import React, { useState } from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';
import { useApp } from '../contexts/AppContext';

export const ProfileView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { profile, stats, goals, workouts, weightHistory, clearAllData, exportData } = useApp();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  // Calculate stats
  const totalWorkouts = workouts.length;
  const totalVolume = workouts.reduce((acc, w) => acc + w.totalVolume, 0);
  const avgWorkoutDuration = workouts.length > 0
    ? Math.round(workouts.reduce((acc, w) => acc + (w.duration || 0), 0) / workouts.length)
    : 0;

  // Weight change calculation
  const firstWeight = weightHistory[weightHistory.length - 1]?.weight || 0;
  const currentWeight = weightHistory[0]?.weight || 0;
  const weightChange = currentWeight - firstWeight;

  // Handle logout
  const handleLogout = () => {
    clearAllData();
    setView(View.LOGIN);
  };

  // Handle export
  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `titan-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  const getGoalLabel = () => {
    switch (goals.primaryGoal) {
      case 'strength': return 'Titan Strength';
      case 'shredded': return 'Shredded';
      case 'performance': return 'Performance';
      default: return 'Not set';
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header title="Profile" leftIcon="arrow_back" onLeftClick={() => setView(View.DASHBOARD)} rightIcon="settings" onRightClick={() => setView(View.SETTINGS)} />

        <div className="flex-1 overflow-y-auto p-4 pb-24">
          {/* Profile Header */}
          <div className="text-center mb-6">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-full h-full rounded-full border-4 border-neon p-1 overflow-hidden">
                <img
                  src={profile?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=titan"}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-neon text-black text-xs font-bold px-3 py-1 rounded-full">
                LVL {stats.level}
              </div>
            </div>
            <h1 className="text-2xl font-bold">{profile?.name || 'Titan'}</h1>
            <p className="text-gray-400 text-sm">{profile?.email || 'No email set'}</p>
            <p className="text-neon text-xs mt-1">{getGoalLabel()} Path</p>
          </div>

          {/* XP Progress */}
          <GlassCard className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Experience Points</span>
              <span className="text-neon font-bold">{stats.totalXpEarned} Total XP</span>
            </div>
            <div className="w-full bg-black/50 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-neon to-green-400 h-full transition-all duration-500"
                style={{ width: `${(stats.xp / stats.xpToNextLevel) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{stats.xp} XP</span>
              <span>{stats.xpToNextLevel - stats.xp} XP to Level {stats.level + 1}</span>
            </div>
          </GlassCard>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <GlassCard className="text-center">
              <span className="material-symbols-rounded text-3xl text-orange-400 mb-2">local_fire_department</span>
              <p className="text-2xl font-bold">{stats.streak}</p>
              <p className="text-xs text-gray-400">Day Streak</p>
              <p className="text-xs text-gray-500 mt-1">Best: {stats.longestStreak}</p>
            </GlassCard>

            <GlassCard className="text-center">
              <span className="material-symbols-rounded text-3xl text-blue-400 mb-2">fitness_center</span>
              <p className="text-2xl font-bold">{totalWorkouts}</p>
              <p className="text-xs text-gray-400">Workouts</p>
              <p className="text-xs text-gray-500 mt-1">Avg: {avgWorkoutDuration} min</p>
            </GlassCard>

            <GlassCard className="text-center">
              <span className="material-symbols-rounded text-3xl text-purple-400 mb-2">monitoring</span>
              <p className="text-2xl font-bold">{(totalVolume / 1000).toFixed(1)}k</p>
              <p className="text-xs text-gray-400">Total Volume (kg)</p>
            </GlassCard>

            <GlassCard className="text-center">
              <span className="material-symbols-rounded text-3xl text-green-400 mb-2">scale</span>
              <p className="text-2xl font-bold">{currentWeight || '—'}</p>
              <p className="text-xs text-gray-400">Current Weight</p>
              {weightChange !== 0 && (
                <p className={`text-xs mt-1 ${weightChange < 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg
                </p>
              )}
            </GlassCard>
          </div>

          {/* Account Info */}
          <GlassCard className="mb-4">
            <h3 className="text-sm text-gray-400 uppercase font-bold mb-4">Account</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Training Frequency</span>
                <span className="font-bold">{goals.weeklyWorkoutFrequency}x / week</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Coach Personality</span>
                <span className="font-bold">{goals.coachPersonality}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Nudge Intensity</span>
                <span className="font-bold capitalize">{goals.nudgeIntensity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Member Since</span>
                <span className="font-bold">
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    : '—'}
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <GlassCard className="text-center py-3 cursor-pointer" onClick={() => setView(View.BADGE_GALLERY)}>
              <span className="material-symbols-rounded text-yellow-400 text-2xl mb-1">emoji_events</span>
              <p className="text-xs font-medium">Badges</p>
            </GlassCard>
            <GlassCard className="text-center py-3 cursor-pointer" onClick={() => setView(View.LEADERBOARD)}>
              <span className="material-symbols-rounded text-purple-400 text-2xl mb-1">leaderboard</span>
              <p className="text-xs font-medium">Leaderboard</p>
            </GlassCard>
          </div>

          {/* Currency */}
          <GlassCard className="mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="material-symbols-rounded text-yellow-400 text-2xl">toll</span>
                <div>
                  <p className="font-bold">{stats.currency} Titan Coins</p>
                  <p className="text-xs text-gray-400">Spend in XP Shop</p>
                </div>
              </div>
              <Button variant="secondary" onClick={() => setView(View.XP_SHOP)}>
                Shop
              </Button>
            </div>
          </GlassCard>

          {/* Actions */}
          <div className="space-y-3">
            <Button variant="secondary" fullWidth onClick={handleExport}>
              <span className="material-symbols-rounded mr-2">download</span>
              Export Data Backup
            </Button>

            <Button
              variant="secondary"
              fullWidth
              className="text-red-400 border-red-400/30 hover:bg-red-500/10"
              onClick={() => setShowLogoutConfirm(true)}
            >
              <span className="material-symbols-rounded mr-2">logout</span>
              Log Out
            </Button>
          </div>

          {/* Export Success Toast */}
          {showExportSuccess && (
            <div className="fixed bottom-24 left-4 right-4 glass-panel rounded-xl p-4 flex items-center gap-3 z-50">
              <span className="material-symbols-rounded text-neon">check_circle</span>
              <span>Backup downloaded successfully!</span>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowLogoutConfirm(false)} />
          <div className="relative glass-modal rounded-3xl w-full max-w-sm p-6 text-center">
            <span className="material-symbols-rounded text-5xl text-red-400 mb-4">warning</span>
            <h3 className="text-xl font-bold mb-2">Log Out?</h3>
            <p className="text-gray-400 text-sm mb-6">
              This will clear all your local data. Make sure you've exported a backup first!
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setShowLogoutConfirm(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-500 hover:bg-red-600"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
