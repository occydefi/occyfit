const MENU = [
  {
    day: 'Segunda', emoji: '💪', surf: false,
    meals: {
      cafe: 'Ovo mexido com queijo + banana + café preto',
      lanche_manha: 'Mix de castanhas + semente de girassol',
      almoco: 'Frango grelhado + arroz integral + brócolis + azeite',
      lanche: 'Iogurte grego + castanha do Pará + canela',
      janta: 'Omelete 3 ovos + abobrinha refogada + salada',
    },
    calories: 1530, protein: 108,
  },
  {
    day: 'Terça', emoji: '🌿', surf: false,
    meals: {
      cafe: 'Bowl: mamão + banana + chia + linhaça + aveia + mel',
      lanche_manha: 'Abacate com limão + sementes de girassol',
      almoco: 'Carne bovina magra + batata doce + cenoura cozida',
      lanche: 'Vitamina: abacate + banana + aveia + água de coco',
      janta: 'Frango desfiado + tapioca + ricota',
    },
    calories: 1580, protein: 101,
  },
  {
    day: 'Quarta', emoji: '🍳', surf: false,
    meals: {
      cafe: 'Tapioca com ricota e ovo + café preto + kiwi',
      lanche_manha: 'Suco verde detox + castanha do Pará',
      almoco: 'Frango + feijão + arroz integral + salada crua',
      lanche: 'Maçã + mix de castanhas + semente de girassol',
      janta: 'Sopa leve de legumes com frango desfiado',
    },
    calories: 1490, protein: 98,
  },
  {
    day: 'Quinta', emoji: '🐟', surf: false,
    meals: {
      cafe: 'Ovos mexidos + mamão com chia + café preto',
      lanche_manha: 'Iogurte grego + frutas vermelhas',
      almoco: 'Peixe assado + batata doce + vagem cozida + azeite',
      lanche: 'Smoothie tropical (mamão + banana + chia)',
      janta: 'Wrap de frango com ricota + alface + tomate',
    },
    calories: 1515, protein: 110,
  },
  {
    day: 'Sexta', emoji: '🥑', surf: false,
    meals: {
      cafe: 'Vitamina: manga + banana + chia + mix de nuts',
      lanche_manha: 'Ovo cozido + castanhas',
      almoco: 'Frango + arroz integral + abobrinha + cenoura',
      lanche: 'Suco verde + torrada integral com abacate',
      janta: 'Omelete + espinafre refogado + abacate',
    },
    calories: 1490, protein: 95,
  },
  {
    day: 'Sábado', emoji: '🌊', surf: true,
    meals: {
      cafe: 'Bowl de frutas completo + café + barrinha de nuts',
      lanche_manha: '🏄‍♀️ SURF — pré-surf: banana + castanhas',
      almoco: 'Churrasco (frango/alcatra) + salada variada + mandioca',
      lanche: 'Abacate com limão + castanhas do Pará',
      janta: 'Peixe grelhado + legumes + salada verde',
    },
    calories: 1580, protein: 112,
  },
  {
    day: 'Domingo', emoji: '🌸', surf: true,
    meals: {
      cafe: 'Ovo mexido com queijo + mamão + café + nozes',
      lanche_manha: '🏄‍♀️ SURF — pré-surf: iogurte grego + banana',
      almoco: 'Frango assado + arroz integral + brócolis + cenoura',
      lanche: 'Suco verde + castanha do Pará',
      janta: 'Tapioca recheada com frango e ricota',
    },
    calories: 1510, protein: 103,
  },
];

const mealLabels: Record<string, { label: string; time: string }> = {
  cafe:         { label: '☀️ Café da Manhã',    time: '07:00 – 08:00' },
  lanche_manha: { label: '🍎 Lanche da Manhã',  time: '10:00 – 10:30' },
  almoco:       { label: '🌞 Almoço',            time: '12:00 – 13:00' },
  lanche:       { label: '🍊 Lanche da Tarde',   time: '15:00 – 16:00' },
  janta:        { label: '🌙 Jantar',            time: '19:00 – 20:00' },
};

export default function WeeklyMenu() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        📅 Cardápio da Semana
      </h2>
      <p className="text-sm text-gray-400 mb-5">Baseado nos seus gostos • ~1.500 kcal/dia • 5 refeições</p>

      <div className="space-y-3">
        {MENU.map(day => (
          <details key={day.day} className="group border border-gray-100 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-orange-50 list-none transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-xl">{day.emoji}</span>
                <span className="font-semibold text-gray-800">{day.day}</span>
                {day.surf && (
                  <span className="text-xs bg-blue-100 text-blue-500 px-2 py-0.5 rounded-full">🌊 Surf</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-green-600 font-bold">{day.calories} kcal</span>
                <span className="text-blue-500">{day.protein}g prot.</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </div>
            </summary>
            <div className="px-4 pb-4 space-y-0 border-t border-gray-50">
              {Object.entries(day.meals).map(([key, value]) => (
                <div key={key} className="py-2.5 border-b border-gray-50 last:border-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-xs font-semibold text-orange-500">{mealLabels[key].label}</p>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">🕐 {mealLabels[key].time}</span>
                  </div>
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
