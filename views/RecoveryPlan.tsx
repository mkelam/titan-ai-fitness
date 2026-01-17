import React, { useState } from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';
import { useApp } from '../contexts/AppContext';

interface RecoveryActivity {
  id: string;
  name: string;
  duration: string;
  icon: string;
  color: string;
  description: string;
  benefits: string[];
  completed: boolean;
}

export const RecoveryPlanView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { stats, workouts } = useApp();

  // Calculate recovery need based on recent workouts
  const recentWorkouts = workouts.slice(0, 7);
  const workoutsThisWeek = recentWorkouts.length;
  const totalVolumeThisWeek = recentWorkouts.reduce((acc, w) => acc + w.totalVolume, 0);

  const recoveryLevel = workoutsThisWeek >= 5 ? 'high' : workoutsThisWeek >= 3 ? 'moderate' : 'low';

  const [activities, setActivities] = useState<RecoveryActivity[]>([
    {
      id: 'sleep',
      name: 'Quality Sleep',
      duration: '7-9 hours',
      icon: 'bedtime',
      color: 'text-indigo-400',
      description: 'Prioritize deep, uninterrupted sleep for muscle recovery and hormone optimization.',
      benefits: ['Muscle repair', 'Hormone balance', 'Mental recovery'],
      completed: false
    },
    {
      id: 'stretch',
      name: 'Active Stretching',
      duration: '15-20 min',
      icon: 'self_improvement',
      color: 'text-green-400',
      description: 'Light stretching to improve blood flow and reduce muscle tension.',
      benefits: ['Flexibility', 'Blood flow', 'Tension relief'],
      completed: false
    },
    {
      id: 'hydration',
      name: 'Hydration Focus',
      duration: 'All day',
      icon: 'water_drop',
      color: 'text-blue-400',
      description: 'Drink 3-4 liters of water to flush toxins and support muscle recovery.',
      benefits: ['Toxin flush', 'Joint health', 'Nutrient transport'],
      completed: false
    },
    {
      id: 'nutrition',
      name: 'Recovery Nutrition',
      duration: 'Post-workout',
      icon: 'restaurant',
      color: 'text-orange-400',
      description: 'Focus on protein and anti-inflammatory foods to support repair.',
      benefits: ['Muscle synthesis', 'Reduce inflammation', 'Energy restore'],
      completed: false
    },
    {
      id: 'foam_roll',
      name: 'Foam Rolling',
      duration: '10-15 min',
      icon: 'sports_gymnastics',
      color: 'text-purple-400',
      description: 'Self-myofascial release to break up muscle knots and improve mobility.',
      benefits: ['Release tension', 'Improve mobility', 'Reduce soreness'],
      completed: false
    },
    {
      id: 'walk',
      name: 'Light Walking',
      duration: '20-30 min',
      icon: 'directions_walk',
      color: 'text-cyan-400',
      description: 'Low-intensity movement to promote blood flow without taxing muscles.',
      benefits: ['Active recovery', 'Mental clarity', 'Fat oxidation'],
      completed: false
    },
  ]);

  const [selectedActivity, setSelectedActivity] = useState<RecoveryActivity | null>(null);

  const toggleActivity = (id: string) => {
    setActivities(prev => prev.map(a =>
      a.id === id ? { ...a, completed: !a.completed } : a
    ));
  };

  const completedCount = activities.filter(a => a.completed).length;
  const progress = (completedCount / activities.length) * 100;

  const getRecoveryColor = () => {
    switch (recoveryLevel) {
      case 'high': return 'text-red-400';
      case 'moderate': return 'text-yellow-400';
      case 'low': return 'text-green-400';
    }
  };

  const getRecoveryMessage = () => {
    switch (recoveryLevel) {
      case 'high': return 'Your body needs serious recovery time. Take it easy today!';
      case 'moderate': return 'Some recovery activities will help you bounce back stronger.';
      case 'low': return 'Light recovery day - you\'re fresh and ready to train!';
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header
          title="Recovery Plan"
          leftIcon="arrow_back"
          onLeftClick={() => setView(View.DASHBOARD)}
          rightIcon="self_improvement"
        />

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Recovery Status */}
          <div className="px-6 pt-4 mb-6">
            <GlassCard className="bg-gradient-to-br from-indigo-900/30 to-black border border-indigo-500/30">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                  <span className={`material-symbols-rounded text-3xl ${getRecoveryColor()}`}>
                    {recoveryLevel === 'high' ? 'battery_alert' : recoveryLevel === 'moderate' ? 'battery_horiz_050' : 'battery_full'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">Recovery Need</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full bg-white/10 ${getRecoveryColor()} uppercase`}>
                      {recoveryLevel}
                    </span>
                  </div>
                  <p className="text-sm text-white/70">{getRecoveryMessage()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-2xl font-bold">{workoutsThisWeek}</p>
                  <p className="text-xs text-white/70">Workouts (7d)</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-2xl font-bold">{(totalVolumeThisWeek / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-white/70">Volume (kg)</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Progress */}
          <div className="px-6 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm text-white/70 uppercase tracking-wider">Today's Recovery</h3>
              <span className="text-neon font-bold">{completedCount}/{activities.length}</span>
            </div>
            <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Recovery Activities */}
          <div className="px-6">
            <h3 className="text-sm text-white/70 uppercase tracking-wider mb-3">Recommended Activities</h3>
            {activities.map(activity => (
              <GlassCard
                key={activity.id}
                className={`mb-3 cursor-pointer transition-all ${
                  activity.completed ? 'bg-neon/10 border border-neon/30' : ''
                }`}
                onClick={() => setSelectedActivity(activity)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    activity.completed ? 'bg-neon/20' : 'bg-white/5'
                  }`}>
                    <span className={`material-symbols-rounded text-2xl ${
                      activity.completed ? 'text-neon' : activity.color
                    }`}>
                      {activity.completed ? 'check_circle' : activity.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold ${activity.completed ? 'text-neon' : ''}`}>
                      {activity.name}
                    </h4>
                    <p className="text-xs text-white/70">{activity.duration}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleActivity(activity.id);
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      activity.completed
                        ? 'bg-neon text-black'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <span className="material-symbols-rounded text-sm">
                      {activity.completed ? 'check' : 'add'}
                    </span>
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* AI Tip */}
          <div className="px-6 mt-6">
            <GlassCard className="bg-neon/5 border-l-4 border-l-neon">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-neon/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-rounded text-neon">smart_toy</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neon mb-1">RECOVERY TIP</h4>
                  <p className="text-sm text-white/80">
                    {recoveryLevel === 'high'
                      ? 'Consider taking a full rest day. Your muscles grow during recovery, not during training!'
                      : recoveryLevel === 'moderate'
                      ? 'Light activity today will actually speed up your recovery. Aim for 20 minutes of walking.'
                      : 'You\'re well recovered! This is a great day for an intense workout if you\'re feeling it.'}
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedActivity(null)} />
          <div className="relative glass-modal rounded-3xl w-full max-w-sm p-6">
            <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
              selectedActivity.completed ? 'bg-neon/20' : 'bg-white/10'
            }`}>
              <span className={`material-symbols-rounded text-3xl ${
                selectedActivity.completed ? 'text-neon' : selectedActivity.color
              }`}>
                {selectedActivity.icon}
              </span>
            </div>

            <h3 className="text-xl font-bold text-center mb-1">{selectedActivity.name}</h3>
            <p className="text-center text-white/70 text-sm mb-4">{selectedActivity.duration}</p>

            <p className="text-white/80 text-sm mb-4">{selectedActivity.description}</p>

            <div className="mb-6">
              <h4 className="text-xs text-white/70 uppercase mb-2">Benefits</h4>
              <div className="flex flex-wrap gap-2">
                {selectedActivity.benefits.map((benefit, i) => (
                  <span key={i} className="text-xs bg-white/10 px-3 py-1 rounded-full">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            <Button
              fullWidth
              variant={selectedActivity.completed ? 'secondary' : 'primary'}
              onClick={() => {
                toggleActivity(selectedActivity.id);
                setSelectedActivity(null);
              }}
            >
              {selectedActivity.completed ? 'MARK INCOMPLETE' : 'MARK COMPLETE'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
