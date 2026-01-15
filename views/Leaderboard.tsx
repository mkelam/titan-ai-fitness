import React, { useState } from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';
import { useApp } from '../contexts/AppContext';

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  change: 'up' | 'down' | 'same';
  isCurrentUser?: boolean;
}

export const LeaderboardView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { profile, stats } = useApp();
  const [activeTab, setActiveTab] = useState<'global' | 'friends' | 'local'>('global');
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');

  // Mock leaderboard data
  const leaderboardData: LeaderboardUser[] = [
    { rank: 1, name: 'IronTitan_X', avatar: '', xp: 45200, level: 42, streak: 156, change: 'same' },
    { rank: 2, name: 'BeastMode99', avatar: '', xp: 42800, level: 40, streak: 89, change: 'up' },
    { rank: 3, name: 'GymCrusher', avatar: '', xp: 41500, level: 39, streak: 67, change: 'down' },
    { rank: 4, name: 'PowerLifter_Pro', avatar: '', xp: 38900, level: 37, streak: 45, change: 'up' },
    { rank: 5, name: 'FitWarrior', avatar: '', xp: 36200, level: 35, streak: 34, change: 'same' },
    { rank: 6, name: 'MuscleKing', avatar: '', xp: 34100, level: 33, streak: 28, change: 'up' },
    { rank: 7, name: profile?.name || 'You', avatar: '', xp: stats.totalXpEarned, level: stats.level, streak: stats.streak, change: 'up', isCurrentUser: true },
    { rank: 8, name: 'IronWill', avatar: '', xp: 28500, level: 28, streak: 21, change: 'down' },
    { rank: 9, name: 'Titan_Slayer', avatar: '', xp: 26800, level: 26, streak: 18, change: 'same' },
    { rank: 10, name: 'SwolePatrol', avatar: '', xp: 25100, level: 25, streak: 15, change: 'up' },
  ];

  // Sort by XP for display
  const sortedLeaderboard = [...leaderboardData].sort((a, b) => b.xp - a.xp).map((user, index) => ({
    ...user,
    rank: index + 1
  }));

  const currentUserRank = sortedLeaderboard.find(u => u.isCurrentUser)?.rank || 0;
  const topThree = sortedLeaderboard.slice(0, 3);
  const restOfList = sortedLeaderboard.slice(3);

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-500/30 to-amber-600/20 border-yellow-500/50';
      case 2: return 'from-gray-400/30 to-gray-500/20 border-gray-400/50';
      case 3: return 'from-amber-700/30 to-orange-800/20 border-amber-700/50';
      default: return 'from-transparent to-transparent border-white/10';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return { icon: 'emoji_events', color: 'text-yellow-400' };
      case 2: return { icon: 'emoji_events', color: 'text-gray-300' };
      case 3: return { icon: 'emoji_events', color: 'text-amber-600' };
      default: return null;
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header
          title="Leaderboard"
          leftIcon="arrow_back"
          onLeftClick={() => setView(View.DASHBOARD)}
          rightIcon="filter_list"
        />

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Tab Selection */}
          <div className="px-6 pt-4 mb-4">
            <div className="flex gap-2 glass-panel rounded-full p-1">
              {[
                { id: 'global' as const, label: 'Global' },
                { id: 'friends' as const, label: 'Friends' },
                { id: 'local' as const, label: 'Local' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id ? 'bg-neon text-black' : 'text-gray-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Timeframe Filter */}
          <div className="px-6 mb-6">
            <div className="flex gap-2">
              {[
                { id: 'weekly' as const, label: 'This Week' },
                { id: 'monthly' as const, label: 'This Month' },
                { id: 'alltime' as const, label: 'All Time' },
              ].map(tf => (
                <button
                  key={tf.id}
                  onClick={() => setTimeframe(tf.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    timeframe === tf.id ? 'bg-white/20 text-white' : 'text-gray-500'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Podium - Top 3 */}
          <div className="px-6 mb-6">
            <div className="flex items-end justify-center gap-3">
              {/* 2nd Place */}
              <div className="flex-1 text-center">
                <div className="w-16 h-16 mx-auto rounded-full border-2 border-gray-400 p-1 mb-2">
                  <div className="w-full h-full rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="text-xl font-bold">{topThree[1]?.name[0]}</span>
                  </div>
                </div>
                <span className="material-symbols-rounded text-gray-300 text-xl">emoji_events</span>
                <p className="font-bold text-sm truncate">{topThree[1]?.name}</p>
                <p className="text-xs text-gray-400">{topThree[1]?.xp.toLocaleString()} XP</p>
                <div className="h-20 bg-gradient-to-t from-gray-500/20 to-transparent rounded-t-xl mt-2 flex items-end justify-center pb-2">
                  <span className="text-2xl font-bold text-gray-400">2</span>
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex-1 text-center">
                <div className="w-20 h-20 mx-auto rounded-full border-4 border-yellow-400 p-1 mb-2 shadow-[0_0_20px_rgba(250,204,21,0.4)]">
                  <div className="w-full h-full rounded-full bg-yellow-600 flex items-center justify-center">
                    <span className="text-2xl font-bold">{topThree[0]?.name[0]}</span>
                  </div>
                </div>
                <span className="material-symbols-rounded text-yellow-400 text-2xl">emoji_events</span>
                <p className="font-bold truncate">{topThree[0]?.name}</p>
                <p className="text-xs text-yellow-400">{topThree[0]?.xp.toLocaleString()} XP</p>
                <div className="h-28 bg-gradient-to-t from-yellow-500/20 to-transparent rounded-t-xl mt-2 flex items-end justify-center pb-2">
                  <span className="text-3xl font-bold text-yellow-400">1</span>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex-1 text-center">
                <div className="w-16 h-16 mx-auto rounded-full border-2 border-amber-600 p-1 mb-2">
                  <div className="w-full h-full rounded-full bg-amber-700 flex items-center justify-center">
                    <span className="text-xl font-bold">{topThree[2]?.name[0]}</span>
                  </div>
                </div>
                <span className="material-symbols-rounded text-amber-600 text-xl">emoji_events</span>
                <p className="font-bold text-sm truncate">{topThree[2]?.name}</p>
                <p className="text-xs text-gray-400">{topThree[2]?.xp.toLocaleString()} XP</p>
                <div className="h-16 bg-gradient-to-t from-amber-700/20 to-transparent rounded-t-xl mt-2 flex items-end justify-center pb-2">
                  <span className="text-2xl font-bold text-amber-600">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Your Rank Card */}
          <div className="px-6 mb-4">
            <GlassCard className="border border-neon/30 bg-neon/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center">
                  <span className="text-neon font-bold">{currentUserRank}</span>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-neon p-0.5">
                  <div className="w-full h-full rounded-full bg-neon/30 flex items-center justify-center">
                    <span className="font-bold">{profile?.name?.[0] || 'Y'}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-bold">{profile?.name || 'You'}</p>
                  <p className="text-xs text-gray-400">Level {stats.level}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-neon">{stats.totalXpEarned.toLocaleString()} XP</p>
                  <div className="flex items-center gap-1 text-xs text-green-400">
                    <span className="material-symbols-rounded text-sm">arrow_upward</span>
                    <span>+3</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Rest of Leaderboard */}
          <div className="px-6">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-3">Rankings</h3>
            {restOfList.map(user => (
              <div
                key={user.rank}
                className={`flex items-center gap-3 p-3 rounded-xl mb-2 ${
                  user.isCurrentUser ? 'bg-neon/10 border border-neon/30' : 'glass-light'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-gray-400">
                  {user.rank}
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="font-bold">{user.name[0]}</span>
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${user.isCurrentUser ? 'text-neon' : ''}`}>{user.name}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Lvl {user.level}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <span className="material-symbols-rounded text-orange-400 text-xs">local_fire_department</span>
                      {user.streak}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{user.xp.toLocaleString()}</p>
                  <div className={`flex items-center gap-0.5 text-xs ${
                    user.change === 'up' ? 'text-green-400' :
                    user.change === 'down' ? 'text-red-400' : 'text-gray-500'
                  }`}>
                    <span className="material-symbols-rounded text-sm">
                      {user.change === 'up' ? 'arrow_upward' :
                       user.change === 'down' ? 'arrow_downward' : 'remove'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Season Info */}
          <div className="px-6 mt-6">
            <GlassCard className="text-center">
              <span className="material-symbols-rounded text-purple-400 text-2xl mb-2">calendar_month</span>
              <h4 className="font-bold">Season 4: Berserker Phase</h4>
              <p className="text-xs text-gray-400 mb-3">Ends in 14 days</p>
              <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-3/4" />
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};
