import React from 'react';

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`glass-panel p-4 rounded-2xl relative overflow-hidden ${className}`}>
    {children}
  </div>
);

export const Button: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'danger'; 
  className?: string;
  fullWidth?: boolean;
}> = ({ children, onClick, variant = 'primary', className = '', fullWidth = false }) => {
  const baseStyle = "py-3 px-6 rounded-xl font-bold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-transparent";
  const variants = {
    primary: "bg-neon text-black shadow-[0_0_15px_rgba(0,255,157,0.4)] hover:shadow-[0_0_25px_rgba(0,255,157,0.6)]",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
    danger: "bg-red-500/80 text-white hover:bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export const NavIcon: React.FC<{ icon: string; label: string; active?: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-neon' : 'text-white/70 hover:text-white'}`}>
    <span className={`material-symbols-rounded text-2xl ${active ? 'fill-1' : ''}`}>{icon}</span>
    <span className="text-[10px] font-medium tracking-wide">{label}</span>
  </button>
);

export const BottomNav: React.FC<{ currentView: string; setView: (v: any) => void }> = ({ currentView, setView }) => {
  // Only show nav on specific authenticated pages
  const showNav = ![
    'LOGIN', 'ONBOARDING_GOALS', 'ONBOARDING_EXP', 'ONBOARDING_COMMIT', 'ONBOARDING_FINAL'
  ].includes(currentView);

  if (!showNav) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
      <div className="glass-panel rounded-full px-6 py-3 flex justify-between items-center shadow-2xl bg-black/80">
        <NavIcon icon="dashboard" label="Dash" active={currentView === 'DASHBOARD'} onClick={() => setView('DASHBOARD')} />
        <NavIcon icon="fitness_center" label="Train" active={currentView === 'TRAINING_LOG'} onClick={() => setView('TRAINING_LOG')} />
        <div className="relative -top-6">
           <button onClick={() => setView('AI_COACH_CHAT')} className="bg-neon text-black rounded-full p-4 shadow-[0_0_20px_rgba(0,255,157,0.5)] active:scale-95 transition-transform border-4 border-black">
             <span className="material-symbols-rounded text-2xl">smart_toy</span>
           </button>
        </div>
        <NavIcon icon="monitoring" label="Stats" active={currentView === 'COMPARISON_ENGINE'} onClick={() => setView('COMPARISON_ENGINE')} />
        <NavIcon icon="person" label="Profile" active={currentView === 'PROFILE'} onClick={() => setView('PROFILE')} />
      </div>
    </div>
  );
};

export const Header: React.FC<{ title: string; leftIcon?: string; onLeftClick?: () => void; rightIcon?: string; onRightClick?: () => void }> = ({ title, leftIcon, onLeftClick, rightIcon, onRightClick }) => (
  <div className="flex items-center justify-between p-4 sticky top-0 z-40 bg-black/40 backdrop-blur-xl border-b border-white/10">
    {leftIcon ? (
      <button onClick={onLeftClick} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
        <span className="material-symbols-rounded">{leftIcon}</span>
      </button>
    ) : <div className="w-10" />}
    <h1 className="text-lg font-bold tracking-wider uppercase text-white/90">{title}</h1>
    {rightIcon ? (
      <button onClick={onRightClick} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
        <span className="material-symbols-rounded">{rightIcon}</span>
      </button>
    ) : <div className="w-10" />}
  </div>
);
