import React, { useState } from 'react';
import { GlassCard, Button } from './UI';
import { useApp } from '../contexts/AppContext';

// ============================================
// DASHBOARD WIDGET COMPONENT
// ============================================

interface DashboardWidgetProps {
  icon: string;
  label: string;
  value?: string | number;
  unit?: string;
  meta?: string;
  progress?: number;
  max?: number;
  status?: string;
  cta?: string;
  badge?: string;
  onClick?: () => void;
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  icon,
  label,
  value,
  unit,
  meta,
  progress,
  max,
  status,
  cta,
  badge,
  onClick
}) => {
  const hasProgress = progress !== undefined && max !== undefined;
  const progressPercent = hasProgress ? (progress! / max!) * 100 : 0;

  return (
    <GlassCard
      className="flex flex-col gap-2 py-6 active:bg-white/5 cursor-pointer relative"
      onClick={onClick}
    >
      {badge && (
        <div className="absolute top-2 right-2">
          <div className="w-2 h-2 bg-neon rounded-full animate-pulse" />
        </div>
      )}

      <span className={`material-symbols-rounded text-3xl ${value ? 'text-white' : 'text-gray-600'}`}>
        {icon}
      </span>

      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</span>

        {value !== undefined && (
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{value}</span>
            {unit && <span className="text-sm text-gray-400">{unit}</span>}
          </div>
        )}

        {status && (
          <span className="text-sm font-medium text-white">{status}</span>
        )}

        {meta && (
          <span className="text-xs text-gray-400">{meta}</span>
        )}

        {cta && (
          <span className="text-xs text-neon font-medium mt-1">{cta}</span>
        )}

        {hasProgress && (
          <div className="mt-2">
            <div className="w-full bg-black/50 h-1 rounded-full overflow-hidden">
              <div
                className="bg-neon h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

// ============================================
// WEIGHT ENTRY MODAL
// ============================================

export const WeightEntryModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { weightHistory, addWeightEntry, addXP } = useApp();
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');

  const handleSubmit = () => {
    if (!weight) return;

    const today = new Date().toISOString().split('T')[0];
    addWeightEntry({
      date: today,
      weight: parseFloat(weight),
      bodyFat: bodyFat ? parseFloat(bodyFat) : undefined
    });

    addXP(10, 'Daily weight check-in');
    onClose();
  };

  const latestWeight = weightHistory[0]?.weight;

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-6">
      <GlassCard className="glass-modal w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Log Weight</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        {latestWeight && (
          <div className="mb-4 p-3 bg-white/5 rounded-lg">
            <span className="text-sm text-gray-400">Previous: </span>
            <span className="text-lg font-bold">{latestWeight} lbs</span>
          </div>
        )}

        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="text-sm text-gray-400 uppercase font-bold block mb-2">Weight (lbs)</label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="glass-input w-full rounded-lg p-3 text-white text-xl font-bold"
              placeholder="185.0"
              autoFocus
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 uppercase font-bold block mb-2">Body Fat % (Optional)</label>
            <input
              type="number"
              step="0.1"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              className="glass-input w-full rounded-lg p-3 text-white"
              placeholder="15.0"
            />
          </div>
        </div>

        <Button fullWidth onClick={handleSubmit} variant="primary">
          Save Weight
        </Button>
      </GlassCard>
    </div>
  );
};

// ============================================
// PHOTO UPLOAD MODAL
// ============================================

export const PhotoUploadModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { weightHistory, addWeightEntry, addXP } = useApp();
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!photo) return;

    const today = new Date().toISOString().split('T')[0];
    const todayEntry = weightHistory.find(e => e.date === today);

    if (todayEntry) {
      // Update existing entry
      addWeightEntry({
        ...todayEntry,
        photos: [...(todayEntry.photos || []), photo]
      });
    } else {
      // Create new entry with photo only
      addWeightEntry({
        date: today,
        weight: weightHistory[0]?.weight || 0,
        photos: [photo]
      });
    }

    addXP(20, 'Weekly progress photo');
    onClose();
  };

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-6">
      <GlassCard className="glass-modal w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Progress Photo</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        {!photo ? (
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5">
              <span className="material-symbols-rounded text-6xl text-gray-600 mb-4">photo_camera</span>
              <span className="text-sm text-gray-400">Tap to capture photo</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoCapture}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="mb-6">
            <img src={photo} alt="Progress" className="w-full h-64 object-cover rounded-xl" />
            <button
              onClick={() => setPhoto(null)}
              className="mt-4 text-sm text-gray-400 hover:text-white"
            >
              Retake Photo
            </button>
          </div>
        )}

        <Button fullWidth onClick={handleSubmit} variant="primary" className={!photo ? 'opacity-50' : ''}>
          Save Photo
        </Button>

        <div className="mt-4 p-3 bg-white/5 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="material-symbols-rounded text-yellow-400 text-sm">lock</span>
            <p className="text-xs text-gray-400">
              Photos are stored locally on your device and encrypted. They will never be shared without your permission.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

// ============================================
// QUICK CALORIE LOG MODAL
// ============================================

export const QuickCalorieModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { getTodayNutrition, addNutritionLog, addXP } = useApp();
  const todayLog = getTodayNutrition();

  const [calories, setCalories] = useState(todayLog?.calories.toString() || '');
  const [protein, setProtein] = useState(todayLog?.protein.toString() || '');

  const targetCalories = 2500;
  const targetProtein = 180;

  const handleSubmit = () => {
    if (!calories) return;

    const today = new Date().toISOString().split('T')[0];
    addNutritionLog({
      date: today,
      calories: parseInt(calories),
      protein: parseInt(protein) || 0,
      carbs: 0,
      fats: 0,
      meals: todayLog?.meals || []
    });

    addXP(10, 'Nutrition tracking');
    onClose();
  };

  const calorieProgress = calories ? (parseInt(calories) / targetCalories) * 100 : 0;
  const proteinProgress = protein ? (parseInt(protein) / targetProtein) * 100 : 0;

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-6">
      <GlassCard className="glass-modal w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Quick Log</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-6 mb-6">
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="text-sm text-gray-400 uppercase font-bold">Calories</label>
              <span className="text-xs text-gray-500">{targetCalories} target</span>
            </div>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="glass-input w-full rounded-lg p-3 text-white text-xl font-bold"
              placeholder="1200"
              autoFocus
            />
            <div className="w-full bg-black/50 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-neon h-full transition-all duration-500"
                style={{ width: `${Math.min(calorieProgress, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="text-sm text-gray-400 uppercase font-bold">Protein (g)</label>
              <span className="text-xs text-gray-500">{targetProtein}g target</span>
            </div>
            <input
              type="number"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              className="glass-input w-full rounded-lg p-3 text-white text-xl font-bold"
              placeholder="120"
            />
            <div className="w-full bg-black/50 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-blue-400 h-full transition-all duration-500"
                style={{ width: `${Math.min(proteinProgress, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <Button fullWidth onClick={handleSubmit} variant="primary">
          Save Nutrition
        </Button>
      </GlassCard>
    </div>
  );
};
