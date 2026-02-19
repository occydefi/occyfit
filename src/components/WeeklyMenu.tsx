const MENU = [
  {
    day: 'Segunda', emoji: '💪', surf: false,
    meals: {
      cafe: 'Ovo mexido com queijo + banana + café preto',
      lanche_manha: 'Mix de castanhas + semente de girassol',
      almoco: 'Frango grelhado + arroz integral + brócolis + azeite',
      lanche: 'Iogurte grego + castanha do Pará + canela',
      janta: 'Omelete 3 ovos + abobrinha refogada + salada',
      ceia: 'Chá de camomila + 2 castanhas do Pará',
    },
    calories: 1540, protein: 108,
  },
  {
    day: 'Terça', emoji: '🌿', surf: false,
    meals: {
      cafe: 'Bowl: mamão + banana + chia + linhaça + aveia + mel',
      lanche_manha: 'Abacate com limão + sementes de girassol',
      almoco: 'Carne bovina magra + batata doce + cenoura cozida',
      lanche: 'Vitamina: abacate + banana + aveia + água de coco',
      janta: 'Frango desfiado + tapioca + ricota',
      ceia: 'Chá de gengibre + castanhas ou fruta pequena',
    },
    calories: 1590, protein: 101,
  },
  {
    day: 'Quarta', emoji: '🍳', surf: false,
    meals: {
      cafe: 'Tapioca com ricota e ovo + café preto + kiwi',
      lanche_manha: 'Suco verde detox + castanha do Pará',
      almoco: 'Frango + feijão + arroz integral + salada crua',
      lanche: 'Maçã + mix de castanhas + semente de girassol',
      janta: 'Sopa leve de legumes com frango desfiado',
      ceia: 'Iogurte grego natural (sem adição)',
    },
    calories: 1540, protein: 106,
  },
  {
    day: 'Quinta', emoji: '🐟', surf: false,
    meals: {
      cafe: 'Ovos mexidos + mamão com chia + café preto',
      lanche_manha: 'Iogurte grego + frutas vermelhas',
      almoco: 'Peixe assado + batata doce + vagem cozida + azeite',
      lanche: 'Smoothie tropical (mamão + banana + chia)',
      janta: 'Wrap de frango com ricota + alface + tomate',
      ceia: 'Chá + 1 quadrado de chocolate 70% (opcional)',
    },
    calories: 1565, protein: 110,
  },
  {
    day: 'Sexta', emoji: '🥑', surf: false,
    meals: {
      cafe: 'Vitamina: manga + banana + chia + mix de nuts',
      lanche_manha: 'Ovo cozido + castanhas',
      almoco: 'Frango + arroz integral + abobrinha + cenoura',
      lanche: 'Suco verde + torrada integral com abacate',
      janta: 'Omelete + espinafre refogado + abacate',
      ceia: 'Chá de camomila + nozes',
    },
    calories: 1520, protein: 98,
  },
  {
    day: 'Sábado', emoji: '🌊', surf: true,
    meals: {
      cafe: 'Bowl de frutas completo + café + barrinha de nuts',
      lanche_manha: '🏄‍♀️ SURF — pré-surf: banana + castanhas',
      almoco: 'Churrasco (frango/alcatra) + salada variada + mandioca',
      lanche: 'Abacate com limão + castanhas do Pará',
      janta: 'Peixe grelhado + legumes + salada verde',
      ceia: 'Vitamina leve: banana + leite + mel (pós-surf recovery)',
    },
    calories: 1620, protein: 115,
  },
  {
    day: 'Domingo', emoji: '🌸', surf: true,
    meals: {
      cafe: 'Ovo mexido com queijo + mamão + café + nozes',
      lanche_manha: '🏄‍♀️ SURF — pré-surf: iogurte grego + banana',
      almoco: 'Frango assado + arroz integral + brócolis + cenoura',
      lanche: 'Suco verde + castanha do Pará',
      janta: 'Tapioca recheada com frango e ricota',
      ceia: 'Chá relaxante + castanhas (descanso ativo)',
    },
    calories: 1555, protein: 107,
  },
];

const mealLabels: Record<string, { label: string; time: string }> = {
  cafe:         { label: '☀️ Café da Manhã',    time: '07:00' },
  lanche_manha: { label: '🍎 Lanche da Manhã',  time: '10:00' },
  almoco:       { label: '🌞 Almoço',            time: '12:30' },
  lanche:       { label: '🍊 Lanche da Tarde',   time: '16:00 – 17:00' },
  janta:        { label: '🌙 Jantar',            time: '19:00 – 20:00' },
  ceia:         { label: '🌛 Ceia (opcional)',   time: '21:00 – 22:00' },
};

// Food images from Unsplash
const MEAL_IMAGES: Record<string, string> = {
  cafe: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=70&fit=crop',
  lanche_manha: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=70&fit=crop',
  almoco: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=70&fit=crop',
  lanche: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=70&fit=crop',
  janta: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=70&fit=crop',
  ceia: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70&fit=crop',
};

const TIFFANY = '#00b4b4';

export default function WeeklyMenu() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-black mb-1 flex items-center gap-2"
        style={{ color: TIFFANY, fontFamily: 'Raleway, sans-serif', letterSpacing: '1px' }}>
        📅 CARDÁPIO DA SEMANA
      </h2>
      <p className="text-sm text-gray-400 mb-5">Personalizado • ~1.500 kcal/dia • 6 refeições</p>

      <div className="space-y-3">
        {MENU.map(day => (
          <details key={day.day} className="group rounded-2xl overflow-hidden shadow-sm"
            style={{ border: `1.5px solid #e0fafa` }}>
            <summary className="flex items-center justify-between px-4 py-3.5 cursor-pointer list-none transition-colors"
              style={{ background: 'linear-gradient(90deg, #f0fffe, #ffffff)' }}>
              <div className="flex items-center gap-2">
                <span className="text-xl">{day.emoji}</span>
                <span className="font-black text-gray-800" style={{ fontFamily: 'Raleway, sans-serif' }}>{day.day}</span>
                {day.surf && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{ background: '#e0fafa', color: TIFFANY }}>🌊 Surf</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="font-black" style={{ color: TIFFANY }}>{day.calories} kcal</span>
                <span className="text-blue-400 font-semibold">{day.protein}g</span>
                <span className="text-gray-300 group-open:rotate-180 transition-transform">▼</span>
              </div>
            </summary>
            <div className="px-4 pb-4 space-y-0" style={{ borderTop: '1px solid #e0fafa' }}>
              {Object.entries(day.meals).map(([key, value]) => (
                <div key={key} className="py-3 border-b last:border-0 flex gap-3 items-start"
                  style={{ borderColor: '#f0fffe' }}>
                  {/* Food photo */}
                  <img
                    src={MEAL_IMAGES[key]}
                    alt={mealLabels[key].label}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-sm"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-xs font-black" style={{ color: TIFFANY, letterSpacing: '0.5px' }}>
                        {mealLabels[key].label}
                      </p>
                      <span className="text-xs text-gray-400 ml-2 shrink-0">🕐 {mealLabels[key].time}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
