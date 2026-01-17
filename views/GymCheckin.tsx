import React, { useState } from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';
import { useApp } from '../contexts/AppContext';

interface Gym {
  id: string;
  name: string;
  address: string;
  distance: string;
  checkins: number;
  isFavorite: boolean;
}

export const GymCheckinView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { stats, addXP } = useApp();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock gym data
  const [gyms] = useState<Gym[]>([
    {
      id: 'gym_1',
      name: 'Titan Fitness Center',
      address: '123 Main Street',
      distance: '0.3 km',
      checkins: 45,
      isFavorite: true
    },
    {
      id: 'gym_2',
      name: 'Iron Temple Gym',
      address: '456 Oak Avenue',
      distance: '1.2 km',
      checkins: 12,
      isFavorite: false
    },
    {
      id: 'gym_3',
      name: 'PowerHouse Athletics',
      address: '789 Fitness Blvd',
      distance: '2.5 km',
      checkins: 8,
      isFavorite: false
    },
  ]);

  const handleCheckin = (gym: Gym) => {
    setSelectedGym(gym);
    setIsCheckedIn(true);
    addXP(10, 'Gym Check-in');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const todayCheckins = 1247; // Mock global check-ins today
  const streakBonus = stats.streak >= 7;

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header
          title="Gym Check-in"
          leftIcon="arrow_back"
          onLeftClick={() => setView(View.DASHBOARD)}
          rightIcon="map"
        />

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Check-in Status */}
          <div className="px-6 pt-4 mb-6">
            <GlassCard className={`text-center ${isCheckedIn ? 'bg-neon/10 border border-neon/30' : ''}`}>
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                isCheckedIn ? 'bg-neon/20' : 'bg-white/10'
              }`}>
                <span className={`material-symbols-rounded text-4xl ${
                  isCheckedIn ? 'text-neon' : 'text-white/70'
                }`}>
                  {isCheckedIn ? 'check_circle' : 'location_on'}
                </span>
              </div>

              {isCheckedIn ? (
                <>
                  <h2 className="text-xl font-bold text-neon mb-1">Checked In!</h2>
                  <p className="text-white/70">{selectedGym?.name}</p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <span className="material-symbols-rounded text-yellow-400 text-sm">bolt</span>
                    <span className="text-yellow-400 text-sm font-bold">+10 XP earned</span>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-1">Ready to Train?</h2>
                  <p className="text-white/70 text-sm">Check in at your gym to earn XP</p>
                </>
              )}
            </GlassCard>
          </div>

          {/* Stats Row */}
          <div className="px-6 mb-6">
            <div className="grid grid-cols-3 gap-3">
              <GlassCard className="text-center py-3">
                <span className="material-symbols-rounded text-orange-400 text-xl mb-1">group</span>
                <p className="text-lg font-bold">{todayCheckins.toLocaleString()}</p>
                <p className="text-[10px] text-white/70">Training Today</p>
              </GlassCard>
              <GlassCard className="text-center py-3">
                <span className="material-symbols-rounded text-blue-400 text-xl mb-1">pin_drop</span>
                <p className="text-lg font-bold">{gyms[0].checkins}</p>
                <p className="text-[10px] text-white/70">Your Check-ins</p>
              </GlassCard>
              <GlassCard className="text-center py-3">
                <span className="material-symbols-rounded text-green-400 text-xl mb-1">emoji_events</span>
                <p className="text-lg font-bold">#42</p>
                <p className="text-[10px] text-white/70">Gym Rank</p>
              </GlassCard>
            </div>
          </div>

          {/* Streak Bonus */}
          {streakBonus && !isCheckedIn && (
            <div className="px-6 mb-4">
              <GlassCard className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-rounded text-orange-400 text-2xl">local_fire_department</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">Streak Bonus Active!</p>
                    <p className="text-xs text-white/70">Check in now for +5 bonus XP</p>
                  </div>
                  <span className="text-orange-400 font-bold">+5 XP</span>
                </div>
              </GlassCard>
            </div>
          )}

          {/* Nearby Gyms */}
          <div className="px-6">
            <h3 className="text-sm text-white/70 uppercase tracking-wider mb-3">Nearby Gyms</h3>
            {gyms.map(gym => (
              <GlassCard key={gym.id} className="mb-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-rounded text-2xl text-white/70">fitness_center</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold">{gym.name}</h4>
                      {gym.isFavorite && (
                        <span className="material-symbols-rounded text-yellow-400 text-sm">star</span>
                      )}
                    </div>
                    <p className="text-xs text-white/70">{gym.address}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-white/50">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-rounded text-xs">near_me</span>
                        {gym.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-rounded text-xs">check_circle</span>
                        {gym.checkins} visits
                      </span>
                    </div>
                  </div>
                  <Button
                    variant={isCheckedIn && selectedGym?.id === gym.id ? 'secondary' : 'primary'}
                    onClick={() => !isCheckedIn && handleCheckin(gym)}
                    className="text-xs px-4"
                  >
                    {isCheckedIn && selectedGym?.id === gym.id ? 'HERE' : 'CHECK IN'}
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Add New Gym */}
          <div className="px-6 mt-4">
            <button className="w-full p-4 border-2 border-dashed border-white/20 rounded-xl text-center hover:border-neon/50 transition-all">
              <span className="material-symbols-rounded text-2xl text-white/50 mb-1">add_location</span>
              <p className="text-sm text-white/70">Add New Gym</p>
            </button>
          </div>

          {/* Gym Leaderboard Preview */}
          <div className="px-6 mt-6">
            <GlassCard>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold">Gym Leaderboard</h3>
                <button className="text-xs text-neon" onClick={() => setView(View.LEADERBOARD)}>
                  View All
                </button>
              </div>
              <div className="space-y-2">
                {[
                  { rank: 1, name: 'IronTitan_X', checkins: 156 },
                  { rank: 2, name: 'GymCrusher', checkins: 134 },
                  { rank: 3, name: 'FitWarrior', checkins: 128 },
                ].map(user => (
                  <div key={user.rank} className="flex items-center gap-3 text-sm">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      user.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                      user.rank === 2 ? 'bg-gray-400/20 text-white/70' :
                      'bg-amber-600/20 text-amber-600'
                    }`}>
                      {user.rank}
                    </span>
                    <span className="flex-1">{user.name}</span>
                    <span className="text-white/70">{user.checkins} check-ins</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-24 left-4 right-4 glass-panel rounded-xl p-4 flex items-center gap-3 z-50 border border-neon/30">
          <span className="material-symbols-rounded text-neon text-2xl">check_circle</span>
          <div className="flex-1">
            <p className="font-bold">Check-in Successful!</p>
            <p className="text-xs text-white/70">+{streakBonus ? 15 : 10} XP earned</p>
          </div>
        </div>
      )}
    </div>
  );
};
