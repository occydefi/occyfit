import { useState } from 'react';
import { FOODS, MEAL_PRESETS } from '../data/foods';

interface MealItem {
  foodKey: string;
  grams: number;
}

export default function MealBuilder() {
  const [items, setItems] = useState<MealItem[]>([]);
  const [search, setSearch] = useState('');
  const [activePreset, setActivePreset] = useState('');

  const filteredFoods = Object.entries(FOODS).filter(([, food]) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  const addFood = (key: string) => {
    const existing = items.find(i => i.foodKey === key);
    if (existing) return;
    setItems([...items, { foodKey: key, grams: FOODS[key].defaultGrams }]);
    setSearch('');
  };

  const updateGrams = (key: string, grams: number) => {
    setItems(items.map(i => i.foodKey === key ? { ...i, grams } : i));
  };

  const removeItem = (key: string) => {
    setItems(items.filter(i => i.foodKey !== key));
  };

  const loadPreset = (presetKey: string) => {
    const preset = MEAL_PRESETS[presetKey as keyof typeof MEAL_PRESETS];
    setItems(preset.items.map(k => ({ foodKey: k, grams: FOODS[k].defaultGrams })));
    setActivePreset(presetKey);
  };

  const totals = items.reduce((acc, item) => {
    const food = FOODS[item.foodKey];
    const factor = item.grams / 100;
    return {
      calories: acc.calories + food.calories * factor,
      protein: acc.protein + food.protein * factor,
      carbs: acc.carbs + food.carbs * factor,
      fat: acc.fat + food.fat * factor,
      fiber: acc.fiber + food.fiber * factor,
    };
  }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        🥗 Montar Refeição
      </h2>

      {/* Presets */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(MEAL_PRESETS).map(([key, preset]) => (
          <button
            key={key}
            onClick={() => loadPreset(key)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              activePreset === key
                ? 'bg-green-500 text-white'
                : 'bg-green-50 text-green-700 hover:bg-green-100'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="🔍 Buscar alimento..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {search && (
          <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg max-h-48 overflow-y-auto">
            {filteredFoods.map(([key, food]) => (
              <button
                key={key}
                onClick={() => addFood(key)}
                className="w-full text-left px-4 py-2 hover:bg-green-50 text-sm flex justify-between"
              >
                <span>{food.name}</span>
                <span className="text-gray-400">{food.calories} kcal/100g</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Items */}
      {items.length > 0 && (
        <div className="space-y-2 mb-4">
          {items.map(item => {
            const food = FOODS[item.foodKey];
            const kcal = Math.round((food.calories * item.grams) / 100);
            return (
              <div key={item.foodKey} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2">
                <span className="text-sm font-medium text-gray-700 flex-1">{food.name}</span>
                <input
                  type="number"
                  value={item.grams}
                  onChange={e => updateGrams(item.foodKey, Number(e.target.value))}
                  className="w-16 text-center border border-gray-200 rounded-lg px-2 py-1 text-sm"
                />
                <span className="text-xs text-gray-400">g</span>
                <span className="text-sm font-bold text-green-600 w-16 text-right">{kcal} kcal</span>
                <button onClick={() => removeItem(item.foodKey)} className="text-red-400 hover:text-red-600 text-lg leading-none">×</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Totals */}
      {items.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
          <p className="text-center text-2xl font-bold text-green-700 mb-3">
            {Math.round(totals.calories)} kcal
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Proteína', value: totals.protein, unit: 'g', color: 'text-blue-600' },
              { label: 'Carbs', value: totals.carbs, unit: 'g', color: 'text-orange-500' },
              { label: 'Gordura', value: totals.fat, unit: 'g', color: 'text-yellow-600' },
              { label: 'Fibras', value: totals.fiber, unit: 'g', color: 'text-green-600' },
            ].map(m => (
              <div key={m.label} className="text-center">
                <p className={`text-lg font-bold ${m.color}`}>{Math.round(m.value)}{m.unit}</p>
                <p className="text-xs text-gray-500">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {items.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p className="text-4xl mb-2">🥦</p>
          <p className="text-sm">Selecione um preset ou busque um alimento</p>
        </div>
      )}
    </div>
  );
}
