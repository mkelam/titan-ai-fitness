import React, { useState } from 'react';
import { View, CoachPersonality } from '../types';
import { Button, GlassCard } from '../components/UI';
import { useApp } from '../contexts/AppContext';

// ============================================
// LOGIN VIEW
// ============================================

export const LoginView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // For MVP, just proceed to onboarding
    // TODO: Add Firebase Auth later
    if (email && password) {
      setView(View.ONBOARDING_GOALS);
    } else {
      // Demo mode - skip auth
      setView(View.ONBOARDING_GOALS);
    }
  };

  return (
    <div className="flex flex-col h-full justify-center p-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-0" />

      <div className="relative z-10 flex flex-col gap-6">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 tracking-tighter text-white drop-shadow-[0_0_20px_rgba(0,255,157,0.3)]">TITAN</h1>
          <p className="text-white/80 uppercase tracking-widest text-sm">Forge Your Legacy</p>
        </div>

        <GlassCard>
          <h2 className="text-xl font-bold mb-4">Initialize System</h2>
          <input
            type="email"
            placeholder="Identity (Email)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="glass-input w-full rounded-lg p-3 mb-3 text-white placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Passkey"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="glass-input w-full rounded-lg p-3 mb-6 text-white placeholder-gray-500"
          />
          <Button fullWidth onClick={handleLogin}>
            ENTER THE ARENA
          </Button>
          <div className="mt-4 text-center text-sm text-white/70">
            <span className="block mb-2">Or sync via</span>
            <div className="flex justify-center gap-4">
              <button className="p-2 glass-light rounded-full hover:bg-white/20 transition-all">
                <span className="material-symbols-rounded">g_mobiledata</span>
              </button>
              <button className="p-2 glass-light rounded-full hover:bg-white/20 transition-all">
                <span className="material-symbols-rounded">apple</span>
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// ============================================
// GOALS VIEW
// ============================================

export const GoalsView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { setGoals } = useApp();
  const [selected, setSelected] = useState<'strength' | 'shredded' | 'performance' | null>(null);

  const goals = [
    { id: 'strength' as const, icon: 'fitness_center', title: 'Titan Strength', desc: 'Max power & hypertrophy' },
    { id: 'shredded' as const, icon: 'local_fire_department', title: 'Shredded', desc: 'Fat loss & definition' },
    { id: 'performance' as const, icon: 'bolt', title: 'Performance', desc: 'Agility & Endurance' },
  ];

  const handleContinue = () => {
    if (selected) {
      setGoals(prev => ({ ...prev, primaryGoal: selected }));
      setView(View.ONBOARDING_EXP);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 pt-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-transparent to-black/20 z-0" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
            <span className="w-6 h-6 rounded-full bg-neon text-black flex items-center justify-center text-xs font-bold">1</span>
            <span>of 4</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Choose Your Path</h2>
          <p className="text-white/70">This defines your skill tree.</p>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          {goals.map(g => (
            <GlassCard
              key={g.id}
              className={`cursor-pointer border transition-all ${
                selected === g.id
                  ? 'border-neon bg-neon/10 shadow-[0_0_20px_rgba(0,255,157,0.2)]'
                  : 'border-transparent hover:border-white/20'
              }`}
              onClick={() => setSelected(g.id)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full transition-all ${
                  selected === g.id
                    ? 'bg-neon text-black shadow-[0_0_15px_rgba(0,255,157,0.4)]'
                    : 'bg-white/10 text-white'
                }`}>
                  <span className="material-symbols-rounded">{g.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{g.title}</h3>
                  <p className="text-sm text-white/70">{g.desc}</p>
                </div>
                {selected === g.id && (
                  <span className="material-symbols-rounded text-neon ml-auto">check_circle</span>
                )}
              </div>
            </GlassCard>
          ))}
        </div>

        <Button
          fullWidth
          className="mt-6"
          variant={selected ? 'primary' : 'secondary'}
          onClick={handleContinue}
        >
          CONFIRM PROTOCOL
        </Button>
      </div>
    </div>
  );
};

// ============================================
// EXPERIENCE VIEW
// ============================================

export const ExperienceView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { setGoals } = useApp();
  const [experience, setExperience] = useState(5);
  const [personality, setPersonality] = useState<CoachPersonality>(CoachPersonality.SAGE);

  const personalities = [
    { id: CoachPersonality.SAGE, icon: 'psychology', label: 'Sage', desc: 'Calm & analytical' },
    { id: CoachPersonality.SERGEANT, icon: 'military_tech', label: 'Sergeant', desc: 'Strict & disciplined' },
    { id: CoachPersonality.HYPE_MAN, icon: 'celebration', label: 'Hype', desc: 'Energetic & motivating' },
  ];

  const getExperienceLabel = (val: number) => {
    if (val <= 3) return 'Rookie';
    if (val <= 6) return 'Intermediate';
    if (val <= 8) return 'Veteran';
    return 'Titan';
  };

  const handleContinue = () => {
    setGoals(prev => ({ ...prev, coachPersonality: personality }));
    setView(View.ONBOARDING_COMMIT);
  };

  return (
    <div className="flex flex-col h-full p-6 pt-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-0" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
            <span className="w-6 h-6 rounded-full bg-neon text-black flex items-center justify-center text-xs font-bold">2</span>
            <span>of 4</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Calibration</h2>
          <p className="text-white/70">AI requires your baseline data.</p>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <GlassCard>
            <label className="text-sm text-white/70 uppercase font-bold block mb-4">Lifting Experience</label>
            <input
              type="range"
              min="0"
              max="10"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-neon"
            />
            <div className="flex justify-between text-xs text-white/50 mt-2">
              <span>Rookie</span>
              <span>Veteran</span>
              <span>Titan</span>
            </div>
            <div className="mt-3 text-center">
              <span className="text-neon font-bold">{getExperienceLabel(experience)}</span>
            </div>
          </GlassCard>

          <GlassCard>
            <label className="text-sm text-white/70 uppercase font-bold block mb-4">AI Coach Personality</label>
            <div className="grid grid-cols-3 gap-2">
              {personalities.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPersonality(p.id)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    personality === p.id
                      ? 'border-neon bg-neon/10 shadow-[0_0_15px_rgba(0,255,157,0.2)]'
                      : 'glass-light border-transparent hover:border-white/20'
                  }`}
                >
                  <span className={`material-symbols-rounded text-2xl mb-1 ${personality === p.id ? 'text-neon' : ''}`}>
                    {p.icon}
                  </span>
                  <p className="text-sm font-medium">{p.label}</p>
                  <p className="text-[10px] text-white/70">{p.desc}</p>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        <Button fullWidth onClick={handleContinue} className="mt-6">
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

// ============================================
// COMMITMENT VIEW (NEW)
// ============================================

export const CommitmentView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { setGoals } = useApp();
  const [frequency, setFrequency] = useState(3);
  const [nudgeIntensity, setNudgeIntensity] = useState<'low' | 'medium' | 'high'>('medium');

  const intensities = [
    { id: 'low' as const, label: 'Gentle', desc: 'Light reminders', icon: 'brightness_low' },
    { id: 'medium' as const, label: 'Balanced', desc: 'Regular nudges', icon: 'brightness_medium' },
    { id: 'high' as const, label: 'Intense', desc: 'Frequent push', icon: 'brightness_high' },
  ];

  const handleContinue = () => {
    setGoals(prev => ({
      ...prev,
      weeklyWorkoutFrequency: frequency,
      nudgeIntensity: nudgeIntensity
    }));
    setView(View.ONBOARDING_FINAL);
  };

  return (
    <div className="flex flex-col h-full p-6 pt-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-black/20 z-0" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
            <span className="w-6 h-6 rounded-full bg-neon text-black flex items-center justify-center text-xs font-bold">3</span>
            <span>of 4</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Your Commitment</h2>
          <p className="text-white/70">Set your training schedule.</p>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <GlassCard>
            <label className="text-sm text-white/70 uppercase font-bold block mb-4">
              Weekly Training Days
            </label>
            <div className="flex justify-center items-center gap-4 mb-4">
              <button
                onClick={() => setFrequency(Math.max(1, frequency - 1))}
                className="w-12 h-12 rounded-full glass-light flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <span className="material-symbols-rounded">remove</span>
              </button>
              <div className="text-center">
                <span className="text-5xl font-bold text-neon">{frequency}</span>
                <p className="text-sm text-white/70">days / week</p>
              </div>
              <button
                onClick={() => setFrequency(Math.min(7, frequency + 1))}
                className="w-12 h-12 rounded-full glass-light flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <span className="material-symbols-rounded">add</span>
              </button>
            </div>
            <div className="flex justify-between px-4">
              {[1, 2, 3, 4, 5, 6, 7].map(day => (
                <div
                  key={day}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    day <= frequency
                      ? 'bg-neon text-black'
                      : 'bg-white/10 text-white/50'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <label className="text-sm text-white/70 uppercase font-bold block mb-4">
              Nudge Intensity
            </label>
            <p className="text-xs text-white/50 mb-4">How often should the AI remind you?</p>
            <div className="grid grid-cols-3 gap-2">
              {intensities.map(i => (
                <button
                  key={i.id}
                  onClick={() => setNudgeIntensity(i.id)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    nudgeIntensity === i.id
                      ? 'border-neon bg-neon/10 shadow-[0_0_15px_rgba(0,255,157,0.2)]'
                      : 'glass-light border-transparent hover:border-white/20'
                  }`}
                >
                  <span className={`material-symbols-rounded text-2xl mb-1 ${nudgeIntensity === i.id ? 'text-neon' : ''}`}>
                    {i.icon}
                  </span>
                  <p className="text-sm font-medium">{i.label}</p>
                  <p className="text-[10px] text-white/70">{i.desc}</p>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        <Button fullWidth onClick={handleContinue} className="mt-6">
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

// ============================================
// FINALIZE VIEW (NEW)
// ============================================

export const FinalizeView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { setProfile, goals, addXP } = useApp();
  const [name, setName] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleComplete = async () => {
    if (!name.trim()) return;

    setIsCreating(true);

    // Create profile
    const profile = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      email: '', // Will be set from auth later
      createdAt: new Date().toISOString()
    };

    setProfile(profile);

    // Award welcome XP
    addXP(50, 'Account Created');

    // Simulate initialization
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsCreating(false);
    setView(View.DASHBOARD);
  };

  const getGoalLabel = () => {
    switch (goals.primaryGoal) {
      case 'strength': return 'Titan Strength';
      case 'shredded': return 'Shredded';
      case 'performance': return 'Performance';
      default: return 'Unknown';
    }
  };

  return (
    <div className="flex flex-col h-full p-6 pt-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-neon/5 via-transparent to-black/30 z-0" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
            <span className="w-6 h-6 rounded-full bg-neon text-black flex items-center justify-center text-xs font-bold">4</span>
            <span>of 4</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Finalize Profile</h2>
          <p className="text-white/70">Complete your Titan identity.</p>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <GlassCard>
            <label className="text-sm text-white/70 uppercase font-bold block mb-4">
              Titan Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glass-input w-full rounded-lg p-3 text-white placeholder-gray-500 text-lg"
              maxLength={20}
            />
          </GlassCard>

          <GlassCard>
            <label className="text-sm text-white/70 uppercase font-bold block mb-4">
              Target Weight (Optional)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="85"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                className="glass-input flex-1 rounded-lg p-3 text-white placeholder-gray-500 text-lg text-center"
              />
              <span className="text-white/70 font-bold">kg</span>
            </div>
          </GlassCard>

          {/* Summary Card */}
          <GlassCard className="border border-neon/30 bg-neon/5">
            <h3 className="text-sm text-white/70 uppercase font-bold mb-4">Your Protocol</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">Path</span>
                <span className="text-neon font-bold">{getGoalLabel()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Coach</span>
                <span className="font-bold">{goals.coachPersonality}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Training</span>
                <span className="font-bold">{goals.weeklyWorkoutFrequency}x / week</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Nudge Level</span>
                <span className="font-bold capitalize">{goals.nudgeIntensity}</span>
              </div>
            </div>
          </GlassCard>
        </div>

        <Button
          fullWidth
          onClick={handleComplete}
          className="mt-6"
          variant={name.trim() ? 'primary' : 'secondary'}
        >
          {isCreating ? (
            <span className="flex items-center gap-2">
              <span className="material-symbols-rounded animate-spin">progress_activity</span>
              INITIALIZING...
            </span>
          ) : (
            'BEGIN YOUR JOURNEY'
          )}
        </Button>
      </div>
    </div>
  );
};
