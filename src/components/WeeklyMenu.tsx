import { useState } from 'react';

// AI-generated food images stored locally
const AI = (name: string) => `/meals/${name}.png`;

const MENU = [
  {
    day: 'Segunda', emoji: '💪', surf: false,
    meals: {
      cafe:         '2 ovos mexidos + 30g queijo minas + 1 banana + café preto s/ açúcar',
      lanche_manha: '30g mix castanhas (5 amêndoas + 2 nozes + 2 castanhas do Pará) + 1 col. sopa semente girassol',
      almoco:       '150g frango grelhado + 4 col. sopa arroz integral + 1 xíc. brócolis cozido + 1 fio azeite',
      lanche:       '150g iogurte grego natural + 2 castanhas do Pará + canela a gosto',
      janta:        'Omelete de 3 ovos + 1 abobrinha média refogada + salada verde à vontade',
      ceia:         'Chá de camomila + 2 castanhas do Pará',
    },
    images: {
      cafe:         AI('ovos-mexidos'),
      lanche_manha: AI('castanhas'),
      almoco:       AI('frango-arroz'),
      lanche:       AI('iogurte'),
      janta:        AI('omelete'),
      ceia:         AI('cha'),
    },
    calories: 1540, protein: 108,
  },
  {
    day: 'Terça', emoji: '🌿', surf: false,
    meals: {
      cafe:         'Bowl: ½ mamão + 1 banana + 1 col. chá chia + 1 col. chá linhaça + 4 col. sopa aveia + mel',
      lanche_manha: '½ abacate médio com limão + 1 col. sopa semente girassol',
      almoco:       '130g carne bovina magra grelhada + 1 batata doce média (150g) cozida + 1 cenoura',
      lanche:       'Vitamina: ½ abacate + 1 banana + 3 col. sopa aveia + 200ml água de coco',
      janta:        '100g frango desfiado + 2 tapiocas (30g goma cada) + 50g ricota temperada',
      ceia:         'Chá de gengibre + 3 castanhas ou 1 kiwi',
    },
    images: {
      cafe:         AI('bowl-frutas'),
      lanche_manha: AI('abacate'),
      almoco:       AI('carne'),
      lanche:       AI('vitamina'),
      janta:        AI('tapioca'),
      ceia:         AI('cha'),
    },
    calories: 1590, protein: 101,
  },
  {
    day: 'Quarta', emoji: '🍳', surf: false,
    meals: {
      cafe:         '2 tapiocas (30g goma cada) recheadas com 50g ricota + 1 ovo mexido + café preto + 1 kiwi',
      lanche_manha: 'Suco verde (1 folha couve + ½ pepino + limão + gengibre) + 2 castanhas do Pará',
      almoco:       '150g frango + 3 col. sopa feijão + 3 col. sopa arroz integral + salada crua à vontade',
      lanche:       '1 maçã média + 20g mix castanhas + 1 col. sopa semente girassol',
      janta:        'Sopa: 150g frango desfiado + abobrinha + cenoura + chuchu (porção generosa)',
      ceia:         '100g iogurte grego natural',
    },
    images: {
      cafe:         AI('tapioca'),
      lanche_manha: AI('vitamina'),
      almoco:       AI('frango-arroz'),
      lanche:       AI('maca-castanhas'),
      janta:        AI('sopa'),
      ceia:         AI('iogurte'),
    },
    calories: 1540, protein: 106,
  },
  {
    day: 'Quinta', emoji: '🐟', surf: false,
    meals: {
      cafe:         '2 ovos mexidos + ½ mamão médio + 1 col. chá chia + café preto',
      lanche_manha: '150g iogurte grego + ½ xíc. frutas vermelhas (morango, mirtilo)',
      almoco:       '150g peixe (tilápia/atum) assado + 1 batata doce média + 1 xíc. vagem cozida + azeite',
      lanche:       'Smoothie tropical: ½ mamão + 1 banana + 200ml água de coco + 1 col. chá chia',
      janta:        '120g frango grelhado + 1 wrap integral + 50g ricota + alface + 1 tomate',
      ceia:         'Chá + 1 quadrado (10g) chocolate 70% (opcional)',
    },
    images: {
      cafe:         AI('ovos-mexidos'),
      lanche_manha: AI('iogurte'),
      almoco:       AI('peixe'),
      lanche:       AI('vitamina'),
      janta:        AI('wrap'),
      ceia:         AI('cha'),
    },
    calories: 1565, protein: 110,
  },
  {
    day: 'Sexta', emoji: '🥑', surf: false,
    meals: {
      cafe:         'Vitamina: ½ manga + 1 banana + 1 col. chá chia + 200ml leite/água de coco + 20g mix nuts',
      lanche_manha: '2 ovos cozidos + 3 castanhas do Pará',
      almoco:       '150g frango grelhado + 4 col. sopa arroz integral + 1 abobrinha refogada + 1 cenoura',
      lanche:       'Suco verde (200ml) + 1 torrada integral com ¼ abacate amassado',
      janta:        'Omelete de 3 ovos + 1 xíc. espinafre refogado + ¼ abacate fatiado',
      ceia:         'Chá de camomila + 5 nozes',
    },
    images: {
      cafe:         AI('vitamina'),
      lanche_manha: AI('ovos-mexidos'),
      almoco:       AI('frango-arroz'),
      lanche:       AI('abacate'),
      janta:        AI('omelete'),
      ceia:         AI('cha'),
    },
    calories: 1520, protein: 98,
  },
  {
    day: 'Sábado', emoji: '🌊', surf: true,
    meals: {
      cafe:         'Bowl: 1 banana + ½ mamão + 4 col. aveia + 1 col. chia + mel + café',
      lanche_manha: '🏄‍♀️ PRÉ-SURF: 1 banana + 20g castanhas (energia para o surf!)',
      almoco:       '180g frango/alcatra grelhada + salada variada à vontade + 1 porção mandioca (100g)',
      lanche:       '½ abacate com limão + 3 castanhas do Pará + 1 col. sopa girassol',
      janta:        '150g peixe grelhado + 1 xíc. legumes variados + salada verde à vontade',
      ceia:         'Vitamina: 1 banana + 150ml leite + 1 col. chá mel (recuperação pós-surf)',
    },
    images: {
      cafe:         AI('bowl-frutas'),
      lanche_manha: AI('maca-castanhas'),
      almoco:       AI('frango-arroz'),
      lanche:       AI('abacate'),
      janta:        AI('peixe'),
      ceia:         AI('vitamina'),
    },
    calories: 1620, protein: 115,
  },
  {
    day: 'Domingo', emoji: '🌸', surf: true,
    meals: {
      cafe:         '2 ovos mexidos + 30g queijo + ½ mamão + café + 5 nozes',
      lanche_manha: '🏄‍♀️ PRÉ-SURF: 150g iogurte grego + 1 banana (energia + proteína)',
      almoco:       '150g frango assado + 3 col. sopa arroz integral + 1 xíc. brócolis + 1 cenoura',
      lanche:       'Suco verde (200ml) + 2 castanhas do Pará',
      janta:        '2 tapiocas (30g goma cada) recheadas com 100g frango desfiado + 50g ricota',
      ceia:         'Chá relaxante + 20g castanhas variadas',
    },
    images: {
      cafe:         AI('ovos-mexidos'),
      lanche_manha: AI('iogurte'),
      almoco:       AI('frango-arroz'),
      lanche:       AI('vitamina'),
      janta:        AI('tapioca'),
      ceia:         AI('cha'),
    },
    calories: 1555, protein: 107,
  },
];

