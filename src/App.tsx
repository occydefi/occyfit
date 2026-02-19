import { useState } from 'react';
import Header from './components/Header';
import RecipeGenerator from './components/RecipeGenerator';
import DailyTracker from './components/DailyTracker';
import WeeklyMenu from './components/WeeklyMenu';
import PhotoAnalyzer from './components/PhotoAnalyzer';
import WorkoutPlan from './components/WorkoutPlan';

type Tab = 'dia' | 'foto' | 'treino' | 'receitas' | 'cardapio';

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'dia', label: 'Meu Dia', emoji: '📊' },
  { id: 'foto', label: 'Foto', emoji: '📸' },
  { id: 'treino', label: 'Treino', emoji: '🏋️' },
  { id: 'receitas', label: 'Receitas', emoji: '🍳' },
  { id: 'cardapio', label: 'Cardápio', emoji: '📅' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('dia');

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #e0f7fa 0%, #fff9f0 40%, #ffffff 100%)' }}>
      <Header />

      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-cyan-100 shadow-sm">
        <div className="max-w-4xl mx-auto flex">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3 text-xs font-medium flex flex-col items-center gap-0.5 transition-colors ${
                tab === t.id
                  ? 'text-cyan-600 border-b-2 border-cyan-500'
                  : 'text-gray-400 hover:text-cyan-500'
              }`}
            >
              <span className="text-lg">{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {tab === 'dia' && <DailyTracker />}
        {tab === 'foto' && <PhotoAnalyzer />}
        {tab === 'treino' && <WorkoutPlan />}
        {tab === 'receitas' && <RecipeGenerator />}
        {tab === 'cardapio' && <WeeklyMenu />}
      </main>

      <footer className="text-center py-8 text-gray-300 text-xs">
        feito com ❤️ por Occy 🧌
      </footer>
    </div>
  );
}
