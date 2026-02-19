const MENU = [
  {
    day: 'Segunda', emoji: '💪', surf: false,
    meals: {
      cafe: '2 ovos mexidos + 30g queijo minas + 1 banana média + café preto s/ açúcar',
      lanche_manha: '30g mix castanhas (5 amêndoas + 2 nozes + 2 castanhas do Pará) + 1 col. sopa semente girassol',
      almoco: '150g frango grelhado + 4 col. sopa arroz integral + 1 xíc. brócolis cozido + 1 fio azeite (1 col. chá)',
      lanche: '150g iogurte grego natural + 2 castanhas do Pará + canela a gosto',
      janta: 'Omelete de 3 ovos + 1 abobrinha média refogada + salada verde à vontade',
      ceia: 'Chá de camomila + 2 castanhas do Pará',
    },
    calories: 1540, protein: 108,
  },
  {
    day: 'Terça', emoji: '🌿', surf: false,
    meals: {
      cafe: 'Bowl: ½ mamão + 1 banana + 1 col. chá chia + 1 col. chá linhaça + 4 col. sopa aveia + 1 col. chá mel',
      lanche_manha: '½ abacate médio com limão + 1 col. sopa semente girassol',
      almoco: '130g carne bovina magra grelhada + 1 batata doce média (150g) cozida + 1 cenoura cozida',
      lanche: 'Vitamina: ½ abacate + 1 banana + 3 col. sopa aveia + 200ml água de coco',
      janta: '100g frango desfiado + 2 tapiocas médias (30g goma cada) + 50g ricota temperada',
      ceia: 'Chá de gengibre + 3 castanhas ou 1 kiwi',
    },
    calories: 1590, protein: 101,
  },
  {
    day: 'Quarta', emoji: '🍳', surf: false,
    meals: {
      cafe: '2 tapiocas (30g goma cada) recheadas com 50g ricota + 1 ovo mexido + café preto + 1 kiwi',
      lanche_manha: 'Suco verde (1 folha couve + ½ pepino + limão + gengibre) + 2 castanhas do Pará',
      almoco: '150g frango grelhado + 3 col. sopa feijão + 3 col. sopa arroz integral + salada crua à vontade',
      lanche: '1 maçã média + 20g mix castanhas + 1 col. sopa semente girassol',
      janta: 'Sopa: 150g frango desfiado + abobrinha + cenoura + chuchu (porção generosa)',
      ceia: '100g iogurte grego natural',
    },
    calories: 1540, protein: 106,
  },
  {
    day: 'Quinta', emoji: '🐟', surf: false,
    meals: {
      cafe: '2 ovos mexidos + ½ mamão médio + 1 col. chá chia + café preto',
      lanche_manha: '150g iogurte grego + ½ xíc. frutas vermelhas (morango, mirtilo)',
      almoco: '150g peixe (tilápia/merluza) assado + 1 batata doce média + 1 xíc. vagem cozida + 1 col. chá azeite',
      lanche: 'Smoothie: ½ mamão + 1 banana + 200ml água de coco + 1 col. chá chia',
      janta: '120g frango grelhado + 1 wrap integral + 50g ricota + folhas de alface + 1 tomate',
      ceia: 'Chá + 1 quadrado (10g) chocolate 70% (opcional)',
    },
    calories: 1565, protein: 110,
  },
  {
    day: 'Sexta', emoji: '🥑', surf: false,
    meals: {
      cafe: 'Vitamina: ½ manga + 1 banana + 1 col. chá chia + 200ml leite/água de coco + 20g mix nuts',
      lanche_manha: '2 ovos cozidos + 3 castanhas do Pará',
      almoco: '150g frango grelhado + 4 col. sopa arroz integral + 1 abobrinha refogada + 1 cenoura',
      lanche: 'Suco verde (200ml) + 1 torrada integral com ¼ abacate amassado',
      janta: 'Omelete de 3 ovos + 1 xíc. espinafre refogado + ¼ abacate fatiado',
      ceia: 'Chá de camomila + 5 nozes',
    },
    calories: 1520, protein: 98,
  },
  {
    day: 'Sábado', emoji: '🌊', surf: true,
    meals: {
      cafe: 'Bowl: 1 banana + ½ mamão + 4 col. aveia + 1 col. chia + mel + café',
      lanche_manha: '🏄‍♀️ PRÉ-SURF: 1 banana + 20g castanhas (energia para o surf!)',
      almoco: '180g frango/alcatra grelhada + salada variada à vontade + 1 porção mandioca (100g)',
      lanche: '½ abacate com limão + 3 castanhas do Pará + 1 col. sopa girassol',
      janta: '150g peixe grelhado + 1 xíc. legumes variados + salada verde à vontade',
      ceia: 'Vitamina: 1 banana + 150ml leite + 1 col. chá mel (recuperação pós-surf)',
    },
    calories: 1620, protein: 115,
  },
  {
    day: 'Domingo', emoji: '🌸', surf: true,
    meals: {
      cafe: '2 ovos mexidos + 30g queijo + ½ mamão + café + 5 nozes',
      lanche_manha: '🏄‍♀️ PRÉ-SURF: 150g iogurte grego + 1 banana (energia + proteína)',
      almoco: '150g frango assado + 3 col. sopa arroz integral + 1 xíc. brócolis + 1 cenoura',
      lanche: 'Suco verde (200ml) + 2 castanhas do Pará',
      janta: '2 tapiocas (30g goma cada) recheadas com 100g frango desfiado + 50g ricota',
      ceia: 'Chá relaxante + 20g castanhas variadas',
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