// Luiz's menu — ~2.100 kcal/dia, ~155g proteína, foco em massa + definição
const MENU_LUIZ = [
  {
    day: 'Segunda', emoji: '💪', surf: false,
    meals: {
      cafe:         '3 ovos mexidos + 2 fatias pão integral + 1 banana + 30g whey (opcional) + café',
      lanche_manha: '40g mix castanhas + 1 maçã + 1 col. sopa pasta de amendoim',
      almoco:       '200g frango grelhado + 5 col. sopa arroz integral + 1 xíc. brócolis + feijão (4 col.) + azeite',
      lanche:       '200g iogurte grego + 1 banana + 4 col. sopa aveia + mel',
      janta:        'Omelete de 4 ovos + espinafre + tomate + 1 fatia pão integral',
      ceia:         'Coalhada ou iogurte grego (200g) + 5 amêndoas',
    },
    images: {
      cafe:         AI('ovos-mexidos'),
      lanche_manha: AI('iogurte'),
      almoco:       AI('frango-arroz'),
      lanche:       AI('iogurte'),
      janta:        AI('omelete'),
      ceia:         AI('iogurte'),
    },
    calories: 2100, protein: 155,
  },
  {
    day: 'Terça', emoji: '🌿', surf: false,
    meals: {
      cafe:         'Vitamina: 2 bananas + 30g aveia + leite + 3 ovos mexidos + café',
      lanche_manha: '1 batata doce cozida (200g) + 30g whey ou 150g frango desfiado',
      almoco:       '200g carne bovina magra + 5 col. sopa arroz integral + 1 batata doce + salada',
      lanche:       '200g iogurte grego + 30g granola + frutas vermelhas + mel',
      janta:        '180g frango grelhado + 4 col. sopa arroz + 1 xíc. legumes refogados',
      ceia:         'Iogurte grego (150g) + 5 nozes',
    },
    images: {
      cafe:         AI('vitamina'),
      lanche_manha: AI('frango-arroz'),
      almoco:       AI('frango-arroz'),
      lanche:       AI('iogurte'),
      janta:        AI('frango-arroz'),
      ceia:         AI('iogurte'),
    },
    calories: 2150, protein: 158,
  },
  {
    day: 'Quarta', emoji: '🍳', surf: false,
    meals: {
      cafe:         '4 ovos mexidos com queijo + 2 fatias pão integral + mamão + café',
      lanche_manha: '30g mix de nuts + 1 banana + 1 col. sopa pasta amendoim',
      almoco:       '200g frango + 4 col. arroz integral + 4 col. feijão + salada completa + azeite',
      lanche:       'Smoothie: 2 bananas + 30g aveia + leite ou água de coco + mel',
      janta:        'Sopa proteica: 200g frango + legumes + batata doce + caldo',
      ceia:         '3 ovos cozidos + 3 castanhas do Pará',
    },
    images: {
      cafe:         AI('ovos-mexidos'),
      lanche_manha: AI('iogurte'),
      almoco:       AI('frango-arroz'),
      lanche:       AI('vitamina'),
      janta:        AI('sopa'),
      ceia:         AI('ovos-mexidos'),
    },
    calories: 2080, protein: 152,
  },
  {
    day: 'Quinta', emoji: '🐟', surf: false,
    meals: {
      cafe:         '3 ovos + 2 fatias pão integral + 1 banana + café preto',
      lanche_manha: '200g iogurte grego + 1 banana + 30g aveia + canela',
      almoco:       '200g peixe (atum/salmão) assado + 1 batata doce grande + 1 xíc. vagem + azeite',
      lanche:       '2 tapiocas com frango desfiado (100g) + ricota + legumes',
      janta:        '180g frango grelhado + salada completa + 2 fatias pão integral',
      ceia:         'Iogurte grego (150g) + mel + 5 amêndoas',
    },
    images: {
      cafe:         AI('ovos-mexidos'),
      lanche_manha: AI('iogurte'),
      almoco:       AI('peixe'),
      lanche:       AI('tapioca'),
      janta:        AI('frango-arroz'),
      ceia:         AI('iogurte'),
    },
    calories: 2090, protein: 160,
  },
  {
    day: 'Sexta', emoji: '🥩', surf: false,
    meals: {
      cafe:         'Vitamina: 2 bananas + leite + 30g aveia + 3 ovos mexidos + café',
      lanche_manha: '2 ovos cozidos + 40g castanhas variadas + 1 maçã',
      almoco:       '220g carne magra grelhada + 5 col. arroz integral + salada + feijão',
      lanche:       'Batata doce assada (200g) + 100g frango desfiado + azeite',
      janta:        'Omelete de 4 ovos + espinafre + cogumelos + 1 fatia pão integral',
      ceia:         '200g iogurte grego + 1 col. mel + nozes',
    },
    images: {
      cafe:         AI('vitamina'),
      lanche_manha: AI('ovos-mexidos'),
      almoco:       AI('frango-arroz'),
      lanche:       AI('frango-arroz'),
      janta:        AI('omelete'),
      ceia:         AI('iogurte'),
    },
    calories: 2120, protein: 156,
  },
  {
    day: 'Sábado', emoji: '🌊', surf: true,
    meals: {
      cafe:         'Bowl: 2 bananas + mamão + 5 col. aveia + chia + mel + café + whey opcional',
      lanche_manha: '🏄‍♀️ PRÉ-SURF: 2 bananas + 40g castanhas (muita energia pro surf!)',
      almoco:       '250g frango/alcatra grelhada + salada à vontade + mandioca (150g) + azeite',
      lanche:       'Vitamina pós-surf: 2 bananas + leite + 30g aveia + mel',
      janta:        '200g peixe grelhado + 4 col. arroz integral + legumes + salada',
      ceia:         'Sanduíche integral: 2 fatias pão + frango (80g) + queijo + alface',
    },
    images: {
      cafe:         AI('bowl-frutas'),
      lanche_manha: AI('bowl-frutas'),
      almoco:       AI('frango-arroz'),
      lanche:       AI('vitamina'),
      janta:        AI('peixe'),
      ceia:         AI('frango-arroz'),
    },
    calories: 2200, protein: 162,
  },
  {
    day: 'Domingo', emoji: '🌸', surf: true,
    meals: {
      cafe:         '4 ovos mexidos + queijo + mamão + pão integral (2 fatias) + café',
      lanche_manha: '🏄‍♀️ PRÉ-SURF: 200g iogurte grego + 2 bananas (proteína + energia)',
      almoco:       '220g frango assado + 5 col. arroz integral + brócolis + feijão + cenoura',
      lanche:       'Vitamina: manga + banana + leite + aveia + mel',
      janta:        '3 tapiocas (30g goma cada) com 150g frango desfiado + ricota + legumes',
      ceia:         '200g iogurte grego + mel + 10g cacau em pó',
    },
    images: {
      cafe:         AI('ovos-mexidos'),
      lanche_manha: AI('iogurte'),
      almoco:       AI('frango-arroz'),
      lanche:       AI('vitamina'),
      janta:        AI('tapioca'),
      ceia:         AI('iogurte'),
    },
    calories: 2130, protein: 158,
  },
];

