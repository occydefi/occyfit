import { useState } from 'react';
import Header from './components/Header';
import RecipeGenerator from './components/RecipeGenerator';
import DailyTracker from './components/DailyTracker';
import WeeklyMenu from './components/WeeklyMenu';
import WorkoutPlan from './components/WorkoutPlan';
import BodyProgress from './components/BodyProgress';

type Tab = 'dia' | 'evolucao' | 'treino' | 'receitas' | 'cardapio';

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'dia',      label: 'Meu Dia',   emoji: '📊' },
  { id: 'evolucao', label: 'Evolução',  emoji: '📷' },
  { id: 'treino',   label: 'Treino',    emoji: '🏋️' },
  { id: 'receitas', label: 'Receitas',  emoji: '🍳' },
  { id: 'cardapio', label: 'Cardápio',  emoji: '📅' },
];

const TIFFANY = '#00b4b4';

export default function App() {
  const [tab, setTab] = useState<Tab>('dia');

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #e0fafa 0%, #f0fffe 30%, #f8ffff 100%)' }}>
      <Header />

      {/* Tab bar */}
      <div className="sticky top-0 z-10 border-b shadow-sm"
        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderColor: '#b2f5ea' }}>
        <div className="max-w-4xl mx-auto flex">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex-1 py-3 text-xs font-bold flex flex-col items-center gap-0.5 transition-all"
              style={{
                color: tab === t.id ? TIFFANY : '#9ca3af',
                borderBottom: tab === t.id ? `2.5px solid ${TIFFANY}` : '2.5px solid transparent',
                letterSpacing: '0.5px',
              }}
            >
              <span className="text-lg">{t.emoji}</span>
              {t.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {tab === 'dia'      && <DailyTracker />}
        {tab === 'evolucao' && <BodyProgress />}
        {tab === 'treino'   && <WorkoutPlan />}
        {tab === 'receitas' && <RecipeGenerator />}
        {tab === 'cardapio' && <WeeklyMenu />}
      </main>

      <footer className="text-center py-8 text-xs font-bold tracking-widest"
        style={{ color: '#81e6d9' }}>
        🌊 FEITO COM ❤️ POR OCCY 🧌
      </footer>
    </div>
  );
}
