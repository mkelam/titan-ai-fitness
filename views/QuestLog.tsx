import React, { useState } from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';
import { useApp } from '../contexts/AppContext';

interface Quest {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  progress: number;
  target: number;
  type: 'daily' | 'weekly' | 'bounty';
  icon: string;
  color: string;
  status: 'active' | 'completed' | 'missed';
}

export const QuestLogView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { stats, workouts, getTodayNutrition } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'daily' | 'weekly' | 'bounties'>('all');

  // Generate quests based on user activity
  const todayWorkout = workouts.find(w => w.date === new Date().toISOString().split('T')[0]);
  const todayNutrition = getTodayNutrition();

  const quests: Quest[] = [
    // Daily Quests
    {
      id: 'morning_momentum',
      name: 'Morning Momentum',
      description: 'Complete a workout before 10 AM',
      xpReward: 100,
      progress: todayWorkout ? 1 : 0,
      target: 1,
      type: 'daily',
      icon: 'wb_sunny',
      color: 'text-yellow-400',
      status: todayWorkout ? 'completed' : 'active'
    },
    {
      id: 'heavy_hitter',
      name: 'Heavy Hitter',
      description: 'Deadlift 100kg x 5',
      xpReward: 150,
      progress: 3,
      target: 5,
      type: 'daily',
      icon: 'fitness_center',
      color: 'text-red-400',
      status: 'active'
    },
    {
      id: 'hydration_station',
      name: 'Hydration Station',
      description: 'Drink 8+ glasses of water',
      xpReward: 50,
      progress: 5,
      target: 8,
      type: 'daily',
      icon: 'water_drop',
      color: 'text-blue-400',
      status: 'active'
    },
    {
      id: 'protein_protocol',
      name: 'Protein Protocol',
      description: 'Hit your daily protein goal',
      xpReward: 75,
      progress: todayNutrition?.protein || 0,
      target: 150,
      type: 'daily',
      icon: 'egg',
      color: 'text-orange-400',
      status: (todayNutrition?.protein || 0) >= 150 ? 'completed' : 'active'
    },
    // Weekly Quests
    {
      id: 'the_centurion',
      name: 'The Centurion',
      description: 'Complete 100 sets this week',
      xpReward: 1000,
      progress: 67,
      target: 100,
      type: 'weekly',
      icon: 'military_tech',
      color: 'text-purple-400',
      status: 'active'
    },
    {
      id: 'consistency_king',
      name: 'Consistency King',
      description: 'Train 5 days this week',
      xpReward: 500,
      progress: Math.min(workouts.filter(w => {
        const wDate = new Date(w.date);
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        return wDate >= weekStart;
      }).length, 5),
      target: 5,
      type: 'weekly',
      icon: 'local_fire_department',
      color: 'text-orange-500',
      status: 'active'
    },
    // Bounties (Special limited-time quests)
    {
      id: 'weekly_bounty_steps',
      name: 'Weekly Bounty: 20k Steps',
      description: 'Complete 20,000 steps this week',
      xpReward: 1200,
      progress: 14500,
      target: 20000,
      type: 'bounty',
      icon: 'directions_walk',
      color: 'text-emerald-400',
      status: 'active'
    },
  ];

  const filteredQuests = activeTab === 'all'
    ? quests
    : quests.filter(q => q.type === activeTab.replace('ies', 'y'));

  const activeQuests = quests.filter(q => q.status === 'active');
  const completedToday = quests.filter(q => q.status === 'completed').length;
  const totalDailyXp = quests.filter(q => q.type === 'daily').reduce((acc, q) => acc + q.xpReward, 0);

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header
          title="Quest Log"
          leftIcon="arrow_back"
          onLeftClick={() => setView(View.DASHBOARD)}
          rightIcon="history"
          onRightClick={() => setView(View.QUEST_HISTORY)}
        />

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Hero Stats */}
          <div className="p-6">
            <GlassCard className="bg-gradient-to-br from-green-900/30 to-black/50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-white/70 uppercase tracking-wider">Current Status</p>
                  <h2 className="text-2xl font-bold">Lvl {stats.level} Titan</h2>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/70">Daily XP</p>
                  <p className="text-xl font-bold text-neon">{stats.xp}<span className="text-white/70 text-sm">/{stats.xpToNextLevel}</span></p>
                </div>
              </div>

              {/* XP Progress Bar */}
              <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-neon to-green-400 transition-all"
                  style={{ width: `${(stats.xp / stats.xpToNextLevel) * 100}%` }}
                />
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-white/70">{completedToday} quests completed today</span>
                <span className="text-neon">+{totalDailyXp} XP available</span>
              </div>
            </GlassCard>
          </div>

          {/* Active Protocols Section */}
          <div className="px-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-rounded text-neon">bolt</span>
              <h3 className="font-bold text-sm uppercase tracking-wider">Active Protocols</h3>
            </div>

            {activeQuests.filter(q => q.type === 'daily').slice(0, 3).map(quest => (
              <GlassCard key={quest.id} className="mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full glass-light flex items-center justify-center ${quest.color}`}>
                    <span className="material-symbols-rounded">{quest.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold">{quest.name}</h4>
                      {quest.status === 'completed' && (
                        <span className="text-[10px] bg-neon/20 text-neon px-2 py-0.5 rounded-full">DONE</span>
                      )}
                    </div>
                    <p className="text-xs text-white/70">{quest.description}</p>
                    {quest.status === 'active' && (
                      <div className="mt-2">
                        <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-neon transition-all"
                            style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-white/50 mt-1">{quest.progress}/{quest.target}</p>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${quest.status === 'completed' ? 'text-neon' : 'text-white/70'}`}>
                      +{quest.xpReward} XP
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Weekly Bounty */}
          <div className="px-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-rounded text-yellow-400">stars</span>
              <h3 className="font-bold text-sm uppercase tracking-wider">Weekly Bounty</h3>
            </div>

            {quests.filter(q => q.type === 'bounty' || q.type === 'weekly').map(quest => (
              <GlassCard
                key={quest.id}
                className={`mb-3 ${quest.type === 'bounty' ? 'border border-yellow-500/30 bg-yellow-500/5' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl glass-light flex items-center justify-center ${quest.color}`}>
                    <span className="material-symbols-rounded text-2xl">{quest.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold">{quest.name}</h4>
                      {quest.type === 'bounty' && (
                        <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">5 DAYS LEFT</span>
                      )}
                    </div>
                    <p className="text-xs text-white/70 mb-2">{quest.description}</p>
                    <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${quest.type === 'bounty' ? 'bg-gradient-to-r from-yellow-500 to-amber-400' : 'bg-neon'}`}
                        style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-[10px] text-white/50">{quest.progress.toLocaleString()}/{quest.target.toLocaleString()}</p>
                      <p className={`text-[10px] font-bold ${quest.type === 'bounty' ? 'text-yellow-400' : 'text-neon'}`}>
                        +{quest.xpReward} XP
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Coach Nudge */}
          <div className="px-6 mb-6">
            <GlassCard className="bg-gradient-to-r from-green-900/30 to-transparent border-l-4 border-l-neon">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neon/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-rounded text-neon">smart_toy</span>
                </div>
                <div>
                  <p className="text-sm">
                    Hey Titan! You're only <span className="text-neon font-bold">150 XP</span> away from a streak bonus. Crush that HIIT session now!
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Tab Filter */}
          <div className="px-6 mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'daily', label: 'Daily' },
                { id: 'weekly', label: 'Weekly' },
                { id: 'bounties', label: 'Bounties' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-neon text-black'
                      : 'glass-light text-white/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quest List */}
          <div className="px-6">
            {filteredQuests.map(quest => (
              <div
                key={quest.id}
                className={`flex items-center gap-3 p-3 rounded-xl mb-2 ${
                  quest.status === 'completed' ? 'bg-neon/10' : 'glass-light'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  quest.status === 'completed' ? 'bg-neon text-black' : `glass-light ${quest.color}`
                }`}>
                  <span className="material-symbols-rounded text-lg">
                    {quest.status === 'completed' ? 'check' : quest.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <p className={`font-medium text-sm ${quest.status === 'completed' ? 'line-through text-white/50' : ''}`}>
                    {quest.name}
                  </p>
                  <p className="text-[10px] text-white/50">{quest.description}</p>
                </div>
                <p className={`text-sm font-bold ${quest.status === 'completed' ? 'text-neon' : 'text-white/50'}`}>
                  +{quest.xpReward}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Quest History View
export const QuestHistoryView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { stats } = useApp();

  const historyItems = [
    { name: 'Leg Day Destruction', date: 'Oct 24', xp: 600, status: 'completed' },
    { name: 'Morning Cardio', date: 'Oct 23', xp: 0, status: 'missed' },
    { name: 'Weekly Bounty: 20k Steps', date: 'Oct 22', xp: 1200, status: 'completed' },
    { name: 'Hydration Challenge', date: 'Oct 21', xp: 100, status: 'completed' },
  ];

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header
          title="Quest History"
          leftIcon="arrow_back"
          onLeftClick={() => setView(View.QUEST_LOG)}
          rightIcon="filter_list"
        />

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Lifetime Stats */}
          <div className="p-6 text-center">
            <p className="text-xs text-white/70 uppercase tracking-wider mb-2">Lifetime XP Earned</p>
            <h1 className="text-4xl font-bold text-neon mb-1">{stats.totalXpEarned.toLocaleString()}<span className="text-lg text-white/70">XP</span></h1>
          </div>

          {/* Tabs */}
          <div className="px-6 mb-4">
            <div className="flex gap-2">
              {['All', 'Daily', 'Weekly', 'Bounties'].map(tab => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-full text-sm ${
                    tab === 'All' ? 'bg-neon text-black' : 'glass-light text-white/70'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* History List */}
          <div className="px-6">
            {historyItems.map((item, i) => (
              <GlassCard key={i} className="mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.status === 'completed' ? 'bg-neon/20 text-neon' : 'bg-red-500/20 text-red-400'
                  }`}>
                    <span className="material-symbols-rounded">
                      {item.status === 'completed' ? 'check_circle' : 'cancel'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-xs text-white/70">{item.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${item.status === 'completed' ? 'text-neon' : 'text-white/50'}`}>
                      {item.status === 'completed' ? `+${item.xp} XP` : '0 XP'}
                    </p>
                    <p className={`text-[10px] ${item.status === 'completed' ? 'text-neon' : 'text-red-400'}`}>
                      {item.status.toUpperCase()}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
