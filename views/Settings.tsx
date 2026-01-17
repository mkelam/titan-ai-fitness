import React, { useState } from 'react';
import { View, CoachPersonality } from '../types';
import { Header, GlassCard, Button } from '../components/UI';
import { useApp } from '../contexts/AppContext';

export const SettingsView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { goals, setGoals, profile, setProfile } = useApp();

  const [name, setName] = useState(profile?.name || '');
  const [frequency, setFrequency] = useState(goals.weeklyWorkoutFrequency);
  const [nudgeIntensity, setNudgeIntensity] = useState(goals.nudgeIntensity);
  const [coachPersonality, setCoachPersonality] = useState(goals.coachPersonality);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [haptics, setHaptics] = useState(true);

  const hasChanges =
    name !== (profile?.name || '') ||
    frequency !== goals.weeklyWorkoutFrequency ||
    nudgeIntensity !== goals.nudgeIntensity ||
    coachPersonality !== goals.coachPersonality;

  const saveSettings = () => {
    if (name !== (profile?.name || '') && profile) {
      setProfile({ ...profile, name });
    }

    setGoals(prev => ({
      ...prev,
      weeklyWorkoutFrequency: frequency,
      nudgeIntensity,
      coachPersonality
    }));

    setView(View.PROFILE);
  };

  const personalities = [
    { id: CoachPersonality.SAGE, label: 'Sage', icon: 'psychology' },
    { id: CoachPersonality.SERGEANT, label: 'Sergeant', icon: 'military_tech' },
    { id: CoachPersonality.HYPE_MAN, label: 'Hype', icon: 'celebration' },
  ];

  const intensities = [
    { id: 'low' as const, label: 'Low' },
    { id: 'medium' as const, label: 'Medium' },
    { id: 'high' as const, label: 'High' },
  ];

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header title="Settings" leftIcon="arrow_back" onLeftClick={() => setView(View.PROFILE)} />

        <div className="flex-1 overflow-y-auto p-4 pb-24">
          {/* Profile Settings */}
          <GlassCard className="mb-4">
            <h3 className="text-sm text-white/70 uppercase font-bold mb-4">Profile</h3>

            <div className="mb-4">
              <label className="text-xs text-white/70 block mb-2">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="glass-input w-full rounded-lg p-3 text-white"
                placeholder="Enter your name"
                maxLength={20}
              />
            </div>
          </GlassCard>

          {/* Training Settings */}
          <GlassCard className="mb-4">
            <h3 className="text-sm text-white/70 uppercase font-bold mb-4">Training</h3>

            <div className="mb-6">
              <label className="text-xs text-white/70 block mb-3">Weekly Training Days</label>
              <div className="flex justify-between px-2">
                {[1, 2, 3, 4, 5, 6, 7].map(day => (
                  <button
                    key={day}
                    onClick={() => setFrequency(day)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      day <= frequency
                        ? 'bg-neon text-black'
                        : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <p className="text-center text-white/70 text-sm mt-3">{frequency} days per week</p>
            </div>

            <div>
              <label className="text-xs text-white/70 block mb-3">Coach Personality</label>
              <div className="grid grid-cols-3 gap-2">
                {personalities.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setCoachPersonality(p.id)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      coachPersonality === p.id
                        ? 'border-neon bg-neon/10'
                        : 'glass-light border-transparent'
                    }`}
                  >
                    <span className={`material-symbols-rounded text-xl mb-1 ${coachPersonality === p.id ? 'text-neon' : ''}`}>
                      {p.icon}
                    </span>
                    <p className="text-xs font-medium">{p.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Notification Settings */}
          <GlassCard className="mb-4">
            <h3 className="text-sm text-white/70 uppercase font-bold mb-4">Notifications</h3>

            <div className="mb-4">
              <label className="text-xs text-white/70 block mb-3">Nudge Intensity</label>
              <div className="flex gap-2">
                {intensities.map(i => (
                  <button
                    key={i.id}
                    onClick={() => setNudgeIntensity(i.id)}
                    className={`flex-1 p-3 rounded-xl border text-center transition-all ${
                      nudgeIntensity === i.id
                        ? 'border-neon bg-neon/10'
                        : 'glass-light border-transparent'
                    }`}
                  >
                    <p className={`text-sm font-medium ${nudgeIntensity === i.id ? 'text-neon' : ''}`}>{i.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center py-3 border-t border-white/10">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-xs text-white/70">Workout reminders & achievements</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-7 rounded-full transition-all ${
                  notifications ? 'bg-neon' : 'bg-white/30'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </GlassCard>

          {/* App Settings */}
          <GlassCard className="mb-4">
            <h3 className="text-sm text-white/70 uppercase font-bold mb-4">App</h3>

            <div className="flex justify-between items-center py-3">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-xs text-white/70">Always on for that Titan aesthetic</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-7 rounded-full transition-all ${
                  darkMode ? 'bg-neon' : 'bg-white/30'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex justify-between items-center py-3 border-t border-white/10">
              <div>
                <p className="font-medium">Haptic Feedback</p>
                <p className="text-xs text-white/70">Vibration on actions</p>
              </div>
              <button
                onClick={() => setHaptics(!haptics)}
                className={`w-12 h-7 rounded-full transition-all ${
                  haptics ? 'bg-neon' : 'bg-white/30'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  haptics ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex justify-between items-center py-3 border-t border-white/10">
              <div>
                <p className="font-medium">Units</p>
                <p className="text-xs text-white/70">Weight measurement</p>
              </div>
              <span className="text-white/70">Metric (kg)</span>
            </div>
          </GlassCard>

          {/* About */}
          <GlassCard>
            <h3 className="text-sm text-white/70 uppercase font-bold mb-4">About</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Version</span>
                <span>1.0.0 MVP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Build</span>
                <span>PWA</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <p className="text-xs text-white/50">Titan AI - Forge Your Legacy</p>
            </div>
          </GlassCard>
        </div>

        {/* Save Button */}
        {hasChanges && (
          <div className="glass-panel border-t border-white/10 p-4">
            <Button fullWidth onClick={saveSettings}>
              SAVE CHANGES
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
