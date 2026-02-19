import { useState } from 'react';

const RECIPES = [
  {
    name: 'Tapioca com Ovo e Ricota',
    ingredients: ['tapioca', 'ovo', 'ricota'],
    time: '10 min',
    calories: 320,
    protein: 22,
    instructions: '1. Aqueça a frigideira em fogo médio\n2. Coloque a goma de tapioca e deixe firmar\n3. Recheie com ovo mexido e ricota\n4. Dobre ao meio e sirva',
    tags: ['café', 'lanche', 'sem glúten'],
  },
  {
    name: 'Bowl de Frutas com Sementes',
    ingredients: ['banana', 'mamao', 'aveia', 'chia', 'linhaca', 'castanha_para'],
    time: '5 min',
    calories: 280,
    protein: 9,
    instructions: '1. Corte banana e mamão em pedaços\n2. Coloque em tigela\n3. Adicione aveia, chia e linhaça\n4. Finalize com castanhas e canela',
    tags: ['café', 'saudável', 'energético'],
  },
  {
    name: 'Ovo Mexido com Queijo',
    ingredients: ['ovo', 'queijo_minas'],
    time: '8 min',
    calories: 230,
    protein: 18,
    instructions: '1. Bata 2-3 ovos com pitada de sal\n2. Derreta manteiga na frigideira\n3. Adicione os ovos em fogo baixo\n4. Mexa devagar, adicione queijo antes de finalizar',
    tags: ['café', 'proteico', 'rápido'],
  },
  {
    name: 'Frango Desfiado com Legumes',
    ingredients: ['frango', 'abobrinha', 'cenoura', 'brocolis'],
    time: '25 min',
    calories: 310,
    protein: 38,
    instructions: '1. Cozinhe o frango e desfie\n2. Refogue alho e cebola no azeite\n3. Adicione os legumes picados\n4. Misture o frango e tempere com sal e ervas',
    tags: ['almoço', 'janta', 'low carb'],
  },
  {
    name: 'Vitamina Energética',
    ingredients: ['banana', 'abacate', 'aveia', 'chia'],
    time: '5 min',
    calories: 340,
    protein: 7,
    instructions: '1. Coloque banana e abacate no liquidificador\n2. Adicione leite ou água de coco\n3. Coloque aveia e chia\n4. Bata até ficar homogêneo',
    tags: ['café', 'lanche', 'pré-treino'],
  },
  {
    name: 'Wrap de Frango com Ricota',
    ingredients: ['frango', 'ricota'],
    time: '15 min',
    calories: 290,
    protein: 34,
    instructions: '1. Tempere e grelhe o frango, desfie\n2. Misture ricota com ervas finas\n3. Monte o wrap com alface, tomate\n4. Adicione o frango e a ricota',
    tags: ['almoço', 'janta', 'lanche'],
  },
  {
    name: 'Suco Verde Detox',
    ingredients: [],
    time: '5 min',
    calories: 45,
    protein: 1.5,
    instructions: '1. Coloque 1 folha de couve no liquidificador\n2. Adicione 1 pepino, suco de 1 limão\n3. Pedaço de gengibre fresco\n4. Água gelada e 1 col. chá de chia\n5. Bata e sirva sem coar',
    tags: ['suco', 'detox', 'manhã'],
  },
  {
    name: 'Bowl Proteico Pós-Treino',
    ingredients: ['iogurte_grego', 'banana', 'aveia', 'amendoa'],
    time: '5 min',
    calories: 350,
    protein: 22,
    instructions: '1. Base de iogurte grego\n2. Banana fatiada por cima\n3. Aveia e amêndoas\n4. Fio de mel e canela',
    tags: ['pós-treino', 'proteico', 'lanche'],
  },
];

export default function RecipeGenerator() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [filter, setFilter] = useState('');

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const quickIngredients = ['ovo', 'frango', 'aveia', 'banana', 'ricota', 'iogurte_grego', 'abacate'];

  const matchedRecipes = selectedIngredients.length === 0
    ? RECIPES.filter(r => !filter || r.tags.includes(filter))
    : RECIPES.filter(r =>
        selectedIngredients.some(ing => r.ingredients.includes(ing)) &&
        (!filter || r.tags.includes(filter))
      ).sort((a, b) => {
        const aMatch = a.ingredients.filter(i => selectedIngredients.includes(i)).length;
        const bMatch = b.ingredients.filter(i => selectedIngredients.includes(i)).length;
        return bMatch - aMatch;
      });

  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        🍳 Gerador de Receitas
      </h2>

      <p className="text-sm text-gray-500 mb-3">Selecione o que tem em casa:</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {quickIngredients.map(ing => (
          <button
            key={ing}
            onClick={() => toggleIngredient(ing)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedIngredients.includes(ing)
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-green-50'
            }`}
          >
            {ing === 'ovo' ? '🥚 Ovo' :
             ing === 'frango' ? '🍗 Frango' :
             ing === 'aveia' ? '🌾 Aveia' :
             ing === 'banana' ? '🍌 Banana' :
             ing === 'ricota' ? '🧀 Ricota' :
             ing === 'iogurte_grego' ? '🥛 Iogurte' : '🥑 Abacate'}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {['', 'café', 'almoço', 'janta', 'lanche', 'suco', 'proteico', 'low carb'].map(tag => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
              filter === tag ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            {tag || 'Todos'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {matchedRecipes.map(recipe => (
          <div key={recipe.name} className="border border-gray-100 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === recipe.name ? null : recipe.name)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{recipe.name}</p>
                  <div className="flex gap-2 mt-1">
                    {recipe.tags.map(tag => (
                      <span key={tag} className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-bold">{recipe.calories} kcal</p>
                  <p className="text-xs text-gray-400">⏱ {recipe.time}</p>
                </div>
              </div>
            </button>
            {expanded === recipe.name && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className="flex gap-4 my-3 text-sm">
                  <span className="text-blue-600">💪 {recipe.protein}g proteína</span>
                </div>
                <p className="text-sm text-gray-600 whitespace-pre-line">{recipe.instructions}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
