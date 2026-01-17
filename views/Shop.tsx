import React, { useState } from 'react';
import { View } from '../types';
import { Header, GlassCard, Button } from '../components/UI';
import { useApp } from '../contexts/AppContext';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: 'boost' | 'cosmetic' | 'utility';
  color: string;
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'streak_freeze',
    name: 'Streak Freeze',
    description: 'Protect your streak for 1 rest day',
    price: 50,
    icon: 'ac_unit',
    category: 'utility',
    color: 'text-blue-400'
  },
  {
    id: 'xp_boost_small',
    name: 'XP Boost (1 Day)',
    description: '+25% XP on all activities for 24 hours',
    price: 100,
    icon: 'bolt',
    category: 'boost',
    color: 'text-yellow-400'
  },
  {
    id: 'xp_boost_large',
    name: 'XP Boost (7 Days)',
    description: '+25% XP on all activities for 1 week',
    price: 500,
    icon: 'electric_bolt',
    category: 'boost',
    color: 'text-yellow-500'
  },
  {
    id: 'workout_shuffle',
    name: 'Workout Shuffle',
    description: 'Re-roll your daily quest for a new one',
    price: 25,
    icon: 'shuffle',
    category: 'utility',
    color: 'text-purple-400'
  },
  {
    id: 'avatar_frame_gold',
    name: 'Gold Avatar Frame',
    description: 'Show off your dedication with a gold border',
    price: 300,
    icon: 'award_star',
    category: 'cosmetic',
    color: 'text-amber-400'
  },
  {
    id: 'avatar_frame_neon',
    name: 'Neon Avatar Frame',
    description: 'Animated neon glow around your avatar',
    price: 500,
    icon: 'flare',
    category: 'cosmetic',
    color: 'text-neon'
  },
  {
    id: 'title_iron_titan',
    name: 'Title: Iron Titan',
    description: 'Display a special title on your profile',
    price: 200,
    icon: 'military_tech',
    category: 'cosmetic',
    color: 'text-white/80'
  },
  {
    id: 'double_coin_day',
    name: 'Double Coin Day',
    description: 'Earn 2x coins from workouts for 24 hours',
    price: 150,
    icon: 'toll',
    category: 'boost',
    color: 'text-amber-500'
  }
];

export const XPShopView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { stats, setStats } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'boost' | 'cosmetic' | 'utility'>('all');
  const [purchaseConfirm, setPurchaseConfirm] = useState<ShopItem | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState<string | null>(null);

  const filteredItems = selectedCategory === 'all'
    ? SHOP_ITEMS
    : SHOP_ITEMS.filter(item => item.category === selectedCategory);

  const handlePurchase = (item: ShopItem) => {
    if (stats.currency < item.price) return;

    setStats(prev => ({
      ...prev,
      currency: prev.currency - item.price
    }));

    setPurchaseConfirm(null);
    setPurchaseSuccess(item.name);
    setTimeout(() => setPurchaseSuccess(null), 3000);
  };

  const categories = [
    { id: 'all' as const, label: 'All' },
    { id: 'boost' as const, label: 'Boosts' },
    { id: 'utility' as const, label: 'Utility' },
    { id: 'cosmetic' as const, label: 'Cosmetic' },
  ];

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-black/30 z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Header title="XP Shop" leftIcon="arrow_back" onLeftClick={() => setView(View.DASHBOARD)} />

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Currency Display */}
          <div className="p-4">
            <GlassCard className="bg-gradient-to-r from-amber-900/30 to-yellow-900/20 border border-amber-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="material-symbols-rounded text-amber-400 text-2xl">toll</span>
                  </div>
                  <div>
                    <p className="text-xs text-white/70">Your Balance</p>
                    <p className="text-2xl font-bold text-amber-400">{stats.currency}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/70">Titan Coins</p>
                  <p className="text-xs text-amber-400">Earn from workouts!</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Category Filter */}
          <div className="px-4 mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-neon text-black'
                      : 'glass-light text-white/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Shop Items */}
          <div className="px-4 grid grid-cols-2 gap-3">
            {filteredItems.map(item => {
              const canAfford = stats.currency >= item.price;
              return (
                <GlassCard
                  key={item.id}
                  className={`cursor-pointer transition-all ${!canAfford ? 'opacity-50' : 'hover:border-neon/50'}`}
                  onClick={() => canAfford && setPurchaseConfirm(item)}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 mx-auto rounded-full glass-light flex items-center justify-center mb-3`}>
                      <span className={`material-symbols-rounded text-2xl ${item.color}`}>{item.icon}</span>
                    </div>
                    <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                    <p className="text-[10px] text-white/70 mb-3 h-8">{item.description}</p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="material-symbols-rounded text-amber-400 text-sm">toll</span>
                      <span className={`font-bold ${canAfford ? 'text-amber-400' : 'text-white/50'}`}>{item.price}</span>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* How to earn coins */}
          <div className="px-4 mt-6">
            <GlassCard>
              <h3 className="text-sm text-white/70 uppercase font-bold mb-3">How to Earn Coins</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/80">Complete a workout</span>
                  <span className="text-amber-400">+10 coins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Log nutrition</span>
                  <span className="text-amber-400">+5 coins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Weekly check-in</span>
                  <span className="text-amber-400">+25 coins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">7-day streak bonus</span>
                  <span className="text-amber-400">+50 coins</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Purchase Confirmation Modal */}
      {purchaseConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setPurchaseConfirm(null)} />
          <div className="relative glass-modal rounded-3xl w-full max-w-sm p-6 text-center">
            <div className={`w-16 h-16 mx-auto rounded-full glass-light flex items-center justify-center mb-4`}>
              <span className={`material-symbols-rounded text-3xl ${purchaseConfirm.color}`}>{purchaseConfirm.icon}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{purchaseConfirm.name}</h3>
            <p className="text-white/70 text-sm mb-4">{purchaseConfirm.description}</p>

            <div className="glass-light rounded-xl p-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Cost</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-rounded text-amber-400">toll</span>
                  <span className="text-amber-400 font-bold">{purchaseConfirm.price}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-white/70">After purchase</span>
                <span className="font-bold">{stats.currency - purchaseConfirm.price} coins</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setPurchaseConfirm(null)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => handlePurchase(purchaseConfirm)}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Success Toast */}
      {purchaseSuccess && (
        <div className="fixed bottom-24 left-4 right-4 glass-panel rounded-xl p-4 flex items-center gap-3 z-50 border border-neon/30">
          <span className="material-symbols-rounded text-neon">check_circle</span>
          <span>Purchased {purchaseSuccess}!</span>
        </div>
      )}
    </div>
  );
};
