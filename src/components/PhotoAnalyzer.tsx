import { useState, useRef } from 'react';

interface AnalysisResult {
  foods: { name: string; estimatedGrams: number; calories: number; protein: number }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  tip: string;
}

export default function PhotoAnalyzer() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const analyzeImage = async (base64: string) => {
    setLoading(true);
    setResult(null);
    setError('');

    const apiKey = (import.meta as any).env?.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      // Demo mode — simulate analysis
      await new Promise(r => setTimeout(r, 1500));
      setResult({
        foods: [
          { name: 'Fruta (estimada)', estimatedGrams: 150, calories: 85, protein: 1 },
          { name: 'Aveia', estimatedGrams: 30, calories: 117, protein: 5 },
          { name: 'Sementes', estimatedGrams: 15, calories: 72, protein: 3 },
        ],
        totalCalories: 274,
        totalProtein: 9,
        totalCarbs: 52,
        totalFat: 8,
        tip: 'Refeição equilibrada! Adicione uma fonte de proteína (ovo ou iogurte grego) para completar o café da manhã.',
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analise esta foto de refeição e retorne um JSON com a estrutura exata:
{
  "foods": [{"name": "nome em português", "estimatedGrams": 100, "calories": 150, "protein": 10}],
  "totalCalories": 300,
  "totalProtein": 20,
  "totalCarbs": 30,
  "totalFat": 10,
  "tip": "dica nutricional em português (1 frase)"
}
Seja preciso nas estimativas de gramas. Responda APENAS o JSON, sem texto adicional.`,
              },
              { type: 'image_url', image_url: { url: base64, detail: 'low' } },
            ],
          }],
          max_tokens: 500,
        }),
      });
      const data = await response.json();
      const content = data.choices[0].message.content;
      const parsed = JSON.parse(content.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
      setResult(parsed);
    } catch (e) {
      setError('Não consegui analisar a foto. Tente uma imagem mais clara!');
    }
    setLoading(false);
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const base64 = e.target?.result as string;
      setImage(base64);
      analyzeImage(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        📸 Analisar Prato por Foto
      </h2>
      <p className="text-sm text-gray-400 mb-5">Tire uma foto da sua refeição e vejo as calorias!</p>

      {/* Upload buttons */}
      <div className="flex gap-3 mb-5">
        <button
          onClick={() => cameraRef.current?.click()}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl py-4 flex flex-col items-center gap-1 transition-colors"
        >
          <span className="text-2xl">📷</span>
          <span className="text-sm font-medium">Tirar Foto</span>
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl py-4 flex flex-col items-center gap-1 transition-colors"
        >
          <span className="text-2xl">🖼️</span>
          <span className="text-sm font-medium">Galeria</span>
        </button>
      </div>

      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden"
        onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
      <input ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />

      {/* Preview */}
      {image && (
        <div className="mb-4 rounded-xl overflow-hidden">
          <img src={image} alt="Refeição" className="w-full max-h-64 object-cover" />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-8">
          <div className="text-4xl mb-3 animate-bounce">🧌</div>
          <p className="text-gray-500 text-sm">Analisando sua refeição...</p>
          <p className="text-gray-300 text-xs mt-1">Identificando alimentos e calculando calorias</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 rounded-xl p-4 text-red-600 text-sm text-center">{error}</div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="space-y-4">
          {/* Total */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white text-center">
            <p className="text-3xl font-bold">{result.totalCalories} kcal</p>
            <p className="text-green-100 text-sm mt-1">total estimado</p>
          </div>

          {/* Macros */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-blue-600">{result.totalProtein}g</p>
              <p className="text-xs text-gray-500">Proteína</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-orange-500">{result.totalCarbs}g</p>
              <p className="text-xs text-gray-500">Carboidrato</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-yellow-600">{result.totalFat}g</p>
              <p className="text-xs text-gray-500">Gordura</p>
            </div>
          </div>

          {/* Foods */}
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-2">Identificados:</p>
            <div className="space-y-2">
              {result.foods.map((food, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{food.name}</p>
                    <p className="text-xs text-gray-400">~{food.estimatedGrams}g</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600">{food.calories} kcal</p>
                    <p className="text-xs text-gray-400">{food.protein}g prot.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tip */}
          <div className="bg-green-50 rounded-xl p-4 flex gap-3">
            <span className="text-xl shrink-0">💡</span>
            <p className="text-sm text-green-700">{result.tip}</p>
          </div>

          <button
            onClick={() => { setImage(null); setResult(null); }}
            className="w-full border-2 border-dashed border-gray-200 text-gray-400 rounded-xl py-3 text-sm hover:bg-gray-50 transition-colors"
          >
            Analisar outro prato
          </button>
        </div>
      )}

      {!image && !loading && !result && (
        <div className="text-center py-8 text-gray-300">
          <p className="text-5xl mb-3">🍽️</p>
          <p className="text-sm">Fotografe seu prato para ver as calorias!</p>
        </div>
      )}
    </div>
  );
}
