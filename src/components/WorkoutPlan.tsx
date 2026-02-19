const WORKOUTS = {
  roberta: {
    name: 'Roberta',
    goal: 'Secar barriga + definição',
    weekly: [
      {
        day: 'Segunda',
        type: '💪 Força — Core & Abdômen',
        duration: '40 min',
        exercises: [
          { name: 'Prancha', sets: '4x45s', tip: 'Mantém o quadril reto' },
          { name: 'Abdominal bicicleta', sets: '3x20', tip: 'Cotovelo toca o joelho oposto' },
          { name: 'Agachamento', sets: '4x15', tip: 'Joelhos não passam dos pés' },
          { name: 'Elevação de pernas', sets: '3x15', tip: 'Deitada, costas no chão' },
          { name: 'Russian twist', sets: '3x20', tip: 'Pode segurar peso' },
          { name: 'Glute bridge', sets: '3x15', tip: 'Aperta o glúteo no topo' },
        ],
        calories: 220,
      },
      {
        day: 'Terça',
        type: '🌊 Surf ou Natação',
        duration: '60+ min',
        exercises: [
          { name: 'Aquecimento na beira', sets: '5 min', tip: 'Rotação de ombros e quadril' },
          { name: 'Sessão de surf', sets: '45-60 min', tip: 'Foca no take-off e equilíbrio' },
          { name: 'Remada', sets: 'durante a sessão', tip: 'Ótimo treino de braço e core' },
        ],
        calories: 350,
      },
      {
        day: 'Quarta',
        type: '🏃‍♀️ Cardio + HIIT',
        duration: '35 min',
        exercises: [
          { name: 'Caminhada aquecimento', sets: '5 min', tip: 'Ritmo moderado' },
          { name: 'HIIT: 30s corrida / 30s caminhada', sets: '10 ciclos', tip: 'Máxima intensidade na corrida' },
          { name: 'Burpees', sets: '3x10', tip: 'Descanso 60s entre séries' },
          { name: 'Mountain climbers', sets: '3x30s', tip: 'Core ativado' },
          { name: 'Jump squat', sets: '3x12', tip: 'Aterrissa com joelhos suaves' },
        ],
        calories: 280,
      },
      {
        day: 'Quinta',
        type: '🧘‍♀️ Descanso ativo / Yoga',
        duration: '30 min',
        exercises: [
          { name: 'Alongamento completo', sets: '15 min', tip: 'Foca em quadril e lombar' },
          { name: 'Yoga básico ou pilates', sets: '15 min', tip: 'YouTube tem aulas gratuitas' },
        ],
        calories: 80,
      },
      {
        day: 'Sexta',
        type: '💪 Força — Membros Inferiores',
        duration: '40 min',
        exercises: [
          { name: 'Agachamento sumô', sets: '4x15', tip: 'Pés mais abertos, trabalha interno coxa' },
          { name: 'Levantamento terra romeno', sets: '3x12', tip: 'Foca no alongamento do posterior' },
          { name: 'Avanço (lunge)', sets: '3x12 cada perna', tip: 'Joelho traseiro quase toca o chão' },
          { name: 'Panturrilha em pé', sets: '4x20', tip: 'Pausa no topo' },
          { name: 'Prancha lateral', sets: '3x30s cada lado', tip: 'Mantém quadril levantado' },
        ],
        calories: 240,
      },
      {
        day: 'Sábado',
        type: '🌊 Surf + Praia',
        duration: '90+ min',
        exercises: [
          { name: 'Surf livre', sets: 'à vontade', tip: 'Aproveita o dia — é treino e lazer!' },
          { name: 'Caminhada na areia mole', sets: '20-30 min', tip: 'Areia mole queima 2x mais' },
        ],
        calories: 450,
      },
      {
        day: 'Domingo',
        type: '😴 Descanso total',
        duration: 'livre',
        exercises: [
          { name: 'Recuperação', sets: '—', tip: 'Corpo precisa descansar pra crescer!' },
          { name: 'Hidratação reforçada', sets: '3L+', tip: 'Principalmente se teve sol' },
        ],
        calories: 0,
      },
    ],
    weeklyBurn: 1620,
    tips: [
      '🌊 Surf conta como treino completo — core, braços e equilíbrio',
      '🍌 Come banana ou batata doce 1h antes do treino',
      '🥚 Come proteína em até 30min após treinar',
      '💧 2,5L de água por dia mínimo',
      '😴 7-8h de sono — essencial pra secar barriga!',
    ],
  },
  luiz: {
    name: 'Luiz',
    goal: 'Ganhar massa + definição',
    weekly: [
      {
        day: 'Segunda',
        type: '💪 Peito + Tríceps',
        duration: '50 min',
        exercises: [
          { name: 'Flexão de braço', sets: '4x15', tip: 'Progressivo: normal → declinado → diamante' },
          { name: 'Supino (peso corporal/halteres)', sets: '4x12', tip: 'Descida controlada' },
          { name: 'Tríceps banco', sets: '3x15', tip: 'Costas coladas no banco' },
          { name: 'Prancha com rotação', sets: '3x10 cada', tip: 'Core + ombros' },
        ],
        calories: 270,
      },
      {
        day: 'Terça',
        type: '🌊 Surf',
        duration: '60+ min',
        exercises: [
          { name: 'Sessão de surf', sets: 'livre', tip: 'Surf ativa todo o corpo' },
        ],
        calories: 400,
      },
      {
        day: 'Quarta',
        type: '💪 Costas + Bíceps',
        duration: '50 min',
        exercises: [
          { name: 'Remada curvada', sets: '4x12', tip: 'Puxa o cotovelo pra trás' },
          { name: 'Barra fixa ou elástico', sets: '4x8', tip: 'Progressivo' },
          { name: 'Rosca direta', sets: '3x12', tip: 'Sem balançar' },
          { name: 'Puxada alta', sets: '3x12', tip: 'Puxar até o queixo' },
        ],
        calories: 280,
      },
      {
        day: 'Quinta',
        type: '🏃‍♂️ HIIT + Core',
        duration: '35 min',
        exercises: [
          { name: 'HIIT corrida/bicicleta', sets: '20 min', tip: '30s máximo / 30s descanso' },
          { name: 'Prancha', sets: '4x45s', tip: '' },
          { name: 'Abdominal', sets: '3x20', tip: '' },
        ],
        calories: 300,
      },
      {
        day: 'Sexta',
        type: '💪 Pernas + Ombros',
        duration: '50 min',
        exercises: [
          { name: 'Agachamento', sets: '4x15', tip: '' },
          { name: 'Levantamento terra', sets: '3x12', tip: '' },
          { name: 'Desenvolvimento (halteres)', sets: '4x12', tip: 'Ombros' },
          { name: 'Elevação lateral', sets: '3x15', tip: '' },
        ],
        calories: 300,
      },
      {
        day: 'Sábado',
        type: '🌊 Surf + Cardio',
        duration: '90+ min',
        exercises: [
          { name: 'Surf livre', sets: 'à vontade', tip: '' },
          { name: 'Corrida areia mole', sets: '20 min', tip: '' },
        ],
        calories: 500,
      },
      {
        day: 'Domingo',
        type: '😴 Descanso',
        duration: 'livre',
        exercises: [{ name: 'Recuperação total', sets: '—', tip: 'Músculos crescem no descanso!' }],
        calories: 0,
      },
    ],
    weeklyBurn: 2050,
    tips: [
      '🍗 Proteína alta — 130g+/dia para ganhar massa',
      '🌊 Surf é cardio e força ao mesmo tempo',
      '💤 Sono é quando os músculos crescem',
      '🥑 Gorduras boas são aliadas da testosterona',
      '📈 Progressão: aumente carga/repetições toda semana',
    ],
  },
};

