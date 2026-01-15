import React, { useState } from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';
import { useApp, NutritionLog, Meal } from '../contexts/AppContext';

// Quick add food database
const FOOD_DATABASE = [
  { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fats: 3.6 },
  { name: 'Brown Rice (1 cup)', calories: 216, protein: 5, carbs: 45, fats: 1.8 },
  { name: 'Eggs (2 large)', calories: 156, protein: 12, carbs: 1.2, fats: 10 },
  { name: 'Protein Shake', calories: 120, protein: 24, carbs: 3, fats: 1.5 },
  { name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fats: 0.7 },
  { name: 'Oatmeal (1 cup)', calories: 158, protein: 6, carbs: 27, fats: 3 },
  { name: 'Salmon (100g)', calories: 208, protein: 20, carbs: 0, fats: 13 },
  { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fats: 0.4 },
  { name: 'Sweet Potato', calories: 103, protein: 2.3, carbs: 24, fats: 0.1 },
  { name: 'Broccoli (1 cup)', calories: 55, protein: 3.7, carbs: 11, fats: 0.6 },
  { name: 'Almonds (30g)', calories: 173, protein: 6, carbs: 6, fats: 15 },
  { name: 'Avocado (half)', calories: 160, protein: 2, carbs: 9, fats: 15 },
];