const mealLabels: Record<string, { label: string; time: string }> = {
  cafe:         { label: '☀️ Café da Manhã',   time: '07:00' },
  lanche_manha: { label: '🍎 Lanche da Manhã', time: '10:00' },
  almoco:       { label: '🌞 Almoço',           time: '12:30' },
  lanche:       { label: '🍊 Lanche da Tarde',  time: '16:00 – 17:00' },
  janta:        { label: '🌙 Jantar',           time: '19:00 – 20:00' },
  ceia:         { label: '🌛 Ceia (opcional)',  time: '21:00 – 22:00' },
};

const TIFFANY = '#00b4b4';

export default function WeeklyMenu() {
  const [profile, setProfile] = useState<'roberta' | 'luiz'>('roberta');
  const menu = profile === 'roberta' ? MENU : MENU_LUIZ;
  const subtitle = profile === 'roberta'
    ? '🌸 Roberta • ~1.500 kcal/dia • foco: secar + definição'
    : '🌊 Luiz • ~2.100 kcal/dia • foco: massa + definição';

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-black mb-1"
        style={{ color: TIFFANY, fontFamily: 'Raleway, sans-serif', letterSpacing: '1px' }}>
        📅 CARDÁPIO DA SEMANA
      </h2>
      <p className="text-sm text-gray-400 mb-4">{subtitle}</p>

      {/* Profile selector */}
      <div className="flex gap-2 mb-5">
        <button onClick={() => setProfile('roberta')}
          className="flex-1 py-2.5 rounded-xl text-sm font-black transition-all"
          style={profile === 'roberta'
            ? { background: 'linear-gradient(135deg,#f472b6,#ec4899)', color: 'white' }
            : { background: '#f3f4f6', color: '#9ca3af' }}>
          🌸 Roberta
        </button>
        <button onClick={() => setProfile('luiz')}
          className="flex-1 py-2.5 rounded-xl text-sm font-black transition-all"
          style={profile === 'luiz'
            ? { background: 'linear-gradient(135deg,#60a5fa,#3b82f6)', color: 'white' }
            : { background: '#f3f4f6', color: '#9ca3af' }}>
          🌊 Luiz
        </button>
      </div>

      <div className="space-y-3">
        {menu.map(day => (
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

            <div className="px-4 pb-4" style={{ borderTop: '1px solid #e0fafa' }}>
              {Object.entries(day.meals).map(([key, value]) => (
                <div key={key} className="py-3 border-b last:border-0 flex gap-3 items-center"
                  style={{ borderColor: '#f0fffe' }}>
                  <img
                    src={(day.images as Record<string, string>)[key]}
                    alt={mealLabels[key]?.label}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5 gap-2">
                      <p className="text-xs font-black shrink-0" style={{ color: TIFFANY, letterSpacing: '0.5px' }}>
                        {mealLabels[key]?.label}
                      </p>
                      <span className="text-xs text-gray-400 shrink-0">🕐 {mealLabels[key]?.time}</span>
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
