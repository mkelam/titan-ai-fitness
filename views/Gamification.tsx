import React from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';

export const SkillTreeView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => (
  <div className="h-full flex flex-col relative">
    {/* Subtle green gradient for skill tree theme */}
    <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-black/30 to-black/50 z-0 pointer-events-none" />

    <div className="relative z-10 flex flex-col h-full">
      <Header title="Skill Tree" leftIcon="arrow_back" onLeftClick={() => setView(View.DASHBOARD)} rightIcon="help" />

      <div className="flex-1 overflow-auto p-4 relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

        <div className="relative z-10 flex flex-col items-center gap-12 pt-8 pb-24">
          {/* Active Node */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-neon text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,255,157,0.4)] border-4 border-black z-10 pulse-neon">
              <span className="material-symbols-rounded text-4xl">fitness_center</span>
            </div>
            <p className="mt-2 font-bold text-neon">Strength I</p>
          </div>

          {/* Connection Line */}
          <div className="w-1 h-12 bg-gradient-to-b from-neon to-gray-700 -my-4" />

          {/* Next Tier Nodes */}
          <div className="grid grid-cols-2 gap-16">
            <div className="flex flex-col items-center opacity-100">
              <GlassCard className="w-16 h-16 p-0 rounded-full border-2 border-neon flex items-center justify-center cursor-pointer hover:shadow-[0_0_20px_rgba(0,255,157,0.3)] transition-all" onClick={() => setView(View.ULTIMATE_UNLOCK)}>
                <span className="material-symbols-rounded text-2xl text-neon">lock_open</span>
              </GlassCard>
              <p className="mt-2 font-bold text-sm text-center">Titan's Might</p>
            </div>
            <div className="flex flex-col items-center opacity-50 grayscale">
              <GlassCard className="w-16 h-16 p-0 rounded-full border-2 border-gray-600 flex items-center justify-center">
                <span className="material-symbols-rounded text-2xl text-white/50">sprint</span>
              </GlassCard>
              <p className="mt-2 font-bold text-sm text-center text-white/50">Agility II</p>
            </div>
          </div>

          {/* Connection Line */}
          <div className="w-1 h-12 bg-white/20 -my-4" />

          {/* Locked Node */}
          <div className="w-16 h-16 rounded-full glass-light border border-gray-700 flex items-center justify-center opacity-30">
            <span className="material-symbols-rounded text-white/40">question_mark</span>
          </div>
        </div>
      </div>

      <div className="glass-panel border-t border-white/10 rounded-t-2xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold uppercase text-white/70">Skill Points</span>
          <span className="text-xl font-bold text-neon">5 SP</span>
        </div>
        <Button fullWidth onClick={() => setView(View.XP_SHOP)}>VISIT XP SHOP</Button>
      </div>
    </div>
  </div>
);

export const TeamHubView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => (
  <div className="h-full flex flex-col relative">
    {/* Purple gradient for team theme */}
    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/15 via-black/30 to-black/50 z-0 pointer-events-none" />

    <div className="relative z-10 flex flex-col h-full">
      <Header title="Alpha Squad" leftIcon="arrow_back" onLeftClick={() => setView(View.DASHBOARD)} rightIcon="group" />

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {/* Team Quest */}
        <GlassCard className="bg-gradient-to-br from-purple-900/20 to-transparent border-purple-500/30 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Summit Challenge</h2>
              <p className="text-purple-200 text-sm">Lift 50,000kg collectively</p>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-purple-400">65%</span>
              <span className="text-[10px] uppercase text-white/70">Complete</span>
            </div>
          </div>
          <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
            <div className="bg-purple-500 w-[65%] h-full shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-500" />
          </div>
          <p className="text-xs text-right mt-1 text-white/70">2d 14h Remaining</p>
        </GlassCard>

        {/* Leaderboard Header */}
        <div className="flex justify-between items-end mb-4 px-2">
          <h3 className="font-bold text-lg">Team Contributions</h3>
          <button className="text-purple-400 text-sm font-bold hover:text-purple-300 transition-colors">VIEW ALL</button>
        </div>

        {/* Leaderboard */}
        <div className="flex flex-col gap-3">
          {[
            { name: 'Sarah J.', xp: '4,500', rank: 1, avatar: '👩‍🦰' },
            { name: 'Mike T.', xp: '3,200', rank: 2, avatar: '🧔' },
            { name: 'Elena R.', xp: '1,850', rank: 3, avatar: '👩' },
            { name: 'You', xp: '1,200', rank: 4, avatar: '👤', me: true },
          ].map((user) => (
            <GlassCard
              key={user.rank}
              className={user.me ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'hover:bg-white/5 transition-all'}
            >
              <div className="flex items-center gap-4">
                <span className={`font-bold w-6 ${user.rank === 1 ? 'text-yellow-400' : 'text-white/50'}`}>
                  #{user.rank}
                </span>
                <div className="w-10 h-10 rounded-full glass-light flex items-center justify-center text-xl">
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{user.name}</h4>
                  <p className="text-xs text-white/70">{user.xp} XP Contributed</p>
                </div>
                {!user.me && (
                  <button className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-neon transition-all">
                    <span className="material-symbols-rounded">thumb_up</span>
                  </button>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  </div>
);
