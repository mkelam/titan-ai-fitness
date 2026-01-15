import React, { useState } from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';
import { useApp } from '../contexts/AppContext';

export const WeightProjectionView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { weightHistory } = useApp();
  const [targetWeight, setTargetWeight] = useState(75);
  const [targetDate, setTargetDate] = useState('2024-06-01');

  const currentWeight = weightHistory[0]?.weight || 80;
  const weightToLose = currentWeight - targetWeight;
  const isGaining = weightToLose < 0;

  // Calculate projections
  const today = new Date();
  const target = new Date(targetDate);
  const weeksRemaining = Math.ceil((target.getTime() - today.getTime()) / (7 * 24 * 60 * 60 * 1000));
  const weeklyRate = weeksRemaining > 0 ? Math.abs(weightToLose) / weeksRemaining : 0;

  // Generate projection data points
  const projectionData = [];
  for (let i = 0; i <= weeksRemaining; i++) {
    const projectedWeight = isGaining
      ? currentWeight + (Math.abs(weightToLose) * (i / weeksRemaining))
      : currentWeight - (weightToLose * (i / weeksRemaining));
    projectionData.push({
      week: i,
      weight: projectedWeight.toFixed(1)
    });
  }

  // Milestones
  const milestones = [
    { label: '5% Lost', target: currentWeight * 0.95, achieved: currentWeight <= currentWeight * 0.95 },
    { label: '10% Lost', target: currentWeight * 0.90, achieved: currentWeight <= currentWeight * 0.90 },
    { label: 'Halfway', target: currentWeight - (weightToLose / 2), achieved: currentWeight <= currentWeight - (weightToLose / 2) },
    { label: 'Goal!', target: targetWeight, achieved: currentWeight <= targetWeight },
  ];

  // Recommendations based on rate
  const getRecommendation = () => {
    if (weeklyRate > 1) {
      return {
        status: 'aggressive',
        color: 'text-red-400',
        icon: 'warning',
        message: 'This rate is aggressive (>1kg/week). Consider extending your timeline for sustainable results.'
      };
    }
    if (weeklyRate > 0.5) {
      return {
        status: 'moderate',
        color: 'text-yellow-400',
        icon: 'info',
        message: 'This rate is moderate (0.5-1kg/week). Achievable with consistent effort.'
      };
    }
    return {
      status: 'safe',
      color: 'text-green-400',
      icon: 'check_circle',
      message: 'This rate is safe and sustainable (<0.5kg/week). Great for long-term success!'
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header
          title="Weight Projection"
          leftIcon="arrow_back"
          onLeftClick={() => setView(View.PROGRESS_CHECKIN)}
          rightIcon="tune"
        />

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Current Status */}
          <div className="px-6 pt-4 mb-6">
            <GlassCard className="bg-gradient-to-br from-cyan-900/30 to-black border border-cyan-500/30">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{currentWeight}</p>
                  <p className="text-xs text-gray-400">Current kg</p>
                </div>
                <div className="flex items-center justify-center">
                  <span className="material-symbols-rounded text-cyan-400 text-3xl">
                    {isGaining ? 'trending_up' : 'trending_down'}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neon">{targetWeight}</p>
                  <p className="text-xs text-gray-400">Target kg</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-center">
                <p className="text-sm text-gray-400">
                  {Math.abs(weightToLose).toFixed(1)} kg to {isGaining ? 'gain' : 'lose'}
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Projection Chart */}
          <div className="px-6 mb-6">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-3">Projection Timeline</h3>
            <GlassCard>
              <div className="relative h-40 mb-4">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                  <span>{Math.max(currentWeight, targetWeight).toFixed(0)}</span>
                  <span>{((currentWeight + targetWeight) / 2).toFixed(0)}</span>
                  <span>{Math.min(currentWeight, targetWeight).toFixed(0)}</span>
                </div>

                {/* Chart area */}
                <div className="ml-8 h-full relative">
                  {/* Projection line visualization */}
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="projectionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00ff9d" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#00ff9d" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <path
                      d={`M 0 ${isGaining ? 100 : 0} L 100 ${isGaining ? 0 : 100} L 100 100 L 0 100 Z`}
                      fill="url(#projectionGradient)"
                    />
                    {/* Line */}
                    <line
                      x1="0" y1={isGaining ? 100 : 0}
                      x2="100" y2={isGaining ? 0 : 100}
                      stroke="#00ff9d"
                      strokeWidth="2"
                    />
                    {/* Start point */}
                    <circle cx="0" cy={isGaining ? 100 : 0} r="4" fill="#00ff9d" />
                    {/* End point */}
                    <circle cx="100" cy={isGaining ? 0 : 100} r="4" fill="#00ff9d" />
                  </svg>

                  {/* Goal line */}
                  <div className="absolute bottom-0 left-0 right-0 border-t-2 border-dashed border-cyan-400/50" />
                </div>
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between text-xs text-gray-500 mt-2 ml-8">
                <span>Now</span>
                <span>{Math.round(weeksRemaining / 2)}w</span>
                <span>{weeksRemaining}w</span>
              </div>
            </GlassCard>
          </div>

          {/* Rate Info */}
          <div className="px-6 mb-6">
            <GlassCard className={`border-l-4 border-l-${recommendation.status === 'safe' ? 'green' : recommendation.status === 'moderate' ? 'yellow' : 'red'}-400`}>
              <div className="flex items-start gap-3">
                <span className={`material-symbols-rounded ${recommendation.color} text-2xl`}>
                  {recommendation.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">{weeklyRate.toFixed(2)} kg/week</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full bg-white/10 ${recommendation.color}`}>
                      {recommendation.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{recommendation.message}</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Milestones */}
          <div className="px-6 mb-6">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-3">Milestones</h3>
            <GlassCard>
              {milestones.map((milestone, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-3 ${
                    i !== milestones.length - 1 ? 'border-b border-white/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.achieved ? 'bg-green-500/20' : 'bg-white/5'
                    }`}>
                      <span className={`material-symbols-rounded text-sm ${
                        milestone.achieved ? 'text-green-400' : 'text-gray-500'
                      }`}>
                        {milestone.achieved ? 'check' : 'radio_button_unchecked'}
                      </span>
                    </div>
                    <span className={milestone.achieved ? 'text-green-400' : ''}>{milestone.label}</span>
                  </div>
                  <span className="text-sm text-gray-400">{milestone.target.toFixed(1)} kg</span>
                </div>
              ))}
            </GlassCard>
          </div>

          {/* Adjust Goal */}
          <div className="px-6 mb-6">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-3">Adjust Goal</h3>
            <GlassCard>
              <div className="mb-4">
                <label className="text-xs text-gray-400 block mb-2">Target Weight (kg)</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTargetWeight(prev => prev - 1)}
                    className="w-10 h-10 rounded-full glass-light flex items-center justify-center"
                  >
                    <span className="material-symbols-rounded">remove</span>
                  </button>
                  <input
                    type="number"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(Number(e.target.value))}
                    className="glass-input flex-1 text-center text-xl font-bold py-2 rounded-xl"
                  />
                  <button
                    onClick={() => setTargetWeight(prev => prev + 1)}
                    className="w-10 h-10 rounded-full glass-light flex items-center justify-center"
                  >
                    <span className="material-symbols-rounded">add</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-2">Target Date</label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="glass-input w-full px-4 py-3 rounded-xl"
                />
              </div>
            </GlassCard>
          </div>

          {/* Tips */}
          <div className="px-6 mb-6">
            <GlassCard className="bg-neon/5 border border-neon/20">
              <div className="flex gap-3">
                <span className="material-symbols-rounded text-neon text-2xl">lightbulb</span>
                <div>
                  <h4 className="font-bold text-sm mb-1">Pro Tip</h4>
                  <p className="text-sm text-gray-400">
                    {isGaining
                      ? 'For muscle gain, aim for 0.25-0.5 kg per week with a 300-500 calorie surplus.'
                      : 'For fat loss, aim for 0.5-1 kg per week with a 500-750 calorie deficit.'}
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-6">
            <Button fullWidth onClick={() => setView(View.PROGRESS_CHECKIN)}>
              <span className="material-symbols-rounded mr-2 text-sm">save</span>
              Save Goal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
