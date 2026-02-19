import { useState } from 'react';
import { DEFAULT_PROFILES, calculateGoalCalories, calculateProteinGoal } from '../data/profiles';

interface LogEntry {
  meal: string;
  description: string;
  calories: number;
  protein: number;
}

export default function DailyTracker() {
  const [activeProfile, setActiveProfile] = useState<'roberta' | 'luiz'>('roberta');
  const [log, setLog] = useState<LogEntry[]>([
    { meal: 'Café da Manhã', description: 'Bowl de frutas com sementes', calories: 280, protein: 9 },
  ]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ meal: 'Café da Manhã', description: '', calories: '', protein: '' });

  const profile = DEFAULT_PROFILES[activeProfile];
  const goalCalories = calculateGoalCalories(profile);
  const goalProtein = calculateProteinGoal(profile);

  const totalCalories = log.reduce((s, e) => s + e.calories, 0);
  const totalProtein = log.reduce((s, e) => s + e.protein, 0);
  const remaining = goalCalories - totalCalories;
  const progress = Math.min((totalCalories / goalCalories) * 100, 100);
  const proteinProgress = Math.min((totalProtein / goalProtein) * 100, 100);

  const addEntry = () => {
    if (!form.description || !form.calories) return;
    setLog([...log, {
      meal: form.meal,
      description: form.description,
      calories: Number(form.calories),
      protein: Number(form.protein) || 0,
    }]);
    setForm({ meal: 'Café da Manhã', description: '', calories: '', protein: '' });
    setAdding(false);
  };

  const mealEmoji: Record<string, string> = {
    'Café da Manhã': '☀️',
    'Almoço': '🌞',
    'Lanche': '🍎',
    'Jantar': '🌙',
    'Pré-treino': '💪',
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        📊 Meu Dia
      </h2>

      {/* Profile selector */}
      <div className="flex gap-2 mb-5">
        {(['roberta', 'luiz'] as const).map(p => (
          <button
            key={p}
            onClick={() => setActiveProfile(p)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              activeProfile === p ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {DEFAULT_PROFILES[p].name}
          </button>
        ))}
      </div>

      {/* Calorie ring */}
      <div className="text-center mb-5">
        <div className="inline-flex flex-col items-center">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3.8" />
              <circle
                cx="18" cy="18" r="15.9" fill="none"
                stroke={progress > 90 ? '#ef4444' : '#22c55e'}
                strokeWidth="3.8"
                strokeDasharray={`${progress} 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-gray-800">{totalCalories}</p>
              <p className="text-xs text-gray-400">de {goalCalories}</p>
            </div>
          </div>
          <p className={`mt-2 text-sm font-medium ${remaining >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {remaining >= 0 ? `${remaining} kcal restantes` : `${Math.abs(remaining)} kcal acima`}
          </p>
        </div>
      </div>

      {/* Protein bar */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>💪 Proteína</span>
          <span>{totalProtein}g / {goalProtein}g</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${proteinProgress}%` }}
          />
        </div>
      </div>

      {/* Log */}
      <div className="space-y-2 mb-4">
        {log.map((entry, i) => (
          <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2">
            <span>{mealEmoji[entry.meal] || '🍽️'}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">{entry.meal}</p>
              <p className="text-sm font-medium text-gray-700 truncate">{entry.description}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-green-600">{entry.calories} kcal</p>
              <p className="text-xs text-gray-400">{entry.protein}g prot.</p>
            </div>
            <button onClick={() => setLog(log.filter((_, j) => j !== i))} className="text-red-300 hover:text-red-500 text-lg">×</button>
          </div>
        ))}
      </div>

      {adding ? (
        <div className="bg-green-50 rounded-xl p-4 space-y-3">
          <select
            value={form.meal}
            onChange={e => setForm({ ...form, meal: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            {Object.keys(mealEmoji).map(m => <option key={m}>{m}</option>)}
          </select>
          <input
            placeholder="O que você comeu?"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
          <div className="flex gap-2">
            <input
              type="number" placeholder="Calorias"
              value={form.calories}
              onChange={e => setForm({ ...form, calories: e.target.value })}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="number" placeholder="Proteína (g)"
              value={form.protein}
              onChange={e => setForm({ ...form, protein: e.target.value })}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={addEntry} className="flex-1 bg-green-500 text-white rounded-lg py-2 text-sm font-medium">Adicionar</button>
            <button onClick={() => setAdding(false)} className="flex-1 bg-gray-200 text-gray-600 rounded-lg py-2 text-sm">Cancelar</button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="w-full border-2 border-dashed border-green-200 text-green-500 rounded-xl py-3 text-sm hover:bg-green-50 transition-colors"
        >
          + Adicionar refeição
        </button>
      )}
    </div>
  );
}