export default function WorkoutPlan() {
  const [profile, setProfile] = useState<'roberta' | 'luiz'>('roberta');
  const plan = WORKOUTS[profile];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        🏋️ Plano de Treino
      </h2>

      {/* Profile toggle */}
      <div className="flex gap-2 mb-5">
        {(['roberta', 'luiz'] as const).map(p => (
          <button
            key={p}
            onClick={() => setProfile(p)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              profile === p
                ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-md'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {WORKOUTS[p].name}
          </button>
        ))}
      </div>

      {/* Goal badge */}
      <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 mb-5 flex items-center gap-2">
        <span>🎯</span>
        <span className="text-sm text-orange-700 font-medium">{plan.goal}</span>
        <span className="ml-auto text-xs text-orange-400">~{plan.weeklyBurn} kcal/semana</span>
      </div>

      {/* Weekly schedule */}
      <div className="space-y-2 mb-6">
        {plan.weekly.map(day => (
          <details key={day.day} className="group border border-gray-100 rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-orange-50 list-none transition-colors">
              <div>
                <span className="font-semibold text-gray-800 mr-2">{day.day}</span>
                <span className="text-sm text-gray-500">{day.type}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-gray-400">{day.duration}</span>
                {day.calories > 0 && (
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                    -{day.calories} kcal
                  </span>
                )}
                <span className="text-gray-300 group-open:rotate-180 transition-transform text-xs">▼</span>
              </div>
            </summary>
            <div className="px-4 pb-4 border-t border-gray-50 space-y-2 pt-3">
              {day.exercises.map((ex, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-orange-400 font-bold text-sm w-4 shrink-0">{i + 1}.</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{ex.name}</span>
                      <span className="text-xs text-gray-400 ml-2">{ex.sets}</span>
                    </div>
                    {ex.tip && <p className="text-xs text-gray-400 mt-0.5">💡 {ex.tip}</p>}
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>

      {/* Tips */}
      <div>
        <p className="text-sm font-bold text-gray-700 mb-3">⚡ Dicas importantes:</p>
        <div className="space-y-2">
          {plan.tips.map((tip, i) => (
            <div key={i} className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl px-4 py-2.5">
              <p className="text-sm text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
