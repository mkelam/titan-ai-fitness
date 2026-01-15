import React, { useState } from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  category: 'compound' | 'isolation' | 'cardio' | 'mobility';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
  description: string;
  tips: string[];
  videoUrl?: string;
}

export const ExerciseLibraryView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'compound' | 'isolation' | 'cardio' | 'mobility'>('all');
  const [activeMuscle, setActiveMuscle] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const exercises: Exercise[] = [
    // Chest
    {
      id: 'bench_press',
      name: 'Barbell Bench Press',
      muscleGroup: 'Chest',
      category: 'compound',
      difficulty: 'intermediate',
      equipment: ['Barbell', 'Bench'],
      description: 'The king of chest exercises. Lie on a flat bench, grip the bar slightly wider than shoulder-width, lower to chest, and press up.',
      tips: ['Keep shoulder blades retracted', 'Feet flat on floor', 'Control the descent']
    },
    {
      id: 'incline_db_press',
      name: 'Incline Dumbbell Press',
      muscleGroup: 'Chest',
      category: 'compound',
      difficulty: 'intermediate',
      equipment: ['Dumbbells', 'Incline Bench'],
      description: 'Targets upper chest. Set bench to 30-45 degrees, press dumbbells from shoulder height.',
      tips: ['Don\'t go too steep', 'Full range of motion', 'Control at the bottom']
    },
    {
      id: 'cable_fly',
      name: 'Cable Fly',
      muscleGroup: 'Chest',
      category: 'isolation',
      difficulty: 'beginner',
      equipment: ['Cable Machine'],
      description: 'Great for chest isolation and stretch. Stand between cables, bring hands together in arc motion.',
      tips: ['Slight bend in elbows', 'Squeeze at the center', 'Feel the stretch']
    },
    // Back
    {
      id: 'deadlift',
      name: 'Conventional Deadlift',
      muscleGroup: 'Back',
      category: 'compound',
      difficulty: 'advanced',
      equipment: ['Barbell'],
      description: 'Full body compound lift. Hinge at hips, grip bar, drive through heels, stand tall.',
      tips: ['Keep back neutral', 'Bar close to body', 'Lock out at top']
    },
    {
      id: 'lat_pulldown',
      name: 'Lat Pulldown',
      muscleGroup: 'Back',
      category: 'compound',
      difficulty: 'beginner',
      equipment: ['Cable Machine'],
      description: 'Pull bar to upper chest, squeeze lats, control the return.',
      tips: ['Don\'t lean back too much', 'Pull with elbows', 'Full stretch at top']
    },
    {
      id: 'barbell_row',
      name: 'Barbell Row',
      muscleGroup: 'Back',
      category: 'compound',
      difficulty: 'intermediate',
      equipment: ['Barbell'],
      description: 'Hinge forward, pull bar to lower chest/upper abs.',
      tips: ['Keep core tight', 'Row to belly button', 'Squeeze shoulder blades']
    },
    // Legs
    {
      id: 'squat',
      name: 'Barbell Back Squat',
      muscleGroup: 'Legs',
      category: 'compound',
      difficulty: 'intermediate',
      equipment: ['Barbell', 'Squat Rack'],
      description: 'The king of leg exercises. Bar on upper back, squat to parallel or below.',
      tips: ['Knees track toes', 'Chest up', 'Drive through heels']
    },
    {
      id: 'leg_press',
      name: 'Leg Press',
      muscleGroup: 'Legs',
      category: 'compound',
      difficulty: 'beginner',
      equipment: ['Leg Press Machine'],
      description: 'Push platform away, control descent, don\'t lock knees.',
      tips: ['Feet shoulder width', 'Lower back on pad', 'Full range of motion']
    },
    {
      id: 'rdl',
      name: 'Romanian Deadlift',
      muscleGroup: 'Legs',
      category: 'compound',
      difficulty: 'intermediate',
      equipment: ['Barbell', 'Dumbbells'],
      description: 'Hip hinge movement targeting hamstrings and glutes.',
      tips: ['Soft knee bend', 'Push hips back', 'Feel hamstring stretch']
    },
    {
      id: 'leg_curl',
      name: 'Lying Leg Curl',
      muscleGroup: 'Legs',
      category: 'isolation',
      difficulty: 'beginner',
      equipment: ['Leg Curl Machine'],
      description: 'Isolates hamstrings. Curl weight toward glutes.',
      tips: ['Control the movement', 'Don\'t use momentum', 'Squeeze at top']
    },
    // Shoulders
    {
      id: 'ohp',
      name: 'Overhead Press',
      muscleGroup: 'Shoulders',
      category: 'compound',
      difficulty: 'intermediate',
      equipment: ['Barbell'],
      description: 'Standing press from shoulders to overhead lockout.',
      tips: ['Core tight', 'Don\'t lean back', 'Full lockout']
    },
    {
      id: 'lateral_raise',
      name: 'Lateral Raise',
      muscleGroup: 'Shoulders',
      category: 'isolation',
      difficulty: 'beginner',
      equipment: ['Dumbbells'],
      description: 'Raise dumbbells to sides until parallel with floor.',
      tips: ['Slight bend in elbows', 'Control the weight', 'Lead with elbows']
    },
    // Arms
    {
      id: 'bicep_curl',
      name: 'Barbell Bicep Curl',
      muscleGroup: 'Arms',
      category: 'isolation',
      difficulty: 'beginner',
      equipment: ['Barbell', 'EZ Bar'],
      description: 'Classic bicep builder. Curl weight with strict form.',
      tips: ['No swinging', 'Full range of motion', 'Squeeze at top']
    },
    {
      id: 'tricep_pushdown',
      name: 'Tricep Pushdown',
      muscleGroup: 'Arms',
      category: 'isolation',
      difficulty: 'beginner',
      equipment: ['Cable Machine'],
      description: 'Push handle down, keep elbows pinned to sides.',
      tips: ['Elbows stationary', 'Full extension', 'Control return']
    },
  ];

  const muscleGroups = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms'];

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ex.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || ex.category === activeFilter;
    const matchesMuscle = !activeMuscle || ex.muscleGroup === activeMuscle;
    return matchesSearch && matchesFilter && matchesMuscle;
  });

  const getDifficultyColor = (difficulty: Exercise['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-400/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'advanced': return 'text-red-400 bg-red-400/20';
    }
  };

  const getCategoryColor = (category: Exercise['category']) => {
    switch (category) {
      case 'compound': return 'text-purple-400';
      case 'isolation': return 'text-blue-400';
      case 'cardio': return 'text-orange-400';
      case 'mobility': return 'text-green-400';
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header
          title="Exercise Library"
          leftIcon="arrow_back"
          onLeftClick={() => setView(View.TRAINING_LOG)}
          rightIcon="favorite"
        />

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Search Bar */}
          <div className="px-6 pt-4 mb-4">
            <div className="relative">
              <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
              <input
                type="text"
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input w-full rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="px-6 mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { id: 'all' as const, label: 'All' },
                { id: 'compound' as const, label: 'Compound' },
                { id: 'isolation' as const, label: 'Isolation' },
                { id: 'cardio' as const, label: 'Cardio' },
                { id: 'mobility' as const, label: 'Mobility' },
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeFilter === filter.id ? 'bg-neon text-black' : 'glass-light text-gray-400'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Muscle Group Filter */}
          <div className="px-6 mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveMuscle(null)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  !activeMuscle ? 'bg-white/20 text-white' : 'text-gray-500'
                }`}
              >
                All Muscles
              </button>
              {muscleGroups.map(muscle => (
                <button
                  key={muscle}
                  onClick={() => setActiveMuscle(muscle)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeMuscle === muscle ? 'bg-white/20 text-white' : 'text-gray-500'
                  }`}
                >
                  {muscle}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="px-6 mb-3">
            <p className="text-sm text-gray-400">{filteredExercises.length} exercises found</p>
          </div>

          {/* Exercise List */}
          <div className="px-6">
            {filteredExercises.map(exercise => (
              <GlassCard
                key={exercise.id}
                className="mb-3 cursor-pointer hover:border-neon/30 transition-all"
                onClick={() => setSelectedExercise(exercise)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <span className="material-symbols-rounded text-2xl text-gray-400">fitness_center</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold truncate">{exercise.name}</h4>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-400">{exercise.muscleGroup}</span>
                      <span className="text-gray-600">•</span>
                      <span className={getCategoryColor(exercise.category)}>{exercise.category}</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      {exercise.equipment.slice(0, 2).map((eq, i) => (
                        <span key={i} className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-gray-400">
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] px-2 py-1 rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedExercise(null)} />
          <div className="relative glass-modal rounded-t-3xl w-full max-h-[85vh] overflow-hidden">
            {/* Header */}
            <div className="relative h-40 bg-gradient-to-b from-blue-900/30 to-transparent flex items-center justify-center">
              <span className="material-symbols-rounded text-6xl text-white/20">fitness_center</span>
              <button
                onClick={() => setSelectedExercise(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass-light flex items-center justify-center"
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Title */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(selectedExercise.difficulty)}`}>
                    {selectedExercise.difficulty}
                  </span>
                  <span className={`text-xs ${getCategoryColor(selectedExercise.category)}`}>
                    {selectedExercise.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold">{selectedExercise.name}</h2>
                <p className="text-gray-400">{selectedExercise.muscleGroup}</p>
              </div>

              {/* Equipment */}
              <div className="mb-4">
                <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Equipment</h3>
                <div className="flex gap-2 flex-wrap">
                  {selectedExercise.equipment.map((eq, i) => (
                    <span key={i} className="px-3 py-1 rounded-full glass-light text-sm">
                      {eq}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">How to Perform</h3>
                <p className="text-gray-300">{selectedExercise.description}</p>
              </div>

              {/* Tips */}
              <div className="mb-6">
                <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Pro Tips</h3>
                <ul className="space-y-2">
                  {selectedExercise.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="material-symbols-rounded text-neon text-sm mt-0.5">check_circle</span>
                      <span className="text-gray-300 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="secondary" className="flex-1">
                  <span className="material-symbols-rounded mr-2 text-sm">play_circle</span>
                  Watch Video
                </Button>
                <Button className="flex-1" onClick={() => {
                  setSelectedExercise(null);
                  setView(View.TRAINING_LOG);
                }}>
                  <span className="material-symbols-rounded mr-2 text-sm">add</span>
                  Add to Workout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
