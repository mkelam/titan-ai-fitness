import React, { useState } from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';
import { useApp } from '../contexts/AppContext';

export const ComparisonEngineView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { workouts, weightHistory, stats } = useApp();
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');

  // Calculate this week vs last week data
  const today = new Date();
  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(today.getDate() - today.getDay());

  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);
  const lastWeekEnd = new Date(thisWeekStart);
  lastWeekEnd.setDate(lastWeekEnd.getDate() - 1);

  // Filter workouts by timeframe
  const thisWeekWorkouts = workouts.filter(w => {
    const date = new Date(w.date);
    return date >= thisWeekStart && date <= today;
  });

  const lastWeekWorkouts = workouts.filter(w => {
    const date = new Date(w.date);
    return date >= lastWeekStart && date < thisWeekStart;
  });

  // Calculate metrics
  const thisWeekVolume = thisWeekWorkouts.reduce((acc, w) => acc + w.totalVolume, 0);
  const lastWeekVolume = lastWeekWorkouts.reduce((acc, w) => acc + w.totalVolume, 0);
  const volumeChange = lastWeekVolume > 0 ? ((thisWeekVolume - lastWeekVolume) / lastWeekVolume * 100).toFixed(1) : 0;

  const thisWeekSessions = thisWeekWorkouts.length;
  const lastWeekSessions = lastWeekWorkouts.length;

  // Get weight data
  const currentWeight = weightHistory[0]?.weight || 0;
  const previousWeight = weightHistory.find(w => {
    const date = new Date(w.date);
    return date < thisWeekStart;
  })?.weight || currentWeight;
  const weightChange = currentWeight - previousWeight;

  // Calculate average HR (mock data for now)
  const thisWeekAvgHR = 135;
  const lastWeekAvgHR = 130;

  // Personal bests this period
  const personalBests = [
    { exercise: 'Max Bench', value: '100kg', isNew: true },
    { exercise: 'Squat', value: '140kg', isNew: false },
  ];

  // Generate mock chart data
  const chartData = {
    thisWeek: [2400, 3200, 0, 4100, 2800, 0, 0],
    lastWeek: [2100, 2900, 3500, 0, 2600, 3100, 0],
  };

  const maxChartValue = Math.max(...chartData.thisWeek, ...chartData.lastWeek);

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header
          title="Comparison Engine"
          leftIcon="arrow_back"
          onLeftClick={() => setView(View.DASHBOARD)}
          rightIcon="more_vert"
        />

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Header Section */}
          <div className="px-6 pt-4 pb-6">
            <h2 className="text-2xl font-bold mb-1">
              PERFORMANCE <span className="text-cyan-400">VS.</span>
            </h2>
            <p className="text-gray-400 text-sm">Comparing current metrics against previous cycle</p>
          </div>

          {/* Week Comparison Cards */}
          <div className="px-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Last Week */}
              <GlassCard className="border border-white/10">
                <p className="text-xs text-gray-400 uppercase mb-2">Last Week</p>
                <p className="text-3xl font-bold">{lastWeekVolume.toLocaleString()}<span className="text-sm text-gray-400 ml-1">kg</span></p>
                <p className="text-xs text-gray-500">Total Volume</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="material-symbols-rounded text-gray-400 text-sm">favorite</span>
                  <span className="text-sm text-gray-400">{lastWeekAvgHR}bpm</span>
                </div>
              </GlassCard>

              {/* This Week */}
              <GlassCard className="border border-cyan-500/30 bg-cyan-500/5">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-xs text-cyan-400 uppercase">This Week</p>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">LIVE</span>
                </div>
                <p className="text-3xl font-bold text-cyan-400">{thisWeekVolume.toLocaleString()}<span className="text-sm text-gray-400 ml-1">kg</span></p>
                <p className="text-xs text-gray-500">Total Volume</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="material-symbols-rounded text-cyan-400 text-sm">favorite</span>
                  <span className="text-sm text-cyan-400">{thisWeekAvgHR}bpm</span>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Volume Chart */}
          <div className="px-6 mb-6">
            <GlassCard>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm">Weekly Volume</h3>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                    <span className="text-gray-400">Last</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-cyan-400">This</span>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="flex items-end gap-1 h-32 mb-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-0.5 items-end h-24">
                      {/* Last week bar */}
                      <div
                        className="flex-1 bg-gray-600 rounded-t transition-all"
                        style={{ height: `${(chartData.lastWeek[i] / maxChartValue) * 100}%` }}
                      />
                      {/* This week bar */}
                      <div
                        className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t transition-all"
                        style={{ height: `${(chartData.thisWeek[i] / maxChartValue) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-500">{day}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* AI Coach Analysis */}
          <div className="px-6 mb-6">
            <GlassCard className="border border-neon/30 bg-neon/5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-neon/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-rounded text-neon">smart_toy</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-sm">AI Coach Analysis</h4>
                    <span className="text-[10px] bg-neon/20 text-neon px-2 py-0.5 rounded-full">NEW</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Strength is up <span className="text-neon font-bold">8%</span> in compound lifts, but your recovery time between sets is <span className="text-orange-400 font-bold">10s longer</span>. Consider pacing yourself for better endurance.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Personal Bests */}
          <div className="px-6 mb-6">
            <h3 className="font-bold text-sm mb-3">Personal Bests This Cycle</h3>
            <div className="flex gap-3">
              {personalBests.map((pb, i) => (
                <GlassCard key={i} className={`flex-1 text-center ${pb.isNew ? 'border border-yellow-500/30 bg-yellow-500/5' : ''}`}>
                  <span className="material-symbols-rounded text-2xl mb-1 text-yellow-400">emoji_events</span>
                  <p className="text-lg font-bold">{pb.value}</p>
                  <p className="text-xs text-gray-400">{pb.exercise}</p>
                  {pb.isNew && (
                    <span className="text-[10px] text-yellow-400 mt-1 inline-block">NEW PR!</span>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Physique Comparison */}
          <div className="px-6 mb-6">
            <GlassCard>
              <h3 className="font-bold text-sm mb-4">Physique Scan</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="w-full h-32 rounded-xl bg-white/5 flex items-center justify-center mb-2">
                    {weightHistory.length > 1 && weightHistory[weightHistory.length - 1].photos?.[0] ? (
                      <img
                        src={weightHistory[weightHistory.length - 1].photos![0]}
                        alt="Start"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <span className="material-symbols-rounded text-4xl text-gray-600">person</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">Start</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-32 rounded-xl bg-white/5 flex items-center justify-center mb-2">
                    {weightHistory[0]?.photos?.[0] ? (
                      <img
                        src={weightHistory[0].photos[0]}
                        alt="Latest"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <span className="material-symbols-rounded text-4xl text-gray-600">person</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">Latest</p>
                </div>
              </div>

              {/* Coach insight */}
              <div className="mt-4 p-3 glass-light rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-rounded text-neon text-sm">lightbulb</span>
                  <span className="text-xs text-neon font-bold">Coach Insight</span>
                </div>
                <p className="text-xs text-gray-300">
                  You're exceeding your strength goals, but recovery is at <span className="text-yellow-400">68%</span> efficiency. Try a 3-day reset plan.
                </p>
              </div>
            </GlassCard>
          </div>

          {/* XP Earned Chart */}
          <div className="px-6 mb-6">
            <GlassCard>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-sm">XP Earned</h3>
                <span className="text-neon font-bold">+{stats.totalXpEarned}</span>
              </div>
              <div className="flex items-center gap-1">
                {[100, 150, 80, 200, 120, 90, 0].map((xp, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div
                      className={`w-full rounded-full transition-all ${xp > 0 ? 'bg-neon' : 'bg-gray-700'}`}
                      style={{ height: '6px' }}
                    />
                    <span className="text-[9px] text-gray-500 mt-1 block">+{xp}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Action Buttons */}
          <div className="px-6 flex gap-3">
            <Button variant="secondary" className="flex-1">
              <span className="material-symbols-rounded mr-2 text-sm">search</span>
              Deep Dive
            </Button>
            <Button variant="secondary" className="flex-1">
              <span className="material-symbols-rounded mr-2 text-sm">picture_as_pdf</span>
              Export PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
