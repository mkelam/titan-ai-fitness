import React from 'react';
import { Button } from './UI';

interface ModalProps {
  onClose: () => void;
}

// PR Achievement Modal - when user hits a new personal record
interface PRModalProps extends ModalProps {
  exercise: string;
  weight: number;
  previousBest: number;
  xpEarned: number;
}

export const PRModal: React.FC<PRModalProps> = ({ onClose, exercise, weight, previousBest, xpEarned }) => {
  const improvement = weight - previousBest;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div className="relative glass-modal rounded-3xl w-full max-w-sm p-6 text-center overflow-hidden">
        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-pulse"
              style={{
                background: ['#00ff9d', '#ffd700', '#ff6b6b', '#4ecdc4'][i % 4],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          {/* Trophy Icon */}
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-500/30 to-amber-600/30 flex items-center justify-center border-4 border-yellow-500 shadow-[0_0_30px_rgba(250,204,21,0.4)]">
            <span className="material-symbols-rounded text-yellow-400 text-5xl">emoji_events</span>
          </div>

          <h2 className="text-2xl font-black text-yellow-400 mb-1">NEW PR!</h2>
          <p className="text-gray-400 mb-4">Personal Record Achieved</p>

          <div className="glass-light rounded-xl p-4 mb-4">
            <h3 className="font-bold text-lg mb-2">{exercise}</h3>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-400">Previous</p>
                <p className="text-xl font-bold text-gray-500 line-through">{previousBest} kg</p>
              </div>
              <span className="material-symbols-rounded text-neon text-2xl">arrow_forward</span>
              <div className="text-center">
                <p className="text-sm text-gray-400">New PR</p>
                <p className="text-2xl font-black text-neon">{weight} kg</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10">
              <span className="text-green-400 font-bold">+{improvement} kg improvement!</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="material-symbols-rounded text-yellow-400">bolt</span>
            <span className="text-yellow-400 font-bold">+{xpEarned} XP</span>
          </div>

          <Button fullWidth onClick={onClose}>
            AWESOME!
          </Button>
        </div>
      </div>
    </div>
  );
};

// Level Up Modal - when user levels up
interface LevelUpModalProps extends ModalProps {
  newLevel: number;
  unlockedReward?: string;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ onClose, newLevel, unlockedReward }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div className="relative glass-modal rounded-3xl w-full max-w-sm p-6 text-center overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-neon/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10">
          {/* Level Badge */}
          <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon/30 to-green-600/30 flex items-center justify-center border-4 border-neon shadow-[0_0_40px_rgba(0,255,157,0.5)] animate-pulse">
            <div className="text-center">
              <span className="text-4xl font-black text-neon">{newLevel}</span>
              <p className="text-xs text-neon/80 uppercase tracking-wider">Level</p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-neon mb-1">LEVEL UP!</h2>
          <p className="text-gray-400 mb-6">You've reached Level {newLevel}</p>

          {/* Stats increase */}
          <div className="glass-light rounded-xl p-4 mb-4">
            <h4 className="text-sm text-gray-400 uppercase mb-3">Power Increased</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <span className="material-symbols-rounded text-red-400">favorite</span>
                <p className="text-xs text-gray-400">Max HP</p>
                <p className="font-bold text-green-400">+10</p>
              </div>
              <div className="text-center">
                <span className="material-symbols-rounded text-blue-400">bolt</span>
                <p className="text-xs text-gray-400">Energy</p>
                <p className="font-bold text-green-400">+5</p>
              </div>
            </div>
          </div>

          {/* Reward Unlocked */}
          {unlockedReward && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="material-symbols-rounded text-yellow-400">lock_open</span>
                <span className="text-yellow-400 font-bold uppercase text-sm">Reward Unlocked</span>
              </div>
              <p className="text-white font-medium">{unlockedReward}</p>
            </div>
          )}

          <Button fullWidth onClick={onClose}>
            CONTINUE JOURNEY
          </Button>
        </div>
      </div>
    </div>
  );
};

// Goal Reached Modal - when user achieves a weight/fitness goal
interface GoalReachedModalProps extends ModalProps {
  goalType: 'weight' | 'strength' | 'streak';
  goalValue: string;
  daysToAchieve: number;
}

