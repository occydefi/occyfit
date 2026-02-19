import { useState } from 'react';

interface Recipe {
  name: string;
  ingredients: string[];
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  instructions: string;
  tags: string[];
  hours: string[];  // horários sugeridos
  difficulty: 'fácil' | 'médio';
}

const RECIPES: Recipe[] = [
  // ☀️ CAFÉ DA MANHÃ
  {
    name: 'Bowl de Frutas com Sementes',
    ingredients: ['banana', 'mamao', 'aveia', 'chia', 'linhaca', 'castanha_para'],
    time: '5 min', calories: 280, protein: 9, carbs: 48, fat: 8,
    instructions: '1. Corte banana e mamão em pedaços\n2. Coloque em tigela\n3. Adicione aveia, chia e linhaça\n4. Finalize com castanhas e canela a gosto',
    tags: ['sem glúten', 'energético', 'fibras'], hours: ['07:00', '08:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Ovo Mexido com Queijo',
    ingredients: ['ovo', 'queijo_minas'],
    time: '8 min', calories: 230, protein: 18, carbs: 2, fat: 16,
    instructions: '1. Bata 2-3 ovos com pitada de sal\n2. Derreta manteiga na frigideira\n3. Adicione os ovos em fogo baixo\n4. Mexa devagar, adicione queijo antes de finalizar',
    tags: ['proteico', 'rápido', 'poucos carboidratos'], hours: ['07:00', '08:00', '09:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Tapioca com Ovo e Ricota',
    ingredients: ['tapioca', 'ovo', 'ricota'],
    time: '10 min', calories: 320, protein: 22, carbs: 38, fat: 8,
    instructions: '1. Aqueça frigideira em fogo médio\n2. Coloque a goma de tapioca e deixe firmar\n3. Recheie com ovo mexido e ricota temperada\n4. Dobre ao meio e sirva',
    tags: ['sem glúten', 'proteico'], hours: ['07:00', '08:00', '10:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Vitamina Energética',
    ingredients: ['banana', 'abacate', 'aveia', 'chia'],
    time: '5 min', calories: 340, protein: 7, carbs: 45, fat: 14,
    instructions: '1. Banana + abacate no liquidificador\n2. Adicione leite ou água de coco\n3. Coloque aveia, chia e mel\n4. Bata até homogêneo\n5. Sirva gelado',
    tags: ['pré-treino', 'energético'], hours: ['06:30', '07:00', '08:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Panqueca de Banana com Aveia',
    ingredients: ['banana', 'aveia', 'ovo'],
    time: '15 min', calories: 310, protein: 14, carbs: 52, fat: 6,
    instructions: '1. Amasse 1 banana madura\n2. Misture com 2 ovos e 4 col. sopa aveia\n3. Adicione canela a gosto\n4. Frite em frigideira antiaderente (sem óleo)\n5. Sirva com mel ou frutas',
    tags: ['sem farinha', 'energético', 'doce'], hours: ['07:00', '08:00', '09:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Iogurte com Granola e Mel',
    ingredients: ['iogurte_grego', 'aveia', 'castanha_para', 'mel'],
    time: '3 min', calories: 290, protein: 14, carbs: 38, fat: 8,
    instructions: '1. Coloque iogurte grego na tigela\n2. Adicione aveia tostada ou granola\n3. Castanhas picadas por cima\n4. Fio de mel e canela\n5. Opcional: frutas vermelhas',
    tags: ['probiótico', 'rápido'], hours: ['07:00', '08:00', '10:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Overnight Oats',
    ingredients: ['aveia', 'chia', 'banana'],
    time: '5 min (preparo na noite anterior)', calories: 320, protein: 10, carbs: 58, fat: 5,
    instructions: '1. Na noite anterior: misture aveia + leite + chia numa tigela\n2. Cubra e leve à geladeira\n3. De manhã: adicione banana fatiada\n4. Castanhas, mel e canela por cima\n5. Coma gelado — fica cremoso!',
    tags: ['preparo antecipado', 'fibras'], hours: ['07:00', '08:00'],
    difficulty: 'fácil',
  },

  // 🌿 LANCHE DA MANHÃ
  {
    name: 'Mix de Castanhas',
    ingredients: ['castanha_para', 'amendoa', 'nozes'],
    time: '1 min', calories: 200, protein: 6, carbs: 8, fat: 18,
    instructions: '1. Separe 30g de mix variado\n2. Castanha do pará (2-3 un.) + amêndoas + nozes\n3. Pronto! Coma devagar',
    tags: ['rápido', 'poucos carboidratos', 'ômega 3'], hours: ['09:30', '10:00', '10:30'],
    difficulty: 'fácil',
  },
  {
    name: 'Abacate com Limão e Castanhas',
    ingredients: ['abacate', 'castanha_para'],
    time: '3 min', calories: 220, protein: 3, carbs: 10, fat: 19,
    instructions: '1. Corte meio abacate\n2. Tempere com limão, sal e pimenta\n3. Castanhas por cima\n4. Opcional: semente de girassol',
    tags: ['poucos carboidratos', 'gordura boa'], hours: ['09:30', '10:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Suco Verde Detox',
    ingredients: [],
    time: '5 min', calories: 45, protein: 1.5, carbs: 9, fat: 0.3,
    instructions: '1. Couve (1 folha) + pepino (metade)\n2. Suco de 1 limão + gengibre fresco\n3. Água gelada\n4. 1 col. chá de chia\n5. Bata e sirva sem coar para manter as fibras',
    tags: ['detox', 'anti-inflamatório'], hours: ['07:00', '09:00', '10:00'],
    difficulty: 'fácil',
  },

  // 🌞 ALMOÇO
  {
    name: 'Frango Grelhado com Legumes',
    ingredients: ['frango', 'abobrinha', 'cenoura', 'brocolis'],
    time: '25 min', calories: 310, protein: 38, carbs: 18, fat: 6,
    instructions: '1. Tempere o frango com sal, alho e ervas\n2. Grelhe 15 min cada lado\n3. Refogue os legumes no azeite com alho\n4. Sirva junto com fio de azeite',
    tags: ['proteico', 'poucos carboidratos'], hours: ['12:00', '13:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Bowl Proteico com Arroz',
    ingredients: ['frango', 'arroz_integral', 'feijao', 'abobrinha'],
    time: '30 min', calories: 490, protein: 42, carbs: 52, fat: 7,
    instructions: '1. Cozinhe arroz integral normalmente\n2. Desfie frango grelhado ou cozido\n3. Aqueça feijão temperado\n4. Monte o bowl: arroz + feijão + frango + abobrinha refogada\n5. Finalize com azeite e limão',
    tags: ['completo', 'pós-treino'], hours: ['12:00', '13:00', '14:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Salada de Atum com Ovos',
    ingredients: ['ovo', 'cenoura'],
    time: '15 min', calories: 280, protein: 32, carbs: 12, fat: 11,
    instructions: '1. Cozinhe 2 ovos por 8 min\n2. Abra 1 lata de atum ao natural\n3. Misture com cenoura ralada, milho e salsinha\n4. Tempere com limão, azeite e sal\n5. Ovos cozidos por cima',
    tags: ['poucos carboidratos', 'rápido', 'proteico'], hours: ['12:00', '13:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Wrap de Frango com Ricota',
    ingredients: ['frango', 'ricota'],
    time: '15 min', calories: 290, protein: 34, carbs: 22, fat: 8,
    instructions: '1. Grelhe o frango e desfie\n2. Misture ricota com ervas finas e limão\n3. Espalhe ricota no wrap/tortilla\n4. Adicione frango, alface e tomate\n5. Enrole firmemente',
    tags: ['prático', 'proteico'], hours: ['12:00', '13:00', '15:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Peixe Assado com Legumes',
    ingredients: ['abobrinha', 'brocolis', 'batata_doce'],
    time: '35 min', calories: 360, protein: 35, carbs: 28, fat: 8,
    instructions: '1. Tempere filé de peixe com limão, alho e ervas\n2. Asse a 200°C por 20 min\n3. Enquanto isso, asse os legumes com azeite\n4. Sirva com batata doce cozida\n5. Limão espremido na hora',
    tags: ['ômega 3', 'anti-inflamatório'], hours: ['12:00', '13:00', '19:00'],
    difficulty: 'médio',
  },
  {
    name: 'Sopa de Legumes com Frango',
    ingredients: ['frango', 'cenoura', 'abobrinha', 'brocolis'],
    time: '40 min', calories: 250, protein: 28, carbs: 22, fat: 4,
    instructions: '1. Refogue alho e cebola\n2. Adicione cenoura e abobrinha picadas\n3. Acrescente frango em cubos\n4. Cubra com água e cozinhe 25 min\n5. Tempere e finalize com salsinha',
    tags: ['reconfortante', 'light'], hours: ['12:00', '19:00', '20:00'],
    difficulty: 'médio',
  },

  // 🍎 LANCHE DA TARDE
  {
    name: 'Bowl Proteico Pós-Treino',
    ingredients: ['iogurte_grego', 'banana', 'aveia', 'amendoa'],
    time: '5 min', calories: 350, protein: 22, carbs: 42, fat: 9,
    instructions: '1. Base de iogurte grego\n2. Banana fatiada por cima\n3. Aveia e amêndoas\n4. Fio de mel e canela\n5. Coma em até 30 min após treinar',
    tags: ['pós-treino', 'proteico'], hours: ['15:00', '16:00', '17:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Ovo Cozido com Castanhas',
    ingredients: ['ovo', 'castanha_para'],
    time: '10 min', calories: 200, protein: 15, carbs: 3, fat: 14,
    instructions: '1. Cozinhe 2 ovos por 8 min (gema mole) ou 10 min (dura)\n2. Descasque e tempere com sal e azeite\n3. Sirva com 3-4 castanhas do pará',
    tags: ['proteico', 'poucos carboidratos', 'rápido'], hours: ['15:00', '16:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Tapioca com Abacate',
    ingredients: ['tapioca', 'abacate'],
    time: '8 min', calories: 310, protein: 3, carbs: 42, fat: 14,
    instructions: '1. Faça a tapioca na frigideira\n2. Amasse meio abacate com limão e sal\n3. Recheie a tapioca com o abacate\n4. Opcional: sementes de girassol por cima',
    tags: ['sem glúten', 'gordura boa'], hours: ['15:00', '16:00', '17:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Smoothie Tropical',
    ingredients: ['mamao', 'banana', 'chia'],
    time: '5 min', calories: 180, protein: 3, carbs: 40, fat: 2,
    instructions: '1. Mamão + banana no liquidificador\n2. Suco de laranja natural ou água de coco\n3. 1 col. chá de chia\n4. Gengibre a gosto\n5. Sirva gelado',
    tags: ['digestivo', 'tropical'], hours: ['15:00', '16:00'],
    difficulty: 'fácil',
  },

  // 🌙 JANTAR
  {
    name: 'Omelete de Legumes',
    ingredients: ['ovo', 'abobrinha', 'brocolis'],
    time: '12 min', calories: 260, protein: 20, carbs: 10, fat: 16,
    instructions: '1. Bata 3 ovos com sal e ervas\n2. Refogue os legumes picados\n3. Despeje os ovos por cima\n4. Tampa e cozinhe em fogo baixo\n5. Dobre ao meio quando firmar',
    tags: ['poucos carboidratos', 'leve', 'proteico'], hours: ['19:00', '20:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Frango Desfiado com Batata Doce',
    ingredients: ['frango', 'batata_doce'],
    time: '30 min', calories: 380, protein: 35, carbs: 38, fat: 5,
    instructions: '1. Cozinhe batata doce até amolecer\n2. Desfie frango cozido com temperos\n3. Refogue o frango com alho e ervas\n4. Sirva junto com batata doce amassada\n5. Azeite e limão para finalizar',
    tags: ['equilibrado', 'proteico'], hours: ['19:00', '20:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Salada Completa com Ovos',
    ingredients: ['ovo', 'cenoura', 'abobrinha'],
    time: '15 min', calories: 240, protein: 16, carbs: 14, fat: 13,
    instructions: '1. Cozinhe ovos e fatie\n2. Folhas verdes (alface, rúcula)\n3. Cenoura ralada, tomate, pepino\n4. Abobrinha grelhada\n5. Molho: azeite + limão + mostarda + sal',
    tags: ['leve', 'poucos carboidratos'], hours: ['19:00', '20:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Caldo de Frango Proteico',
    ingredients: ['frango', 'cenoura'],
    time: '35 min', calories: 210, protein: 26, carbs: 12, fat: 4,
    instructions: '1. Caldo de frango com cenoura, chuchu, salsão\n2. Cozinhe bem, desfie o frango dentro\n3. Tempere com cúrcuma, gengibre\n4. Finalizar com salsinha fresca\n5. Ótimo pra noite — leve e nutritivo',
    tags: ['leve', 'anti-inflamatório', 'reconfortante'], hours: ['19:00', '20:00', '21:00'],
    difficulty: 'médio',
  },
];

const HOUR_LABELS: Record<string, string> = {
  '06:30': '☀️ Bem cedo',
  '07:00': '☀️ 7h',
  '08:00': '🌅 8h',
  '09:00': '🌤️ 9h',
  '09:30': '🌤️ 9h30',
  '10:00': '🍎 10h',
  '10:30': '🍎 10h30',
  '12:00': '🌞 12h',
  '13:00': '🌞 13h',
  '14:00': '🌞 14h',
  '15:00': '🍊 15h',
  '16:00': '🍊 16h',
  '17:00': '🍊 17h',
  '19:00': '🌙 19h',
  '20:00': '🌙 20h',
  '21:00': '🌙 21h',
};

const PERIOD_FILTERS = [
  { key: '', label: 'Todas', emoji: '🍽️' },
  { key: 'manha', label: 'Café da Manhã', emoji: '☀️' },
  { key: 'lanche_manha', label: 'Lanche Manhã', emoji: '🍎' },
  { key: 'almoco', label: 'Almoço', emoji: '🌞' },
  { key: 'lanche_tarde', label: 'Lanche Tarde', emoji: '🍊' },
  { key: 'jantar', label: 'Jantar', emoji: '🌙' },
];

function getPeriod(hours: string[]): string {
  const h = hours[0];
  if (!h) return '';
  const num = parseInt(h);
  if (num < 10) return 'manha';
  if (num < 12) return 'lanche_manha';
  if (num < 15) return 'almoco';
  if (num < 18) return 'lanche_tarde';
  return 'jantar';
}

export default function RecipeGenerator() {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = RECIPES.filter(r => {
    const matchPeriod = !filter || getPeriod(r.hours) === filter;
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase());
    return matchPeriod && matchSearch;
  });

  const diffColor = (d: string) => d === 'fácil' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600';

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
        🍳 Receitas Saudáveis
      </h2>
      <p className="text-sm text-gray-400 mb-4">{RECIPES.length} receitas — com horários sugeridos</p>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Buscar receita..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-orange-300"
      />

      {/* Period filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {PERIOD_FILTERS.map(p => (
          <button
            key={p.key}
            onClick={() => setFilter(p.key)}
            className={`flex flex-col items-center px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all shrink-0 ${
              filter === p.key
                ? 'bg-gradient-to-b from-orange-400 to-pink-400 text-white shadow-md'
                : 'bg-gray-100 text-gray-500 hover:bg-orange-50'
            }`}
          >
            <span className="text-lg">{p.emoji}</span>
            {p.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 mb-3">{filtered.length} receitas encontradas</p>

      {/* Recipe list */}
      <div className="space-y-3">
        {filtered.map(recipe => (
          <div key={recipe.name} className="border border-gray-100 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === recipe.name ? null : recipe.name)}
              className="w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{recipe.name}</p>
                  {/* Hours */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {recipe.hours.map(h => (
                      <span key={h} className="text-xs bg-orange-50 text-orange-500 px-2 py-0.5 rounded-full">
                        {HOUR_LABELS[h] || h}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {recipe.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-green-600 font-bold">{recipe.calories} kcal</p>
                  <p className="text-xs text-blue-500">💪 {recipe.protein}g</p>
                  <p className="text-xs text-gray-400">⏱ {recipe.time}</p>
                </div>
              </div>
            </button>

            {expanded === recipe.name && (
              <div className="px-4 pb-4 border-t border-gray-100">
                {/* Macros */}
                <div className="grid grid-cols-4 gap-2 my-3">
                  <div className="text-center bg-green-50 rounded-lg py-1.5">
                    <p className="text-sm font-bold text-green-600">{recipe.calories}</p>
                    <p className="text-xs text-gray-400">kcal</p>
                  </div>
                  <div className="text-center bg-blue-50 rounded-lg py-1.5">
                    <p className="text-sm font-bold text-blue-500">{recipe.protein}g</p>
                    <p className="text-xs text-gray-400">prot.</p>
                  </div>
                  <div className="text-center bg-orange-50 rounded-lg py-1.5">
                    <p className="text-sm font-bold text-orange-400">{recipe.carbs}g</p>
                    <p className="text-xs text-gray-400">carbs</p>
                  </div>
                  <div className="text-center bg-yellow-50 rounded-lg py-1.5">
                    <p className="text-sm font-bold text-yellow-500">{recipe.fat}g</p>
                    <p className="text-xs text-gray-400">gord.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${diffColor(recipe.difficulty)}`}>
                    {recipe.difficulty}
                  </span>
                  <span className="text-xs text-gray-400">⏱ {recipe.time}</span>
                </div>

                <p className="text-xs font-semibold text-gray-600 mb-2">📋 Como fazer:</p>
                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                  {recipe.instructions}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-gray-300">
          <p className="text-4xl mb-2">🥦</p>
          <p className="text-sm">Nenhuma receita encontrada</p>
        </div>
      )}
    </div>
  );
}
