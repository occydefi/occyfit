import { useState, useRef } from 'react';
import { DEFAULT_PROFILES, calculateGoalCalories, calculateProteinGoal } from '../data/profiles';

interface LogEntry {
  meal: string;
  description: string;
  calories: number;
  protein: number;
  image?: string;
}

type AddMode = 'choose' | 'manual' | 'photo';

export default function DailyTracker() {
  const [activeProfile, setActiveProfile] = useState<'roberta' | 'luiz'>('roberta');
  const [log, setLog] = useState<LogEntry[]>([
    { meal: 'Café da Manhã', description: 'Bowl de frutas com sementes', calories: 280, protein: 9 },
  ]);
  const [addMode, setAddMode] = useState<AddMode | null>(null);
  const [form, setForm] = useState({ meal: 'Café da Manhã', description: '', calories: '', protein: '' });

  // Photo analysis state
  const [photoImage, setPhotoImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [photoResult, setPhotoResult] = useState<any>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const profile = DEFAULT_PROFILES[activeProfile];
  const goalCalories = calculateGoalCalories(profile);
  const goalProtein = calculateProteinGoal(profile);
  const profileColor = activeProfile === 'roberta' ? '#ec4899' : '#3b82f6';

  const totalCalories = log.reduce((s, e) => s + e.calories, 0);
  const totalProtein = log.reduce((s, e) => s + e.protein, 0);
  const remaining = goalCalories - totalCalories;
  const progress = Math.min((totalCalories / goalCalories) * 100, 100);
  const proteinProgress = Math.min((totalProtein / goalProtein) * 100, 100);

  const mealEmoji: Record<string, string> = {
    'Café da Manhã': '☀️', 'Lanche Manhã': '🍎',
    'Almoço': '🌞', 'Lanche Tarde': '🍊', 'Jantar': '🌙', 'Ceia': '🌛',
  };

  const addManual = () => {
    if (!form.description || !form.calories) return;
    setLog([...log, {
      meal: form.meal, description: form.description,
      calories: Number(form.calories), protein: Number(form.protein) || 0,
    }]);
    setForm({ meal: 'Café da Manhã', description: '', calories: '', protein: '' });
    setAddMode(null);
  };

  const analyzePhoto = async (base64: string) => {
    setAnalyzing(true);
    setPhotoResult(null);
    try {
      // Gemini Vision API — analisa a foto de verdade!
      const GEMINI_KEY = 'AIzaSyBRHydayP0lYTVHveEbQ5LXqhBq266bRfQ';
      const imageData = base64.split(',')[1]; // remove data:image/...;base64,
      const mimeType = base64.split(';')[0].split(':')[1] || 'image/jpeg';

      const prompt = `Você é um nutricionista especialista. Analise esta foto de refeição e identifique todos os alimentos visíveis.
Responda APENAS em JSON válido, sem markdown, com este formato exato:
{
  "description": "Descrição geral da refeição em português",
  "foods": [
    {"name": "Nome do alimento (quantidade estimada)", "calories": 123, "protein": 10}
  ],
  "totalCalories": 456,
  "totalProtein": 25,
  "tip": "Dica nutricional em português (máx 60 caracteres)"
}
Seja específico com os alimentos brasileiros. Use estimativas realistas para porções domésticas.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [
              { text: prompt },
              { inlineData: { mimeType, data: imageData } }
            ]}],
            generationConfig: { temperature: 0.1, maxOutputTokens: 500 }
          })
        }
      );
      const data = await res.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      // Parse JSON from response
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setPhotoResult(JSON.parse(jsonMatch[0]));
      } else {
        throw new Error('Formato inválido');
      }
    } catch {
      // Fallback se API falhar
      setPhotoResult({
        description: 'Refeição analisada',
        foods: [{ name: 'Verifique manualmente', calories: 300, protein: 15 }],
        totalCalories: 300,
        totalProtein: 15,
        tip: 'Adicione manualmente para maior precisão',
      });
    }
    setAnalyzing(false);
  };

  const handlePhotoFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const base64 = e.target?.result as string;
      setPhotoImage(base64);
      analyzePhoto(base64);
    };
    reader.readAsDataURL(file);
  };

  const addFromPhoto = () => {
    if (!photoResult) return;
    setLog([...log, {
      meal: form.meal,
      description: photoResult.description,
      calories: photoResult.totalCalories,
      protein: photoResult.totalProtein,
      image: photoImage || undefined,
    }]);
    setPhotoImage(null);
    setPhotoResult(null);
    setAddMode(null);
  };

  const reset = () => {
    setAddMode(null);
    setPhotoImage(null);
    setPhotoResult(null);
    setAnalyzing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        📊 Meu Dia
      </h2>

      {/* Profile selector */}
      <div className="flex gap-2 mb-5">
        <button onClick={() => setActiveProfile('roberta')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activeProfile === 'roberta'
              ? 'text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-500'
          }`}
          style={activeProfile === 'roberta' ? { background: 'linear-gradient(135deg, #f472b6, #ec4899)' } : {}}>
          🌸 Roberta
        </button>
        <button onClick={() => setActiveProfile('luiz')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${
            activeProfile === 'luiz'
              ? 'text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-500'
          }`}
          style={activeProfile === 'luiz' ? { background: 'linear-gradient(135deg, #60a5fa, #3b82f6)' } : {}}>
          🌊 Luiz
        </button>
      </div>

      {/* Calorie ring */}
      <div className="text-center mb-5">
        <div className="inline-flex flex-col items-center">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3.8" />
              <circle cx="18" cy="18" r="15.9" fill="none"
                stroke={progress > 90 ? '#ef4444' : profileColor}
                strokeWidth="3.8"
                strokeDasharray={`${progress} 100`}
                strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-gray-800">{totalCalories}</p>
              <p className="text-xs text-gray-400">de {goalCalories}</p>
            </div>
          </div>
          <p className={`mt-2 text-sm font-medium ${remaining < 0 ? 'text-red-500' : ''}`}
            style={remaining >= 0 ? { color: profileColor } : {}}>
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
          <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${proteinProgress}%` }} />
        </div>
      </div>

      {/* Log */}
      <div className="space-y-2 mb-4">
        {log.map((entry, i) => (
          <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2">
            {entry.image
              ? <img src={entry.image} className="w-10 h-10 rounded-lg object-cover shrink-0" alt="" />
              : <span className="text-xl">{mealEmoji[entry.meal] || '🍽️'}</span>
            }
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">{entry.meal}</p>
              <p className="text-sm font-medium text-gray-700 break-words">{entry.description}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-cyan-600">{entry.calories} kcal</p>
              <p className="text-xs text-gray-400">{entry.protein}g prot.</p>
            </div>
            <button onClick={() => setLog(log.filter((_, j) => j !== i))} className="text-red-300 hover:text-red-500 text-lg">×</button>
          </div>
        ))}
      </div>

      {/* Add section */}
      {addMode === null && (
        <button onClick={() => setAddMode('choose')}
          className="w-full border-2 border-dashed border-cyan-200 text-cyan-500 rounded-xl py-3 text-sm hover:bg-cyan-50 transition-colors">
          + Adicionar refeição
        </button>
      )}

      {/* Choose mode */}
      {addMode === 'choose' && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-600 text-center">Como quer registrar?</p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setAddMode('photo')}
              className="bg-gradient-to-b from-cyan-400 to-blue-500 text-white rounded-xl py-5 flex flex-col items-center gap-2 shadow-md hover:shadow-lg transition-all">
              <span className="text-3xl">📸</span>
              <span className="text-sm font-semibold">Tirar Foto</span>
              <span className="text-xs text-blue-100">IA analisa as calorias</span>
            </button>
            <button onClick={() => setAddMode('manual')}
              className="bg-gray-100 text-gray-700 rounded-xl py-5 flex flex-col items-center gap-2 hover:bg-gray-200 transition-all">
              <span className="text-3xl">✏️</span>
              <span className="text-sm font-semibold">Digitar</span>
              <span className="text-xs text-gray-400">Inserir manualmente</span>
            </button>
          </div>
          <button onClick={reset} className="w-full text-gray-400 text-sm py-2">Cancelar</button>
        </div>
      )}

      {/* Photo mode */}
      {addMode === 'photo' && (
        <div className="space-y-3">
          <select value={form.meal} onChange={e => setForm({ ...form, meal: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm">
            {Object.keys(mealEmoji).map(m => <option key={m}>{m}</option>)}
          </select>

          {!photoImage && (
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => cameraRef.current?.click()}
                className="bg-cyan-500 text-white rounded-xl py-4 flex flex-col items-center gap-1">
                <span className="text-2xl">📷</span>
                <span className="text-xs font-medium">Câmera</span>
              </button>
              <button onClick={() => fileRef.current?.click()}
                className="bg-gray-100 text-gray-600 rounded-xl py-4 flex flex-col items-center gap-1">
                <span className="text-2xl">🖼️</span>
                <span className="text-xs font-medium">Galeria</span>
              </button>
            </div>
          )}

          <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden"
            onChange={e => e.target.files?.[0] && handlePhotoFile(e.target.files[0])} />
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={e => e.target.files?.[0] && handlePhotoFile(e.target.files[0])} />

          {photoImage && (
            <img src={photoImage} className="w-full rounded-xl max-h-48 object-cover" alt="foto" />
          )}

          {analyzing && (
            <div className="text-center py-4">
              <div className="text-3xl mb-2 animate-bounce">🧌</div>
              <p className="text-sm text-gray-500">Analisando calorias...</p>
            </div>
          )}

          {photoResult && !analyzing && (
            <div className="bg-cyan-50 rounded-xl p-4 space-y-2">
              <p className="text-center font-bold text-2xl text-cyan-600">{photoResult.totalCalories} kcal</p>
              <p className="text-center text-sm text-gray-500">💪 {photoResult.totalProtein}g proteína</p>
              <div className="space-y-1">
                {photoResult.foods.map((f: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">{f.name}</span>
                    <span className="text-cyan-600 font-medium">{f.calories} kcal</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-green-600 bg-green-50 rounded-lg p-2">{photoResult.tip}</p>
              <div className="flex gap-2 pt-1">
                <button onClick={addFromPhoto}
                  className="flex-1 bg-cyan-500 text-white rounded-xl py-2.5 text-sm font-medium">
                  ✅ Adicionar ao dia
                </button>
                <button onClick={() => { setPhotoImage(null); setPhotoResult(null); }}
                  className="px-4 bg-gray-100 text-gray-500 rounded-xl text-sm">
                  🔄
                </button>
              </div>
            </div>
          )}

          <button onClick={reset} className="w-full text-gray-400 text-sm py-1">Cancelar</button>
        </div>
      )}

      {/* Manual mode */}
      {addMode === 'manual' && (
        <div className="bg-cyan-50 rounded-xl p-4 space-y-3">
          <select value={form.meal} onChange={e => setForm({ ...form, meal: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
            {Object.keys(mealEmoji).map(m => <option key={m}>{m}</option>)}
          </select>
          <input placeholder="O que você comeu?" value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          <div className="flex gap-2">
            <input type="number" placeholder="Calorias" value={form.calories}
              onChange={e => setForm({ ...form, calories: e.target.value })}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            <input type="number" placeholder="Proteína (g)" value={form.protein}
              onChange={e => setForm({ ...form, protein: e.target.value })}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="flex gap-2">
            <button onClick={addManual} className="flex-1 bg-cyan-500 text-white rounded-lg py-2.5 text-sm font-medium">Adicionar</button>
            <button onClick={reset} className="flex-1 bg-gray-200 text-gray-600 rounded-lg py-2 text-sm">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
