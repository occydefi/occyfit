import { useState } from 'react';

interface Exercise {
  name: string;
  sets: string;
  rest?: string;
  weight?: string;
  tip: string;
}

const WORKOUTS = {
  roberta: {
    name: 'Roberta',
    goal: 'Secar barriga + definição',
    weekly: [
      {
        day: 'Segunda', type: '💪 Força — Core & Abdômen', duration: '40 min',
        exercises: [
          { name: 'Prancha', sets: '4 x 45s', rest: '30s', weight: 'Peso do corpo', tip: 'Mantém o quadril reto, respira' },
          { name: 'Abdominal bicicleta', sets: '3 x 20 rep', rest: '30s', weight: 'Peso do corpo', tip: 'Cotovelo toca o joelho oposto devagar' },
          { name: 'Agachamento', sets: '4 x 15 rep', rest: '45s', weight: 'Sem peso ou 5-8kg', tip: 'Joelhos não passam dos pés, senta fundo' },
          { name: 'Elevação de pernas', sets: '3 x 15 rep', rest: '30s', weight: 'Peso do corpo', tip: 'Deitada, costas no chão, lombar colada' },
          { name: 'Torção russa', sets: '3 x 20 rep', rest: '30s', weight: '2-4kg (garrafa d\'água)', tip: 'Segura peso, roda de lado a lado devagar' },
          { name: 'Ponte de glúteo', sets: '3 x 15 rep', rest: '30s', weight: 'Peso do corpo ou 10kg', tip: 'Aperta o glúteo forte no topo, segura 2s' },
        ] as Exercise[],
        calories: 220,
      },
      {
        day: 'Terça', type: '🌊 Surf ou Natação', duration: '60+ min',
        exercises: [
          { name: 'Aquecimento na beira', sets: '5 min', tip: 'Rotação de ombros e quadril antes de entrar' },
          { name: 'Sessão de surf', sets: '45–60 min', rest: 'conforme o mar', tip: 'Foca no take-off e equilíbrio. Cada remada é treino de braço!' },
          { name: 'Alongamento pós-surf', sets: '10 min', tip: 'Foca em ombros, quadril e coluna' },
        ] as Exercise[],
        calories: 350,
      },
      {
        day: 'Quarta', type: '🏃‍♀️ Cardio + HIIT', duration: '35 min',
        exercises: [
          { name: 'Caminhada aquecimento', sets: '5 min', tip: 'Ritmo moderado, aquece as pernas' },
          { name: 'HIIT: corrida / caminhada', sets: '10 ciclos', rest: '—', weight: '30s corrida + 30s caminhada', tip: 'Máxima intensidade na corrida. Total: 10 minutos' },
          { name: 'Burpees', sets: '3 x 10 rep', rest: '60s', weight: 'Peso do corpo', tip: 'Desce, faz flexão, salta em pé. Descanso generoso!' },
          { name: 'Escaladores', sets: '3 x 30s', rest: '30s', weight: 'Peso do corpo', tip: 'Posição de flexão, traz joelhos alternados. Core firme' },
          { name: 'Agachamento com salto', sets: '3 x 12 rep', rest: '45s', weight: 'Peso do corpo', tip: 'Agacha fundo, salta alto. Aterrissa suave com joelhos dobrados' },
        ] as Exercise[],
        calories: 280,
      },
      {
        day: 'Quinta', type: '🧘‍♀️ Descanso ativo / Yoga', duration: '30 min',
        exercises: [
          { name: 'Alongamento completo', sets: '15 min', tip: 'Foca em quadril, lombar e ombros. Respira fundo' },
          { name: 'Yoga ou pilates leve', sets: '15 min', tip: 'YouTube: canal "Yoga com Adriene" (gratuito, tem em pt-BR!)' },
        ] as Exercise[],
        calories: 80,
      },
      {
        day: 'Sexta', type: '🍑 Força — Glúteos & Pernas', duration: '45 min',
        exercises: [
          { name: 'Agachamento sumô', sets: '4 x 15 rep', rest: '45s', weight: '8-12kg ou sem peso', tip: 'Pés mais abertos, pontas pra fora. Trabalha interno da coxa' },
          { name: 'Levantamento terra romeno', sets: '3 x 12 rep', rest: '45s', weight: '8-12kg (halter)', tip: 'Desce devagar sentindo o posterior. Costas retas!' },
          { name: 'Avanço (cada perna)', sets: '3 x 12 rep por perna', rest: '45s', weight: 'Sem peso ou 4-6kg', tip: 'Joelho traseiro quase toca o chão. Tronco reto' },
          { name: 'Elevação de calcanhar', sets: '4 x 20 rep', rest: '30s', weight: 'Peso do corpo', tip: 'Sobe na ponta do pé, pausa no topo, desce devagar' },
          { name: 'Prancha lateral', sets: '3 x 30s cada lado', rest: '30s', weight: 'Peso do corpo', tip: 'Quadril levantado, corpo reto. Não deixa cair!' },
          { name: 'Glúteo no cross (4 apoios)', sets: '3 x 15 rep cada lado', rest: '30s', weight: 'Peso do corpo', tip: 'Joelho dobrado 90°, empurra o calcanhar pro teto' },
        ] as Exercise[],
        calories: 250,
      },
      {
        day: 'Sábado', type: '🌊 Surf livre', duration: 'À vontade',
        exercises: [
          { name: 'Surf livre', sets: 'à vontade', tip: 'Aproveita o dia — é treino e lazer ao mesmo tempo! 🌺' },
        ] as Exercise[],
        calories: 400,
      },
      {
        day: 'Domingo', type: '😴 Descanso total', duration: '—',
        exercises: [
          { name: 'Descanso ativo leve', sets: 'opcional', tip: 'Caminhada leve na praia ou alongamento. Seu corpo precisa recuperar!' },
        ] as Exercise[],
        calories: 0,
      },
    ],
  },
  luiz: {
    name: 'Luiz',
    goal: 'Ganhar massa + definição',
    weekly: [
      {
        day: 'Segunda', type: '💪 Peito + Tríceps', duration: '50 min',
        exercises: [
          { name: 'Supino reto (halter ou barra)', sets: '4 x 10 rep', rest: '60s', weight: '20-30kg', tip: 'Desce controlado, sobe com força. Escápulas no banco' },
          { name: 'Supino inclinado', sets: '3 x 12 rep', rest: '60s', weight: '16-24kg', tip: 'Trabalha a parte superior do peito' },
          { name: 'Crucifixo', sets: '3 x 12 rep', rest: '45s', weight: '8-12kg cada braço', tip: 'Abre bem o peito. Leve arco no cotovelo' },
          { name: 'Tríceps pulley', sets: '4 x 12 rep', rest: '45s', weight: '15-25kg', tip: 'Cotovelo fixo, desce até a extensão total' },
          { name: 'Mergulho (dip)', sets: '3 x máximo', rest: '60s', weight: 'Peso do corpo', tip: 'Se difícil, apoia o pé numa cadeira' },
          { name: 'Flexão de braço', sets: '3 x 15 rep', rest: '45s', weight: 'Peso do corpo', tip: 'Finaliza o treino. Peito e tríceps em chamas!' },
        ] as Exercise[],
        calories: 320,
      },
      {
        day: 'Terça', type: '🔙 Costas + Bíceps', duration: '50 min',
        exercises: [
          { name: 'Puxada frontal (barra/pulley)', sets: '4 x 10 rep', rest: '60s', weight: '30-50kg', tip: 'Puxa até o queixo. Escápulas juntam no fim' },
          { name: 'Remada curvada', sets: '4 x 10 rep', rest: '60s', weight: '20-35kg', tip: 'Costas paralelas ao chão. Puxa até o umbigo' },
          { name: 'Puxada neutra (triângulo)', sets: '3 x 12 rep', rest: '45s', weight: '25-40kg', tip: 'Abre bem a costas. Expande o tórax' },
          { name: 'Rosca direta (halter)', sets: '4 x 12 rep', rest: '45s', weight: '10-16kg cada', tip: 'Cotovelo fixo ao corpo. Sobe concentrado' },
          { name: 'Rosca martelo', sets: '3 x 12 rep', rest: '45s', weight: '10-16kg cada', tip: 'Trabalha o braquial. Punho neutro' },
        ] as Exercise[],
        calories: 300,
      },
      {
        day: 'Quarta', type: '🏃‍♂️ HIIT + Core', duration: '40 min',
        exercises: [
          { name: 'HIIT corrida/bicicleta', sets: '20 min', rest: '—', weight: '30s máximo / 30s descanso', tip: 'Queima gordura sem perder massa muscular' },
          { name: 'Prancha', sets: '4 x 60s', rest: '30s', weight: 'Peso do corpo', tip: 'Core de aço. Respira pelo nariz' },
          { name: 'Abdominal supra', sets: '4 x 20 rep', rest: '30s', weight: 'Peso do corpo ou disco 5kg', tip: 'Sobe até sentir o abdômen contrair. Não força o pescoço' },
          { name: 'Abdominal oblíquo', sets: '3 x 20 rep', rest: '30s', weight: 'Peso do corpo', tip: 'Cotovelo toca o joelho oposto' },
          { name: 'Torção russa com peso', sets: '3 x 20 rep', rest: '30s', weight: '5-8kg', tip: 'Pés levantados pra intensificar' },
        ] as Exercise[],
        calories: 380,
      },
      {
        day: 'Quinta', type: '🦵 Pernas + Ombros', duration: '55 min',
        exercises: [
          { name: 'Agachamento livre', sets: '4 x 10 rep', rest: '90s', weight: '40-70kg', tip: 'Rei dos exercícios! Desce abaixo do paralelo. Costas retas' },
          { name: 'Leg press', sets: '4 x 12 rep', rest: '60s', weight: '60-100kg', tip: 'Pés na largura do ombro. Joelhos não fecham' },
          { name: 'Cadeira extensora', sets: '3 x 15 rep', rest: '45s', weight: '20-40kg', tip: 'Extensão total. Segura 1s no topo' },
          { name: 'Mesa flexora', sets: '3 x 15 rep', rest: '45s', weight: '15-30kg', tip: 'Puxa devagar, preserva o posterior' },
          { name: 'Desenvolvimento de ombros', sets: '4 x 10 rep', rest: '60s', weight: '12-20kg cada', tip: 'Sobe acima da cabeça. Cotovelo não trava no topo' },
          { name: 'Elevação lateral', sets: '3 x 15 rep', rest: '45s', weight: '6-12kg cada', tip: 'Até a altura do ombro. Leve inclinação pra frente' },
        ] as Exercise[],
        calories: 420,
      },
      {
        day: 'Sexta', type: '💥 Full Body + Potência', duration: '50 min',
        exercises: [
          { name: 'Levantamento terra', sets: '4 x 8 rep', rest: '90s', weight: '40-80kg', tip: 'O melhor exercício do mundo! Costas retas, quadril empurra' },
          { name: 'Agachamento frontal', sets: '3 x 10 rep', rest: '60s', weight: '30-50kg', tip: 'Tronco mais ereto que o agachamento tradicional' },
          { name: 'Remada unilateral', sets: '3 x 12 rep cada', rest: '45s', weight: '15-25kg', tip: 'Apoio no banco. Máximo de rotação' },
          { name: 'Agachamento com salto', sets: '3 x 10 rep', rest: '60s', weight: 'Peso do corpo', tip: 'Potência! Salta o mais alto possível' },
          { name: 'Escaladores', sets: '3 x 30s', rest: '30s', weight: 'Peso do corpo', tip: 'Condicionamento e core simultâneos' },
        ] as Exercise[],
        calories: 380,
      },
      {
        day: 'Sábado', type: '🌊 Surf + Mobilidade', duration: 'À vontade',
        exercises: [
          { name: 'Surf', sets: 'à vontade', tip: 'Core, equilíbrio e adrenalina! 🏄‍♂️' },
          { name: 'Mobilidade pós-surf', sets: '10 min', tip: 'Ombros e quadril — previne lesão' },
        ] as Exercise[],
        calories: 450,
      },
      {
        day: 'Domingo', type: '😴 Descanso / Recuperação', duration: '—',
        exercises: [
          { name: 'Caminhada leve ou alongamento', sets: 'opcional', tip: 'Recuperação ativa. Músculos crescem no descanso!' },
        ] as Exercise[],
        calories: 0,
      },
    ],
  },
};