export const GoalReachedModal: React.FC<GoalReachedModalProps> = ({ onClose, goalType, goalValue, daysToAchieve }) => {
  const getGoalIcon = () => {
    switch (goalType) {
      case 'weight': return 'scale';
      case 'strength': return 'fitness_center';
      case 'streak': return 'local_fire_department';
    }
  };

  const getGoalColor = () => {
    switch (goalType) {
      case 'weight': return 'text-cyan-400';
      case 'strength': return 'text-purple-400';
      case 'streak': return 'text-orange-400';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div className="relative glass-modal rounded-3xl w-full max-w-sm p-6 text-center overflow-hidden">
        {/* Success particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-8 bg-gradient-to-t from-transparent via-neon to-transparent animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          {/* Goal Icon */}
          <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-600/30 flex items-center justify-center border-4 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]`}>
            <span className={`material-symbols-rounded text-5xl ${getGoalColor()}`}>{getGoalIcon()}</span>
          </div>

          <h2 className="text-2xl font-black text-green-400 mb-1">GOAL REACHED!</h2>
          <p className="text-gray-400 mb-4">You did it, Champion!</p>

          <div className="glass-light rounded-xl p-4 mb-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="material-symbols-rounded text-green-400">check_circle</span>
              <span className="text-green-400 font-bold">TARGET ACHIEVED</span>
            </div>
            <p className="text-3xl font-black mb-1">{goalValue}</p>
            <p className="text-sm text-gray-400">Completed in {daysToAchieve} days</p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-center">
              <span className="material-symbols-rounded text-yellow-400">bolt</span>
              <p className="text-xs text-gray-400">XP Bonus</p>
              <p className="font-bold text-yellow-400">+100</p>
            </div>
            <div className="text-center">
              <span className="material-symbols-rounded text-purple-400">toll</span>
              <p className="text-xs text-gray-400">Coins</p>
              <p className="font-bold text-purple-400">+50</p>
            </div>
          </div>

          <Button fullWidth onClick={onClose}>
            SET NEW GOAL
          </Button>
        </div>
      </div>
    </div>
  );
};

// Ultimate Unlock Modal - rare achievement or max level reached
interface UltimateUnlockModalProps extends ModalProps {
  title: string;
  description: string;
  rewardName: string;
}

export const UltimateUnlockModal: React.FC<UltimateUnlockModalProps> = ({ onClose, title, description, rewardName }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

      {/* Animated background rays */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-[200%] bg-gradient-to-t from-transparent via-yellow-500/20 to-transparent"
            style={{
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </div>

      <div className="relative glass-modal rounded-3xl w-full max-w-sm p-6 text-center overflow-hidden border-2 border-yellow-500/50">
        {/* Legendary glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 via-transparent to-yellow-500/10 pointer-events-none" />

        <div className="relative z-10">
          {/* Crown/Star Icon */}
          <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-500/40 to-amber-600/40 flex items-center justify-center border-4 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.6)]">
            <span className="material-symbols-rounded text-yellow-400 text-6xl">auto_awesome</span>
          </div>

          <div className="inline-block px-3 py-1 bg-yellow-500/20 rounded-full mb-2">
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Legendary</span>
          </div>

          <h2 className="text-2xl font-black text-yellow-400 mb-1">{title}</h2>
          <p className="text-gray-400 mb-6">{description}</p>

          {/* Reward Card */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/20 border border-yellow-500/40 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="material-symbols-rounded text-yellow-400">workspace_premium</span>
              <span className="text-yellow-400 font-bold uppercase text-sm">Exclusive Reward</span>
            </div>
            <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <span className="material-symbols-rounded text-yellow-400 text-3xl">diamond</span>
            </div>
            <p className="text-white font-bold text-lg">{rewardName}</p>
            <p className="text-xs text-yellow-400/80 mt-1">Added to your collection</p>
          </div>

          <Button fullWidth onClick={onClose} className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400">
            CLAIM REWARD
          </Button>
        </div>
      </div>
    </div>
  );
};
