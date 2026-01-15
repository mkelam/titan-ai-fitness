import React, { useState } from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';
import { useApp } from '../contexts/AppContext';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
  target?: number;
  category: 'streak' | 'strength' | 'consistency' | 'nutrition' | 'social' | 'special';
}

export const BadgeGalleryView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { stats, workouts } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | Badge['category']>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Badge definitions
  const badges: Badge[] = [
    // Streak Badges
    {
      id: 'first_flame',
      name: 'First Flame',
      description: 'Complete your first workout',
      icon: 'local_fire_department',
      color: 'text-orange-400',
      rarity: 'common',
      unlocked: workouts.length > 0,
      unlockedDate: workouts[workouts.length - 1]?.date,
      category: 'streak'
    },
    {
      id: 'week_warrior',
      name: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: 'whatshot',
      color: 'text-orange-500',
      rarity: 'rare',
      unlocked: stats.longestStreak >= 7,
      progress: Math.min(stats.streak, 7),
      target: 7,
      category: 'streak'
    },
    {
      id: 'monthly_titan',
      name: 'Monthly Titan',
      description: 'Maintain a 30-day streak',
      icon: 'local_fire_department',
      color: 'text-red-500',
      rarity: 'epic',
      unlocked: stats.longestStreak >= 30,
      progress: Math.min(stats.streak, 30),
      target: 30,
      category: 'streak'
    },
    {
      id: 'eternal_flame',
      name: 'Eternal Flame',
      description: 'Maintain a 100-day streak',
      icon: 'mode_heat',
      color: 'text-yellow-400',
      rarity: 'legendary',
      unlocked: stats.longestStreak >= 100,
      progress: Math.min(stats.streak, 100),
      target: 100,
      category: 'streak'
    },
    // Strength Badges
    {
      id: 'iron_initiate',
      name: 'Iron Initiate',
      description: 'Lift 1,000 kg total volume',
      icon: 'fitness_center',
      color: 'text-gray-400',
      rarity: 'common',
      unlocked: workouts.reduce((acc, w) => acc + w.totalVolume, 0) >= 1000,
      progress: workouts.reduce((acc, w) => acc + w.totalVolume, 0),
      target: 1000,
      category: 'strength'
    },
    {
      id: 'steel_soldier',
      name: 'Steel Soldier',
      description: 'Lift 10,000 kg total volume',
      icon: 'fitness_center',
      color: 'text-blue-400',
      rarity: 'rare',
      unlocked: workouts.reduce((acc, w) => acc + w.totalVolume, 0) >= 10000,
      progress: workouts.reduce((acc, w) => acc + w.totalVolume, 0),
      target: 10000,
      category: 'strength'
    },
    {
      id: 'titan_lifter',
      name: 'Titan Lifter',
      description: 'Lift 100,000 kg total volume',
      icon: 'fitness_center',
      color: 'text-purple-400',
      rarity: 'epic',
      unlocked: workouts.reduce((acc, w) => acc + w.totalVolume, 0) >= 100000,
      progress: workouts.reduce((acc, w) => acc + w.totalVolume, 0),
      target: 100000,
      category: 'strength'
    },
    // Consistency Badges
    {
      id: 'early_bird',
      name: 'Early Bird',
      description: 'Complete 5 morning workouts',
      icon: 'wb_sunny',
      color: 'text-yellow-400',
      rarity: 'common',
      unlocked: false,
      progress: 2,
      target: 5,
      category: 'consistency'
    },
    {
      id: 'night_owl',
      name: 'Night Owl',
      description: 'Complete 5 evening workouts',
      icon: 'dark_mode',
      color: 'text-indigo-400',
      rarity: 'common',
      unlocked: false,
      progress: 3,
      target: 5,
      category: 'consistency'
    },
    {
      id: 'weekend_warrior',
      name: 'Weekend Warrior',
      description: 'Train 10 weekends in a row',
      icon: 'calendar_month',
      color: 'text-green-400',
      rarity: 'rare',
      unlocked: false,
      progress: 4,
      target: 10,
      category: 'consistency'
    },
    // Nutrition Badges
    {
      id: 'protein_champion',
      name: 'Protein Champion',
      description: 'Hit protein goal 7 days straight',
      icon: 'egg',
      color: 'text-red-400',
      rarity: 'rare',
      unlocked: false,
      progress: 3,
      target: 7,
      category: 'nutrition'
    },
    {
      id: 'macro_master',
      name: 'Macro Master',
      description: 'Perfect macros for 30 days',
      icon: 'pie_chart',
      color: 'text-purple-400',
      rarity: 'epic',
      unlocked: false,
      progress: 12,
      target: 30,
      category: 'nutrition'
    },
    // Social Badges
    {
      id: 'team_player',
      name: 'Team Player',
      description: 'Join a team',
      icon: 'groups',
      color: 'text-blue-400',
      rarity: 'common',
      unlocked: false,
      category: 'social'
    },
    {
      id: 'motivator',
      name: 'Motivator',
      description: 'Cheer 10 teammates',
      icon: 'thumb_up',
      color: 'text-green-400',
      rarity: 'rare',
      unlocked: false,
      progress: 2,
      target: 10,
      category: 'social'
    },
    // Special Badges
    {
      id: 'founding_titan',
      name: 'Founding Titan',
      description: 'Early adopter badge',
      icon: 'star',
      color: 'text-yellow-400',
      rarity: 'legendary',
      unlocked: true,
      unlockedDate: '2024-01-01',
      category: 'special'
    },
  ];

  const categories = [
    { id: 'all' as const, label: 'All', icon: 'grid_view' },
    { id: 'streak' as const, label: 'Streak', icon: 'local_fire_department' },
    { id: 'strength' as const, label: 'Strength', icon: 'fitness_center' },
    { id: 'consistency' as const, label: 'Habits', icon: 'schedule' },
    { id: 'nutrition' as const, label: 'Nutrition', icon: 'restaurant' },
    { id: 'social' as const, label: 'Social', icon: 'groups' },
  ];

  const filteredBadges = activeCategory === 'all'
    ? badges
    : badges.filter(b => b.category === activeCategory);

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const totalCount = badges.length;

  const getRarityColor = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common': return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
      case 'rare': return 'from-blue-500/20 to-blue-600/20 border-blue-500/30';
      case 'epic': return 'from-purple-500/20 to-purple-600/20 border-purple-500/30';
      case 'legendary': return 'from-yellow-500/20 to-amber-600/20 border-yellow-500/30';
    }
  };

  const getRarityLabel = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header
          title="Badge Gallery"
          leftIcon="arrow_back"
          onLeftClick={() => setView(View.DASHBOARD)}
          rightIcon="emoji_events"
        />

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Hero Section */}
          <div className="p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-600/20 flex items-center justify-center border border-yellow-500/30">
              <span className="material-symbols-rounded text-yellow-400 text-4xl">emoji_events</span>
            </div>
            <h2 className="text-2xl font-bold mb-1">Trophy Room</h2>
            <p className="text-gray-400">
              <span className="text-neon font-bold">{unlockedCount}</span> / {totalCount} Badges Unlocked
            </p>
            <div className="w-48 mx-auto bg-black/50 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-amber-400"
                style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>

          {/* Featured Badge */}
          {badges.filter(b => b.unlocked).length > 0 && (
            <div className="px-6 mb-6">
              <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-3">Featured Achievement</h3>
              <GlassCard className="bg-gradient-to-br from-yellow-900/30 to-black border border-yellow-500/30">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <span className="material-symbols-rounded text-yellow-400 text-3xl">
                      {badges.find(b => b.unlocked && b.rarity === 'legendary')?.icon || 'star'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-lg">
                        {badges.find(b => b.unlocked && b.rarity === 'legendary')?.name || 'First Badge'}
                      </h4>
                      <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full uppercase">
                        Legendary
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {badges.find(b => b.unlocked && b.rarity === 'legendary')?.description || 'Keep going!'}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {/* Category Filter */}
          <div className="px-6 mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-neon text-black'
                      : 'glass-light text-gray-400'
                  }`}
                >
                  <span className="material-symbols-rounded text-sm">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Badge Grid */}
          <div className="px-6">
            <div className="grid grid-cols-3 gap-3">
              {filteredBadges.map(badge => (
                <div
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className={`cursor-pointer rounded-xl p-3 text-center transition-all border ${
                    badge.unlocked
                      ? `bg-gradient-to-br ${getRarityColor(badge.rarity)}`
                      : 'bg-black/30 border-white/5 opacity-50'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                    badge.unlocked ? 'bg-white/10' : 'bg-black/30'
                  }`}>
                    <span className={`material-symbols-rounded text-2xl ${
                      badge.unlocked ? badge.color : 'text-gray-600'
                    }`}>
                      {badge.unlocked ? badge.icon : 'lock'}
                    </span>
                  </div>
                  <p className={`text-xs font-medium ${badge.unlocked ? '' : 'text-gray-500'}`}>
                    {badge.name}
                  </p>
                  {!badge.unlocked && badge.progress !== undefined && (
                    <div className="mt-2">
                      <div className="w-full bg-black/50 h-1 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-500"
                          style={{ width: `${(badge.progress / (badge.target || 1)) * 100}%` }}
                        />
                      </div>
                      <p className="text-[9px] text-gray-500 mt-1">{badge.progress}/{badge.target}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedBadge(null)} />
          <div className={`relative glass-modal rounded-3xl w-full max-w-sm p-6 text-center border ${
            selectedBadge.unlocked ? getRarityColor(selectedBadge.rarity) : 'border-white/10'
          }`}>
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
              selectedBadge.unlocked ? 'bg-white/10' : 'bg-black/30'
            }`}>
              <span className={`material-symbols-rounded text-4xl ${
                selectedBadge.unlocked ? selectedBadge.color : 'text-gray-600'
              }`}>
                {selectedBadge.unlocked ? selectedBadge.icon : 'lock'}
              </span>
            </div>

            <span className={`text-xs uppercase font-bold ${getRarityLabel(selectedBadge.rarity)}`}>
              {selectedBadge.rarity}
            </span>

            <h3 className="text-xl font-bold mt-2 mb-1">{selectedBadge.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{selectedBadge.description}</p>

            {selectedBadge.unlocked ? (
              <div className="glass-light rounded-xl p-3 mb-4">
                <p className="text-xs text-gray-400">Unlocked on</p>
                <p className="font-bold">{selectedBadge.unlockedDate || 'Recently'}</p>
              </div>
            ) : selectedBadge.progress !== undefined ? (
              <div className="mb-4">
                <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-neon"
                    style={{ width: `${(selectedBadge.progress / (selectedBadge.target || 1)) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400">
                  {selectedBadge.progress} / {selectedBadge.target}
                </p>
              </div>
            ) : null}

            <Button fullWidth onClick={() => setSelectedBadge(null)}>
              {selectedBadge.unlocked ? 'AWESOME!' : 'KEEP GOING'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
