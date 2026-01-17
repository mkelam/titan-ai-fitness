import React, { useState } from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';
import { useApp, Workout, WorkoutExercise, WorkoutSet } from '../contexts/AppContext';

// Exercise database for quick add
const EXERCISE_DATABASE = [
  { name: 'Barbell Back Squat', category: 'compound' as const, muscleGroup: 'Legs' },
  { name: 'Leg Press', category: 'compound' as const, muscleGroup: 'Legs' },
  { name: 'Romanian Deadlift', category: 'compound' as const, muscleGroup: 'Legs' },
  { name: 'Bench Press', category: 'compound' as const, muscleGroup: 'Chest' },
  { name: 'Incline Dumbbell Press', category: 'compound' as const, muscleGroup: 'Chest' },
  { name: 'Lat Pulldown', category: 'compound' as const, muscleGroup: 'Back' },
  { name: 'Barbell Row', category: 'compound' as const, muscleGroup: 'Back' },
  { name: 'Overhead Press', category: 'compound' as const, muscleGroup: 'Shoulders' },
  { name: 'Bicep Curl', category: 'isolation' as const, muscleGroup: 'Arms' },
  { name: 'Tricep Pushdown', category: 'isolation' as const, muscleGroup: 'Arms' },
  { name: 'Leg Extension', category: 'isolation' as const, muscleGroup: 'Legs' },
  { name: 'Leg Curl', category: 'isolation' as const, muscleGroup: 'Legs' },
];

