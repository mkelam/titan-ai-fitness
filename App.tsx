import React, { useState } from 'react';
import { View } from './types';
import { LoginView, GoalsView, ExperienceView, CommitmentView, FinalizeView } from './views/Onboarding';
import { DashboardView } from './views/Dashboard';
import { TrainingLogView, FormCheckView } from './views/Training';
import { NutritionLogView } from './views/Nutrition';
import { ProgressCheckinView } from './views/Progress';
import { SkillTreeView, TeamHubView } from './views/Gamification';
import { ProfileView } from './views/Profile';
import { SettingsView } from './views/Settings';
import { XPShopView } from './views/Shop';
import { AICoachChatView, CoachSelectionView } from './views/Coach';
import { StreakCalendarView } from './views/StreakCalendar';
import { ComparisonEngineView } from './views/ComparisonEngine';
import { QuestLogView, QuestHistoryView } from './views/QuestLog';
import { BadgeGalleryView } from './views/BadgeGallery';
import { LeaderboardView } from './views/Leaderboard';
import { ExerciseLibraryView } from './views/ExerciseLibrary';
import { MonthlyReviewView } from './views/MonthlyReview';
import { WeightProjectionView } from './views/WeightProjection';
import { RecoveryPlanView } from './views/RecoveryPlan';
import { GymCheckinView } from './views/GymCheckin';
import { BottomNav } from './components/UI';

const App: React.FC = () => {
  const [currentView, setView] = useState<View>(View.LOGIN);

  const renderView = () => {
    switch (currentView) {
      case View.LOGIN: return <LoginView setView={setView} />;
      case View.ONBOARDING_GOALS: return <GoalsView setView={setView} />;
      case View.ONBOARDING_EXP: return <ExperienceView setView={setView} />;
      case View.ONBOARDING_COMMIT: return <CommitmentView setView={setView} />;
      case View.ONBOARDING_FINAL: return <FinalizeView setView={setView} />;

      case View.DASHBOARD: return <DashboardView setView={setView} />;
      
      case View.TRAINING_LOG: return <TrainingLogView setView={setView} />;
      case View.AI_FORM_CHECK: return <FormCheckView setView={setView} />;
      case View.NUTRITION_LOG: return <NutritionLogView setView={setView} />;
      case View.PROGRESS_CHECKIN: return <ProgressCheckinView setView={setView} />;

      case View.SKILL_TREE: return <SkillTreeView setView={setView} />;
      case View.TEAM_HUB: return <TeamHubView setView={setView} />;
      case View.XP_SHOP: return <XPShopView setView={setView} />;

      case View.PROFILE: return <ProfileView setView={setView} />;
      case View.SETTINGS: return <SettingsView setView={setView} />;

      case View.AI_COACH_CHAT: return <AICoachChatView setView={setView} />;
      case View.COACH_SELECTION: return <CoachSelectionView setView={setView} />;

      case View.STREAK_CALENDAR: return <StreakCalendarView setView={setView} />;
      case View.COMPARISON_ENGINE: return <ComparisonEngineView setView={setView} />;
      case View.QUEST_LOG: return <QuestLogView setView={setView} />;
      case View.QUEST_HISTORY: return <QuestHistoryView setView={setView} />;
      case View.BADGE_GALLERY: return <BadgeGalleryView setView={setView} />;
      case View.LEADERBOARD: return <LeaderboardView setView={setView} />;
      case View.EXERCISE_LIBRARY: return <ExerciseLibraryView setView={setView} />;
      case View.MONTHLY_REVIEW: return <MonthlyReviewView setView={setView} />;
      case View.WEIGHT_PROJECTION: return <WeightProjectionView setView={setView} />;
      case View.RECOVERY_PLAN: return <RecoveryPlanView setView={setView} />;
      case View.GYM_CHECKIN: return <GymCheckinView setView={setView} />;

      // Mocks for other views to prevent crashes in MVP
      default: return (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          <span className="material-symbols-rounded text-6xl text-gray-600 mb-4">construction</span>
          <h2 className="text-xl font-bold mb-2">Work in Progress</h2>
          <p className="text-gray-400 mb-6">The {currentView} module is being forged in the Titan fires.</p>
          <button onClick={() => setView(View.DASHBOARD)} className="text-neon underline">Return to Dashboard</button>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-screen bg-transparent text-white font-sans overflow-hidden flex flex-col">
      <main className="flex-1 relative overflow-hidden">
        {renderView()}
      </main>
      <BottomNav currentView={currentView} setView={setView} />
    </div>
  );
};

export default App;
