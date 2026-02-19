const MENU = [
  {
    day: 'Segunda',
    emoji: '💪',
    meals: {
      cafe: 'Ovo mexido com queijo + banana + café preto',
      almoco: 'Frango grelhado + arroz integral + brócolis + azeite',
      lanche: 'Iogurte grego + castanha do Pará + canela',
      janta: 'Omelete 3 ovos + abobrinha refogada + salada',
    },
    calories: 1480,
    protein: 102,
  },
  {
    day: 'Terça',
    emoji: '🌿',
    meals: {
      cafe: 'Bowl: mamão + banana + chia + linhaça + aveia + mel',
      almoco: 'Carne bovina magra + batata doce + cenoura cozida',
      lanche: 'Vitamina: abacate + banana + aveia + água de coco',
      janta: 'Frango desfiado + tapioca + ricota',
    },
    calories: 1520,
    protein: 95,
  },
  {
    day: 'Quarta',
    emoji: '🍳',
    meals: {
      cafe: 'Tapioca com ricota e ovo + café preto + kiwi',
      almoco: 'Frango + feijão + arroz integral + salada verde',
      lanche: 'Maçã + mix de castanhas + semente de girassol',
      janta: 'Sopa leve de legumes com frango desfiado',
    },
    calories: 1490,
    protein: 98,
  },
  {
    day: 'Quinta',
    emoji: '🐟',
    meals: {
      cafe: 'Ovos mexidos + mamão com semente de chia + café',
      almoco: 'Peixe assado + batata doce + vagem cozida + azeite',
      lanche: 'Iogurte grego + frutas vermelhas + amêndoas',
      janta: 'Wrap de frango com ricota + alface + tomate',
    },
    calories: 1505,
    protein: 108,
  },
  {
    day: 'Sexta',
    emoji: '🥑',
    meals: {
      cafe: 'Vitamina: manga + banana + chia + mix de nuts',
      almoco: 'Frango + arroz integral + abobrinha + cenoura',
      lanche: 'Suco verde detox + ovo cozido',
      janta: 'Omelete + espinafre refogado + abacate',
    },
    calories: 1480,
    protein: 91,
  },
  {
    day: 'Sábado',
    emoji: '🌊',
    meals: {
      cafe: 'Bowl de frutas completo + café + barrinha de nuts',
      almoco: 'Churrasco (frango/alcatra) + salada variada + mandioca',
      lanche: 'Abacate amassado com limão + castanhas',
      janta: 'Peixe grelhado + legumes + salada verde',
    },
    calories: 1550,
    protein: 105,
  },
  {
    day: 'Domingo',
    emoji: '🌸',
    meals: {
      cafe: 'Ovo mexido com queijo + mamão + café + nozes',
      almoco: 'Frango assado + arroz integral + brócolis + cenoura',
      lanche: 'Suco verde + castanha do Pará',
      janta: 'Tapioca recheada com frango e ricota',
    },
    calories: 1495,
    protein: 99,
  },
];

const mealLabels: Record<string, string> = {
  cafe: '☀️ Café da Manhã',
  almoco: '🌞 Almoço',
  lanche: '🍎 Lanche',
  janta: '🌙 Jantar',
};

export default function WeeklyMenu() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        📅 Cardápio da Semana
      </h2>
      <p className="text-sm text-gray-400 mb-5">Baseado nos seus gostos • ~1.500 kcal/dia</p>

      <div className="space-y-3">
        {MENU.map(day => (
          <details key={day.day} className="group border border-gray-100 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 list-none">
              <div className="flex items-center gap-3">
                <span className="text-xl">{day.emoji}</span>
                <span className="font-semibold text-gray-800">{day.day}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-green-600 font-bold">{day.calories} kcal</span>
                <span className="text-blue-500">{day.protein}g prot.</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </div>
            </summary>
            <div className="px-4 pb-4 space-y-2 border-t border-gray-50">
              {Object.entries(day.meals).map(([key, value]) => (
                <div key={key} className="py-2 border-b border-gray-50 last:border-0">
                  <p className="text-xs font-semibold text-green-600 mb-0.5">{mealLabels[key]}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
