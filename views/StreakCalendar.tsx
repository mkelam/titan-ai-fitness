import React, { useState } from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';
import { useApp } from '../contexts/AppContext';

export const StreakCalendarView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { stats, workouts } = useApp();
  const [activeTab, setActiveTab] = useState<'completion' | 'heatmap'>('completion');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get workout dates for the calendar
  const workoutDates = new Set(workouts.map(w => w.date));

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({
        day,
        date: dateStr,
        hasWorkout: workoutDates.has(dateStr),
        isToday: dateStr === new Date().toISOString().split('T')[0]
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Milestones
  const milestones = [
    { name: '7-Day Fire Badge', target: 7, icon: 'local_fire_department', color: 'text-orange-400' },
    { name: '14-Day Warrior', target: 14, icon: 'shield', color: 'text-blue-400' },
    { name: '30-Day Fire Badge', target: 30, icon: 'whatshot', color: 'text-red-500' },
    { name: 'Monthly Master', target: 30, icon: 'military_tech', color: 'text-yellow-400' },
  ];

  const nextMilestone = milestones.find(m => m.target > stats.streak) || milestones[milestones.length - 1];
  const milestoneProgress = Math.min((stats.streak / nextMilestone.target) * 100, 100);

  // Streak at risk check (simplified - if no workout today and it's past 6pm)
  const isStreakAtRisk = stats.streak > 0 && !workoutDates.has(new Date().toISOString().split('T')[0]) && new Date().getHours() >= 18;

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header
          title="Streak Calendar"
          leftIcon="arrow_back"
          onLeftClick={() => setView(View.DASHBOARD)}
          rightIcon="settings"
          onRightClick={() => setView(View.SETTINGS)}
        />

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Streak Hero */}
          <div className="text-center py-8 px-6">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500 to-red-600 rounded-full opacity-20 animate-pulse" />
              <div className="relative w-full h-full flex items-center justify-center">
                <span className="material-symbols-rounded text-5xl text-orange-500">local_fire_department</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                {stats.streak} Days
              </span>
            </h1>
            <p className="text-gray-400 uppercase tracking-widest text-sm">Current Streak</p>
          </div>

          {/* Tabs */}
          <div className="px-6 mb-6">
            <div className="flex gap-2 glass-panel rounded-full p-1">
              <button
                onClick={() => setActiveTab('completion')}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'completion' ? 'bg-neon text-black' : 'text-gray-400'
                }`}
              >
                Completion
              </button>
              <button
                onClick={() => setActiveTab('heatmap')}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'heatmap' ? 'bg-neon text-black' : 'text-gray-400'
                }`}
              >
                Heatmap
              </button>
            </div>
          </div>

          {/* Calendar */}
          <div className="px-6 mb-6">
            <GlassCard>
              {/* Month Navigation */}
              <div className="flex justify-between items-center mb-4">
                <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-full">
                  <span className="material-symbols-rounded">chevron_left</span>
                </button>
                <h3 className="font-bold">{formatMonth(currentMonth)}</h3>
                <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-full">
                  <span className="material-symbols-rounded">chevron_right</span>
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-center text-xs text-gray-500 font-medium py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((dayData, i) => (
                  <div key={i} className="aspect-square flex items-center justify-center">
                    {dayData ? (
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          dayData.hasWorkout
                            ? activeTab === 'heatmap'
                              ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                              : 'bg-neon text-black shadow-[0_0_10px_rgba(0,255,157,0.5)]'
                            : dayData.isToday
                            ? 'border-2 border-neon text-neon'
                            : 'text-gray-500'
                        }`}
                      >
                        {dayData.day}
                      </div>
                    ) : (
                      <div className="w-9 h-9" />
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Streak Milestones */}
          <div className="px-6 mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold">Streak Milestones</h3>
              <button className="text-xs text-neon">View All</button>
            </div>

            <GlassCard>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <span className={`material-symbols-rounded text-2xl ${nextMilestone.color}`}>
                    {nextMilestone.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{nextMilestone.name}</h4>
                  <p className="text-xs text-gray-400">
                    {nextMilestone.target - stats.streak} more days to unlock exclusive rewards
                  </p>
                </div>
                <span className="text-sm text-gray-400">{stats.streak}/{nextMilestone.target}</span>
              </div>
              <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 transition-all"
                  style={{ width: `${milestoneProgress}%` }}
                />
              </div>
            </GlassCard>
          </div>

          {/* Streak at Risk Warning */}
          {isStreakAtRisk && (
            <div className="px-6 mb-6">
              <GlassCard className="border border-red-500/50 bg-red-500/10">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-rounded text-red-400 text-2xl">warning</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-red-400">Streak at Risk!</h4>
                    <p className="text-sm text-gray-300 mb-3">
                      You have <span className="text-neon font-bold">1 Freeze</span> left! Use it now or do a 5-min mobility flow to keep the fire burning.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="secondary" className="text-sm py-2">
                        <span className="material-symbols-rounded text-sm mr-1">ac_unit</span>
                        Freeze (1)
                      </Button>
                      <Button className="text-sm py-2" onClick={() => setView(View.TRAINING_LOG)}>
                        Start 5-min Flow
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {/* Stats Summary */}
          <div className="px-6">
            <div className="grid grid-cols-3 gap-3">
              <GlassCard className="text-center py-3">
                <p className="text-2xl font-bold text-neon">{stats.streak}</p>
                <p className="text-[10px] text-gray-400 uppercase">Current</p>
              </GlassCard>
              <GlassCard className="text-center py-3">
                <p className="text-2xl font-bold text-orange-400">{stats.longestStreak}</p>
                <p className="text-[10px] text-gray-400 uppercase">Best</p>
              </GlassCard>
              <GlassCard className="text-center py-3">
                <p className="text-2xl font-bold text-blue-400">{workouts.length}</p>
                <p className="text-[10px] text-gray-400 uppercase">Total</p>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
