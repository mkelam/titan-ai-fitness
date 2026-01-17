import React, { useState, useRef } from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';
import { useApp, WeightEntry } from '../contexts/AppContext';

export const ProgressCheckinView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { weightHistory, addWeightEntry, addXP } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const latestWeight = weightHistory[0];
  const previousWeight = weightHistory[1];
  const weightChange = latestWeight && previousWeight
    ? latestWeight.weight - previousWeight.weight
    : null;

  // Photo upload handler
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhotos(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove photo
  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    if (activePhotoIndex >= photos.length - 1) {
      setActivePhotoIndex(Math.max(0, photos.length - 2));
    }
  };

  // Save check-in
  const saveCheckin = () => {
    if (!weight) return;

    const entry: WeightEntry = {
      date: new Date().toISOString().split('T')[0],
      weight: Number(weight),
      bodyFat: bodyFat ? Number(bodyFat) : undefined,
      photos: photos.length > 0 ? photos : undefined,
    };

    addWeightEntry(entry);

    // Award XP based on what was logged
    let xpAmount = 10; // Base XP for weight
    if (photos.length > 0) xpAmount += 15; // Bonus for photos
    if (bodyFat) xpAmount += 5; // Bonus for body fat

    addXP(xpAmount, 'Progress Check-in');
    setView(View.DASHBOARD);
  };

  // Get last 7 weights for mini chart
  const last7Weights = weightHistory.slice(0, 7).reverse();
  const maxWeight = Math.max(...last7Weights.map(w => w.weight), Number(weight) || 0);
  const minWeight = Math.min(...last7Weights.map(w => w.weight), Number(weight) || 100);
  const range = maxWeight - minWeight || 1;

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header title="Progress Check-in" leftIcon="arrow_back" onLeftClick={() => setView(View.DASHBOARD)} />

        <div className="flex-1 overflow-y-auto p-4 pb-24">
          {/* Weight Entry */}
          <GlassCard className="mb-4">
            <h3 className="text-sm text-white/70 uppercase font-bold mb-4">Today's Weight</h3>
            <div className="flex items-center gap-4">
              <input
                type="number"
                placeholder={latestWeight?.weight.toString() || "0"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="glass-input flex-1 rounded-xl p-4 text-3xl text-center text-white font-bold"
              />
              <div className="text-center">
                <span className="text-2xl font-bold text-white/70">kg</span>
                {weightChange !== null && (
                  <p className={`text-xs mt-1 ${weightChange > 0 ? 'text-red-400' : weightChange < 0 ? 'text-green-400' : 'text-white/70'}`}>
                    {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} from last
                  </p>
                )}
              </div>
            </div>

            {/* Mini weight chart */}
            {last7Weights.length > 1 && (
              <div className="mt-6">
                <p className="text-xs text-white/50 mb-2">Last 7 entries</p>
                <div className="flex items-end gap-1 h-16">
                  {last7Weights.map((w, i) => {
                    const height = ((w.weight - minWeight) / range) * 100;
                    return (
                      <div
                        key={i}
                        className="flex-1 bg-neon/30 rounded-t transition-all"
                        style={{ height: `${Math.max(height, 10)}%` }}
                      />
                    );
                  })}
                  {weight && (
                    <div
                      className="flex-1 bg-neon rounded-t transition-all"
                      style={{ height: `${Math.max(((Number(weight) - minWeight) / range) * 100, 10)}%` }}
                    />
                  )}
                </div>
              </div>
            )}
          </GlassCard>

          {/* Body Fat (Optional) */}
          <GlassCard className="mb-4">
            <h3 className="text-sm text-white/70 uppercase font-bold mb-4">Body Fat % (Optional)</h3>
            <div className="flex items-center gap-4">
              <input
                type="number"
                placeholder="0"
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
                className="glass-input flex-1 rounded-xl p-4 text-2xl text-center text-white font-bold"
              />
              <span className="text-xl font-bold text-white/70">%</span>
            </div>
          </GlassCard>

          {/* Photo Upload */}
          <GlassCard className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm text-white/70 uppercase font-bold">Progress Photos</h3>
              <span className="text-xs text-neon">+15 XP bonus</span>
            </div>

            {photos.length === 0 ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-48 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center hover:border-neon/50 transition-all"
              >
                <span className="material-symbols-rounded text-4xl text-white/50 mb-2">add_a_photo</span>
                <p className="text-white/70">Tap to add photos</p>
                <p className="text-xs text-white/50">Front, side, and back views recommended</p>
              </button>
            ) : (
              <div>
                {/* Main photo display */}
                <div className="relative w-full h-64 rounded-xl overflow-hidden mb-3">
                  <img
                    src={photos[activePhotoIndex]}
                    alt={`Progress ${activePhotoIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removePhoto(activePhotoIndex)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-red-400 hover:bg-red-500/50 transition-all"
                  >
                    <span className="material-symbols-rounded text-sm">delete</span>
                  </button>
                </div>

                {/* Thumbnail strip */}
                <div className="flex gap-2">
                  {photos.map((photo, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhotoIndex(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        i === activePhotoIndex ? 'border-neon' : 'border-transparent'
                      }`}
                    >
                      <img src={photo} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                  {photos.length < 3 && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-16 h-16 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center hover:border-neon/50 transition-all"
                    >
                      <span className="material-symbols-rounded text-white/50">add</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </GlassCard>

          {/* Weight Projection Link */}
          <GlassCard className="mb-4 cursor-pointer" onClick={() => setView(View.WEIGHT_PROJECTION)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <span className="material-symbols-rounded text-cyan-400">trending_down</span>
                </div>
                <div>
                  <p className="font-bold">Weight Projection</p>
                  <p className="text-xs text-white/70">Set goals & track your timeline</p>
                </div>
              </div>
              <span className="material-symbols-rounded text-white/50">chevron_right</span>
            </div>
          </GlassCard>

          {/* Photo Comparison */}
          {weightHistory.length > 0 && weightHistory[0].photos && (
            <GlassCard>
              <h3 className="text-sm text-white/70 uppercase font-bold mb-4">Compare Progress</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="w-full h-32 rounded-lg overflow-hidden bg-white/5 mb-2">
                    {weightHistory[0].photos?.[0] ? (
                      <img src={weightHistory[0].photos[0]} alt="Previous" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/40">
                        <span className="material-symbols-rounded text-3xl">person</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-white/70">Previous</p>
                  <p className="text-sm font-bold">{weightHistory[0].weight}kg</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-32 rounded-lg overflow-hidden bg-white/5 mb-2">
                    {photos[0] ? (
                      <img src={photos[0]} alt="Current" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/40">
                        <span className="material-symbols-rounded text-3xl">person</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-white/70">Today</p>
                  <p className="text-sm font-bold text-neon">{weight || '—'}kg</p>
                </div>
              </div>
            </GlassCard>
          )}
        </div>

        {/* Save Button */}
        <div className="glass-panel border-t border-white/10 p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/70">XP Reward</span>
            <span className="text-neon font-bold">
              +{10 + (photos.length > 0 ? 15 : 0) + (bodyFat ? 5 : 0)} XP
            </span>
          </div>
          <Button fullWidth onClick={saveCheckin} variant={weight ? 'primary' : 'secondary'}>
            SAVE CHECK-IN
          </Button>
        </div>
      </div>
    </div>
  );
};