export const TrainingLogView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { addWorkout, addXP, updateStreak, goals } = useApp();

  const [exercises, setExercises] = useState<WorkoutExercise[]>([
    {
      id: `ex_${Date.now()}`,
      name: 'Barbell Back Squat',
      category: 'compound',
      muscleGroup: 'Legs',
      sets: [
        { setNumber: 1, weight: 100, reps: 8, completed: false },
        { setNumber: 2, weight: 100, reps: 8, completed: false },
        { setNumber: 3, weight: 100, reps: 8, completed: false },
      ]
    }
  ]);

  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [workoutStartTime] = useState(Date.now());

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Calculate completed sets
  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const completedSets = exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.completed).length, 0);
  const questProgress = totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

  // Update set data
  const updateSet = (exerciseId: string, setNumber: number, field: keyof WorkoutSet, value: number | boolean) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id !== exerciseId) return ex;
      return {
        ...ex,
        sets: ex.sets.map(s => {
          if (s.setNumber !== setNumber) return s;
          return { ...s, [field]: value };
        })
      };
    }));
  };

  // Toggle set completion
  const toggleSetComplete = (exerciseId: string, setNumber: number) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id !== exerciseId) return ex;
      return {
        ...ex,
        sets: ex.sets.map(s => {
          if (s.setNumber !== setNumber) return s;
          return { ...s, completed: !s.completed };
        })
      };
    }));
  };

  // Add set to exercise
  const addSet = (exerciseId: string) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id !== exerciseId) return ex;
      const lastSet = ex.sets[ex.sets.length - 1];
      return {
        ...ex,
        sets: [...ex.sets, {
          setNumber: ex.sets.length + 1,
          weight: lastSet?.weight || 0,
          reps: lastSet?.reps || 8,
          completed: false
        }]
      };
    }));
  };

  // Add new exercise
  const addExercise = (exercise: typeof EXERCISE_DATABASE[0]) => {
    setExercises(prev => [...prev, {
      id: `ex_${Date.now()}`,
      name: exercise.name,
      category: exercise.category,
      muscleGroup: exercise.muscleGroup,
      sets: [
        { setNumber: 1, weight: 0, reps: 8, completed: false },
        { setNumber: 2, weight: 0, reps: 8, completed: false },
        { setNumber: 3, weight: 0, reps: 8, completed: false },
      ]
    }]);
    setShowExercisePicker(false);
  };

  // Remove exercise
  const removeExercise = (exerciseId: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== exerciseId));
  };

  // Calculate total volume
  const calculateVolume = () => {
    return exercises.reduce((total, ex) => {
      return total + ex.sets
        .filter(s => s.completed)
        .reduce((setTotal, s) => setTotal + (s.weight * s.reps), 0);
    }, 0);
  };

  // Finish workout
  const finishWorkout = () => {
    const duration = Math.round((Date.now() - workoutStartTime) / 60000);
    const volume = calculateVolume();
    const xpEarned = Math.round(volume / 100) + (completedSets * 5) + 25; // Base XP formula

    const workout: Workout = {
      id: `workout_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      phase: getWorkoutPhase(),
      exercises: exercises,
      totalVolume: volume,
      duration: duration,
      xpEarned: xpEarned
    };

    addWorkout(workout);
    updateStreak();

    // Show completion and go to dashboard
    setView(View.DASHBOARD);
  };

  const getWorkoutPhase = () => {
    switch (goals.primaryGoal) {
      case 'strength': return 'Strength Phase';
      case 'shredded': return 'Fat Loss Phase';
      case 'performance': return 'Performance Phase';
      default: return 'Training';
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header title="Training Log" leftIcon="arrow_back" onLeftClick={() => setView(View.DASHBOARD)} rightIcon="calendar_today" />

        <div className="flex-1 overflow-y-auto p-4 pb-24">
          {/* Date Header */}
          <div className="flex justify-between items-end mb-6 px-2">
            <div>
              <h2 className="text-3xl font-bold">{dayName}</h2>
              <p className="text-white/70">{dateStr} • {getWorkoutPhase()}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-neon">{calculateVolume().toLocaleString()}</p>
              <p className="text-xs text-white/70">kg volume</p>
            </div>
          </div>

          {/* Quest Progress */}
          <div className="mb-6">
            <GlassCard className="card-neon">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-rounded text-neon">swords</span>
                <span className="font-bold text-sm uppercase text-neon">Daily Quest</span>
              </div>
              <p className="text-sm font-medium">Complete all sets to earn bonus XP!</p>
              <div className="w-full bg-black/50 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-neon h-full transition-all duration-500"
                  style={{ width: `${questProgress}%` }}
                />
              </div>
              <p className="text-xs text-white/70 mt-2">{completedSets} / {totalSets} sets completed</p>
            </GlassCard>
          </div>

          {/* Exercises */}
          <div className="flex flex-col gap-4">
            {exercises.map((ex) => (
              <GlassCard key={ex.id}>
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{ex.name}</h3>
                    <p className="text-xs text-white/70">{ex.muscleGroup} • {ex.category}</p>
                  </div>
                  <button
                    onClick={() => removeExercise(ex.id)}
                    className="text-white/70 hover:text-red-400 transition-colors"
                  >
                    <span className="material-symbols-rounded">delete</span>
                  </button>
                </div>

                {/* Sets */}
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-4 gap-2 text-xs text-white/50 uppercase font-bold text-center mb-1">
                    <span>Set</span>
                    <span>Kg</span>
                    <span>Reps</span>
                    <span>Done</span>
                  </div>
                  {ex.sets.map(set => (
                    <div key={set.setNumber} className="grid grid-cols-4 gap-2 items-center">
                      <div className="glass-light rounded p-2 text-center text-sm font-mono text-white/70">
                        {set.setNumber}
                      </div>
                      <input
                        type="number"
                        value={set.weight}
                        onChange={(e) => updateSet(ex.id, set.setNumber, 'weight', Number(e.target.value))}
                        className="glass-input rounded p-2 text-center text-white font-bold"
                      />
                      <input
                        type="number"
                        value={set.reps}
                        onChange={(e) => updateSet(ex.id, set.setNumber, 'reps', Number(e.target.value))}
                        className="glass-input rounded p-2 text-center text-white font-bold"
                      />
                      <button
                        onClick={() => toggleSetComplete(ex.id, set.setNumber)}
                        className={`p-2 rounded flex items-center justify-center transition-all ${
                          set.completed
                            ? 'bg-neon text-black shadow-[0_0_10px_rgba(0,255,157,0.4)]'
                            : 'glass-light text-white/50 hover:text-white'
                        }`}
                      >
                        <span className="material-symbols-rounded text-lg">check</span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => addSet(ex.id)}
                    className="text-xs flex items-center gap-1 text-white/70 hover:text-white transition-all"
                  >
                    <span className="material-symbols-rounded text-sm">add</span> Add Set
                  </button>
                  <button
                    onClick={() => setView(View.AI_FORM_CHECK)}
                    className="text-xs flex items-center gap-1 text-neon border border-neon/30 px-3 py-1 rounded-full hover:bg-neon/10 transition-all"
                  >
                    <span className="material-symbols-rounded text-sm">videocam</span> AI Form Check
                  </button>
                </div>
              </GlassCard>
            ))}

            <Button variant="secondary" className="mt-4" onClick={() => setShowExercisePicker(true)}>
              + Add Exercise
            </Button>
          </div>
        </div>

        <div className="glass-panel border-t border-white/10 p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/70">Estimated XP</span>
            <span className="text-neon font-bold">+{Math.round(calculateVolume() / 100) + (completedSets * 5) + 25} XP</span>
          </div>
          <Button fullWidth onClick={finishWorkout} variant={completedSets > 0 ? 'primary' : 'secondary'}>
            FINISH WORKOUT
          </Button>
        </div>
      </div>

      {/* Exercise Picker Modal */}
      {showExercisePicker && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowExercisePicker(false)} />
          <div className="relative glass-modal rounded-t-3xl w-full max-h-[70vh] overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Add Exercise</h3>
                <button onClick={() => setShowExercisePicker(false)} className="p-2">
                  <span className="material-symbols-rounded">close</span>
                </button>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[60vh] p-4">
              {EXERCISE_DATABASE.map((exercise, i) => (
                <button
                  key={i}
                  onClick={() => addExercise(exercise)}
                  className="w-full text-left p-4 glass-light rounded-xl mb-2 hover:bg-white/10 transition-all"
                >
                  <p className="font-bold">{exercise.name}</p>
                  <p className="text-xs text-white/70">{exercise.muscleGroup} • {exercise.category}</p>
                </button>
              ))}
              <button
                onClick={() => {
                  setShowExercisePicker(false);
                  setView(View.EXERCISE_LIBRARY);
                }}
                className="w-full text-center p-4 border border-dashed border-neon/30 rounded-xl mt-4 hover:bg-neon/10 transition-all"
              >
                <span className="material-symbols-rounded text-neon text-2xl mb-1">menu_book</span>
                <p className="text-sm text-neon font-medium">Browse Exercise Library</p>
                <p className="text-xs text-white/70">View all exercises with tutorials</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const FormCheckView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => (
  <div className="h-full flex flex-col relative">
    <div className="absolute inset-0 bg-black/70 z-0" />

    <div className="relative z-10 flex flex-col h-full">
      <Header title="AI Form Check" leftIcon="close" onLeftClick={() => setView(View.TRAINING_LOG)} />

      <div className="flex-1 relative">
        {/* Camera feed placeholder */}
        <div className="w-full h-full bg-black/80 flex items-center justify-center">
          <span className="material-symbols-rounded text-6xl text-white/30">videocam</span>
        </div>

        {/* Overlay UI */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-64 h-96 border-2 border-neon/50 rounded-3xl relative">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon -mt-1 -ml-1"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon -mt-1 -mr-1"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon -mb-1 -ml-1"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon -mb-1 -mr-1"></div>

            {/* Skeleton Overlay Mock */}
            <div className="absolute inset-0 flex items-center justify-center opacity-50">
              <svg width="200" height="300" viewBox="0 0 200 300" fill="none" stroke="#00ff9d" strokeWidth="2">
                <circle cx="100" cy="50" r="15" />
                <line x1="100" y1="65" x2="100" y2="150" />
                <line x1="100" y1="80" x2="60" y2="120" />
                <line x1="100" y1="80" x2="140" y2="120" />
                <line x1="100" y1="150" x2="70" y2="250" />
                <line x1="100" y1="150" x2="130" y2="250" />
              </svg>
            </div>
          </div>

          {/* Feedback card */}
          <GlassCard className="mt-8 px-6 py-3">
            <p className="text-neon font-mono text-sm">POSITION YOURSELF IN FRAME</p>
          </GlassCard>
        </div>
      </div>

      <div className="p-6 glass-panel flex justify-center gap-6">
        <button className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:border-neon transition-all">
          <div className="w-12 h-12 bg-red-500 rounded-full"></div>
        </button>
      </div>
    </div>
  </div>
);