const profileColors = {
  roberta: { main: '#ec4899', grad: 'linear-gradient(135deg,#f472b6,#ec4899)', light: '#fdf2f8' },
  luiz:    { main: '#3b82f6', grad: 'linear-gradient(135deg,#60a5fa,#3b82f6)', light: '#eff6ff' },
};

export default function WorkoutPlan() {
  const [profile, setProfile] = useState<'roberta' | 'luiz'>('roberta');
  const [expanded, setExpanded] = useState<string | null>(null);
  const data = WORKOUTS[profile];
  const c = profileColors[profile];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-black mb-1" style={{ color: '#00b4b4', fontFamily: 'Raleway, sans-serif', letterSpacing: '1px' }}>
        🏋️ PLANO DE TREINO
      </h2>
      <p className="text-sm text-gray-400 mb-4">Com séries, repetições, descanso e peso sugerido</p>

      {/* Profile selector */}
      <div className="flex gap-2 mb-5">
        {(['roberta', 'luiz'] as const).map(p => (
          <button key={p} onClick={() => { setProfile(p); setExpanded(null); }}
            className="flex-1 py-2.5 rounded-xl text-sm font-black transition-all"
            style={profile === p ? { background: profileColors[p].grad, color: 'white' } : { background: '#f3f4f6', color: '#9ca3af' }}>
            {p === 'roberta' ? '🌸 Roberta' : '🌊 Luiz'}
          </button>
        ))}
      </div>

      {/* Goal badge */}
      <div className="text-center mb-5 py-2 px-4 rounded-xl text-sm font-bold"
        style={{ background: c.light, color: c.main }}>
        🎯 Meta: {data.goal}
      </div>

      {/* Weekly plan */}
      <div className="space-y-2">
        {data.weekly.map(session => (
          <div key={session.day} className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${c.main}22` }}>
            <button
              onClick={() => setExpanded(expanded === session.day ? null : session.day)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
              style={{ background: expanded === session.day ? c.light : 'white' }}>
              <div>
                <p className="font-black text-gray-800" style={{ fontFamily: 'Raleway, sans-serif' }}>{session.day}</p>
                <p className="text-xs font-semibold mt-0.5" style={{ color: c.main }}>{session.type}</p>
              </div>
              <div className="flex items-center gap-2 text-right">
                <div>
                  <p className="text-xs text-gray-400">⏱ {session.duration}</p>
                  {session.calories > 0 && <p className="text-xs font-bold text-orange-400">🔥 ~{session.calories} kcal</p>}
                </div>
                <span className="text-gray-300 transition-transform" style={{ transform: expanded === session.day ? 'rotate(180deg)' : 'none' }}>▼</span>
              </div>
            </button>

            {expanded === session.day && (
              <div className="px-4 pb-4 space-y-3" style={{ borderTop: `1px solid ${c.main}22` }}>
                {session.exercises.map((ex, i) => (
                  <div key={i} className="rounded-xl p-3" style={{ background: c.light }}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-black text-gray-800 text-sm">{ex.name}</p>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white shrink-0"
                        style={{ background: c.main }}>{ex.sets}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {ex.weight && (
                        <span className="text-xs bg-white px-2 py-0.5 rounded-full text-gray-600 border border-gray-100">
                          🏋️ {ex.weight}
                        </span>
                      )}
                      {ex.rest && (
                        <span className="text-xs bg-white px-2 py-0.5 rounded-full text-gray-600 border border-gray-100">
                          ⏸ Descanso: {ex.rest}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">💡 {ex.tip}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