export const NutritionLogView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { getTodayNutrition, addNutritionLog, addXP, goals } = useApp();

  const today = new Date().toISOString().split('T')[0];
  const todayNutrition = getTodayNutrition();

  const [meals, setMeals] = useState<Meal[]>(todayNutrition?.meals || []);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);

  // Manual entry state
  const [manualMeal, setManualMeal] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  });

  // Calculate totals
  const totals = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  // Goals based on user preference
  const getTargets = () => {
    switch (goals.primaryGoal) {
      case 'strength':
        return { calories: 2800, protein: 180, carbs: 300, fats: 90 };
      case 'shredded':
        return { calories: 2000, protein: 200, carbs: 150, fats: 70 };
      case 'performance':
        return { calories: 2500, protein: 150, carbs: 300, fats: 80 };
      default:
        return { calories: 2200, protein: 150, carbs: 250, fats: 75 };
    }
  };

  const targets = getTargets();

  // Add quick food
  const addQuickFood = (food: typeof FOOD_DATABASE[0]) => {
    const meal: Meal = {
      id: `meal_${Date.now()}`,
      name: food.name,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fats: food.fats,
    };
    setMeals(prev => [...prev, meal]);
    setShowQuickAdd(false);
  };

  // Add manual entry
  const addManualMeal = () => {
    if (!manualMeal.name || !manualMeal.calories) return;

    const meal: Meal = {
      id: `meal_${Date.now()}`,
      name: manualMeal.name,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      calories: Number(manualMeal.calories) || 0,
      protein: Number(manualMeal.protein) || 0,
      carbs: Number(manualMeal.carbs) || 0,
      fats: Number(manualMeal.fats) || 0,
    };
    setMeals(prev => [...prev, meal]);
    setManualMeal({ name: '', calories: '', protein: '', carbs: '', fats: '' });
    setShowManualEntry(false);
  };

  // Remove meal
  const removeMeal = (mealId: string) => {
    setMeals(prev => prev.filter(m => m.id !== mealId));
  };

  // Save nutrition log
  const saveLog = () => {
    const log: NutritionLog = {
      date: today,
      calories: totals.calories,
      protein: totals.protein,
      carbs: totals.carbs,
      fats: totals.fats,
      meals: meals,
    };
    addNutritionLog(log);
    addXP(15, 'Nutrition Logged');
    setView(View.DASHBOARD);
  };

  // Progress calculation
  const getProgress = (current: number, target: number) => Math.min((current / target) * 100, 100);

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header title="Nutrition Log" leftIcon="arrow_back" onLeftClick={() => setView(View.DASHBOARD)} rightIcon="calendar_today" />

        <div className="flex-1 overflow-y-auto p-4 pb-24">
          {/* Daily Summary */}
          <GlassCard className="mb-6">
            <div className="text-center mb-4">
              <p className="text-4xl font-bold text-neon">{totals.calories}</p>
              <p className="text-gray-400">/ {targets.calories} kcal</p>
              <div className="w-full bg-black/50 h-2 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-neon h-full transition-all duration-500"
                  style={{ width: `${getProgress(totals.calories, targets.calories)}%` }}
                />
              </div>
            </div>

            {/* Macros Grid */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                    <circle
                      cx="32" cy="32" r="28" fill="none" stroke="#ef4444" strokeWidth="4"
                      strokeDasharray={`${getProgress(totals.protein, targets.protein) * 1.76} 176`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">{totals.protein}g</span>
                </div>
                <p className="text-xs text-gray-400">Protein</p>
                <p className="text-xs text-red-400">{targets.protein}g goal</p>
              </div>

              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                    <circle
                      cx="32" cy="32" r="28" fill="none" stroke="#3b82f6" strokeWidth="4"
                      strokeDasharray={`${getProgress(totals.carbs, targets.carbs) * 1.76} 176`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">{totals.carbs}g</span>
                </div>
                <p className="text-xs text-gray-400">Carbs</p>
                <p className="text-xs text-blue-400">{targets.carbs}g goal</p>
              </div>

              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                    <circle
                      cx="32" cy="32" r="28" fill="none" stroke="#f59e0b" strokeWidth="4"
                      strokeDasharray={`${getProgress(totals.fats, targets.fats) * 1.76} 176`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">{totals.fats}g</span>
                </div>
                <p className="text-xs text-gray-400">Fats</p>
                <p className="text-xs text-yellow-400">{targets.fats}g goal</p>
              </div>
            </div>
          </GlassCard>

          {/* Today's Meals */}
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-3">Today's Meals</h3>
            {meals.length === 0 ? (
              <GlassCard className="text-center py-8">
                <span className="material-symbols-rounded text-4xl text-gray-600 mb-2">restaurant</span>
                <p className="text-gray-400">No meals logged yet</p>
                <p className="text-xs text-gray-500">Tap + to add your first meal</p>
              </GlassCard>
            ) : (
              <div className="flex flex-col gap-2">
                {meals.map(meal => (
                  <GlassCard key={meal.id} className="flex justify-between items-center py-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold">{meal.name}</h4>
                        <span className="text-xs text-gray-500">{meal.time}</span>
                      </div>
                      <div className="flex gap-3 text-xs text-gray-400 mt-1">
                        <span>{meal.calories} kcal</span>
                        <span className="text-red-400">{meal.protein}g P</span>
                        <span className="text-blue-400">{meal.carbs}g C</span>
                        <span className="text-yellow-400">{meal.fats}g F</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeMeal(meal.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <span className="material-symbols-rounded">delete</span>
                    </button>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>

          {/* Add Buttons */}
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setShowQuickAdd(true)}>
              <span className="material-symbols-rounded mr-2">bolt</span>
              Quick Add
            </Button>
            <Button variant="secondary" className="flex-1" onClick={() => setShowManualEntry(true)}>
              <span className="material-symbols-rounded mr-2">edit</span>
              Manual
            </Button>
          </div>
        </div>

        {/* Save Button */}
        <div className="glass-panel border-t border-white/10 p-4">
          <Button fullWidth onClick={saveLog}>
            SAVE & EARN +15 XP
          </Button>
        </div>
      </div>

      {/* Quick Add Modal */}
      {showQuickAdd && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowQuickAdd(false)} />
          <div className="relative glass-modal rounded-t-3xl w-full max-h-[70vh] overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Quick Add Food</h3>
                <button onClick={() => setShowQuickAdd(false)} className="p-2">
                  <span className="material-symbols-rounded">close</span>
                </button>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[60vh] p-4">
              {FOOD_DATABASE.map((food, i) => (
                <button
                  key={i}
                  onClick={() => addQuickFood(food)}
                  className="w-full text-left p-4 glass-light rounded-xl mb-2 hover:bg-white/10 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">{food.name}</p>
                      <p className="text-xs text-gray-400">
                        P: {food.protein}g • C: {food.carbs}g • F: {food.fats}g
                      </p>
                    </div>
                    <span className="text-neon font-bold">{food.calories} kcal</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Manual Entry Modal */}
      {showManualEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowManualEntry(false)} />
          <div className="relative glass-modal rounded-3xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-6">Add Meal</h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 uppercase font-bold block mb-2">Food Name</label>
                <input
                  type="text"
                  placeholder="e.g. Grilled Chicken Salad"
                  value={manualMeal.name}
                  onChange={(e) => setManualMeal(prev => ({ ...prev, name: e.target.value }))}
                  className="glass-input w-full rounded-lg p-3 text-white placeholder-gray-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold block mb-2">Calories</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={manualMeal.calories}
                    onChange={(e) => setManualMeal(prev => ({ ...prev, calories: e.target.value }))}
                    className="glass-input w-full rounded-lg p-3 text-white placeholder-gray-500 text-center"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold block mb-2">Protein (g)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={manualMeal.protein}
                    onChange={(e) => setManualMeal(prev => ({ ...prev, protein: e.target.value }))}
                    className="glass-input w-full rounded-lg p-3 text-white placeholder-gray-500 text-center"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold block mb-2">Carbs (g)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={manualMeal.carbs}
                    onChange={(e) => setManualMeal(prev => ({ ...prev, carbs: e.target.value }))}
                    className="glass-input w-full rounded-lg p-3 text-white placeholder-gray-500 text-center"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold block mb-2">Fats (g)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={manualMeal.fats}
                    onChange={(e) => setManualMeal(prev => ({ ...prev, fats: e.target.value }))}
                    className="glass-input w-full rounded-lg p-3 text-white placeholder-gray-500 text-center"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="secondary" className="flex-1" onClick={() => setShowManualEntry(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={addManualMeal}>
                Add Meal
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
