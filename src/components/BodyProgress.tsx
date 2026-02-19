import { useState, useRef } from 'react';

interface ProgressPhoto {
  id: string;
  date: string;
  week: number;
  label: string;
  front?: string;
  side?: string;
  note?: string;
}

type Profile = 'roberta' | 'luiz';

const SUGGESTED_WEEKS = [
  { week: 1,  label: 'Semana 1 — Antes', tip: 'Foto inicial de referência' },
  { week: 4,  label: 'Semana 4 — 1 mês', tip: 'Primeiras mudanças visíveis' },
  { week: 8,  label: 'Semana 8 — 2 meses', tip: 'Evolução consistente' },
  { week: 12, label: 'Semana 12 — 3 meses', tip: 'Transformação completa! 🔥' },
];

const PROFILE_COLORS = {
  roberta: { main: '#ec4899', light: '#fdf2f8', badge: '#fce7f3', text: 'text-pink-500' },
  luiz:    { main: '#3b82f6', light: '#eff6ff', badge: '#dbeafe', text: 'text-blue-500' },
};

export default function BodyProgress() {
  const [activeProfile, setActiveProfile] = useState<Profile>('roberta');
  const [photos, setPhotos] = useState<Record<Profile, ProgressPhoto[]>>({
    roberta: [],
    luiz: [],
  });
  const [adding, setAdding] = useState(false);
  const [newWeek, setNewWeek] = useState(1);
  const [newNote, setNewNote] = useState('');
  const [pendingFront, setPendingFront] = useState<string | null>(null);
  const [pendingSide, setPendingSide] = useState<string | null>(null);
  const [compare, setCompare] = useState<[string, string] | null>(null);

  const frontRef = useRef<HTMLInputElement>(null);
  const sideRef = useRef<HTMLInputElement>(null);

  const c = PROFILE_COLORS[activeProfile];
  const myPhotos = photos[activeProfile];

  const readFile = (file: File): Promise<string> =>
    new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target!.result as string);
      reader.readAsDataURL(file);
    });

  const addEntry = () => {
    if (!pendingFront && !pendingSide) return;
    const suggested = SUGGESTED_WEEKS.find(s => s.week === newWeek);
    const entry: ProgressPhoto = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      week: newWeek,
      label: suggested?.label ?? `Semana ${newWeek}`,
      front: pendingFront ?? undefined,
      side: pendingSide ?? undefined,
      note: newNote || undefined,
    };
    setPhotos(prev => ({
      ...prev,
      [activeProfile]: [...prev[activeProfile], entry].sort((a, b) => a.week - b.week),
    }));
    setPendingFront(null);
    setPendingSide(null);
    setNewNote('');
    setAdding(false);
  };

  const remove = (id: string) => {
    setPhotos(prev => ({
      ...prev,
      [activeProfile]: prev[activeProfile].filter(p => p.id !== id),
    }));
  };

  const nextWeek = () => {
    const existing = myPhotos.map(p => p.week);
    for (const sw of SUGGESTED_WEEKS) {
      if (!existing.includes(sw.week)) return sw.week;
    }
    return (myPhotos[myPhotos.length - 1]?.week ?? 0) + 4;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-black mb-1" style={{ color: '#00b4b4', fontFamily: 'Raleway, sans-serif', letterSpacing: '1px' }}>
        📷 EVOLUÇÃO DO CORPO
      </h2>
      <p className="text-sm text-gray-400 mb-5">Registre sua transformação semana a semana</p>

      {/* Profile selector */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setActiveProfile('roberta')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all ${activeProfile === 'roberta' ? 'text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}
          style={activeProfile === 'roberta' ? { background: 'linear-gradient(135deg,#f472b6,#ec4899)' } : {}}>
          🌸 Roberta
        </button>
        <button onClick={() => setActiveProfile('luiz')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all ${activeProfile === 'luiz' ? 'text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}
          style={activeProfile === 'luiz' ? { background: 'linear-gradient(135deg,#60a5fa,#3b82f6)' } : {}}>
          🌊 Luiz
        </button>
      </div>

      {/* Timeline guide */}
      <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
        {SUGGESTED_WEEKS.map(sw => {
          const done = myPhotos.some(p => p.week === sw.week);
          return (
            <div key={sw.week} className={`flex flex-col items-center rounded-xl px-3 py-2 shrink-0 text-center transition-all ${done ? 'text-white shadow-md' : 'bg-gray-50'}`}
              style={done ? { background: c.main } : { border: `1.5px dashed ${c.main}` }}>
              <span className="text-lg">{done ? '✅' : '📸'}</span>
              <p className="text-xs font-black mt-0.5" style={{ color: done ? 'white' : c.main }}>Sem {sw.week}</p>
              <p className="text-xs" style={{ color: done ? 'rgba(255,255,255,0.8)' : '#9ca3af' }}>{done ? 'Feito!' : sw.tip}</p>
            </div>
          );
        })}
      </div>

      {/* Photo entries */}
      <div className="space-y-4 mb-4">
        {myPhotos.length === 0 && (
          <div className="text-center py-10" style={{ background: c.light, borderRadius: '16px' }}>
            <p className="text-4xl mb-3">📸</p>
            <p className="font-bold text-gray-600">Nenhuma foto ainda</p>
            <p className="text-sm text-gray-400 mt-1">Adicione a foto inicial (Semana 1) para começar!</p>
          </div>
        )}

        {myPhotos.map((entry, idx) => (
          <div key={entry.id} className="rounded-2xl overflow-hidden shadow-sm" style={{ border: `2px solid ${c.main}22` }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3"
              style={{ background: `linear-gradient(90deg, ${c.light}, white)` }}>
              <div>
                <p className="font-black" style={{ color: c.main, fontFamily: 'Raleway, sans-serif' }}>{entry.label}</p>
                <p className="text-xs text-gray-400">📅 {entry.date}</p>
              </div>
              <div className="flex items-center gap-2">
                {idx > 0 && (
                  <button
                    onClick={() => setCompare(compare ? null : [myPhotos[0].id, entry.id])}
                    className="text-xs px-3 py-1.5 rounded-lg font-bold transition-all"
                    style={compare?.[1] === entry.id
                      ? { background: c.main, color: 'white' }
                      : { background: c.badge, color: c.main }}>
                    🔍 Comparar
                  </button>
                )}
                <button onClick={() => remove(entry.id)} className="text-red-300 hover:text-red-500 text-xl leading-none">×</button>
              </div>
            </div>

            {/* Photos */}
            <div className="grid grid-cols-2 gap-1 p-1">
              {entry.front && (
                <div className="relative">
                  <img src={entry.front} className="w-full h-52 object-cover rounded-xl" alt="frente" />
                  <span className="absolute bottom-2 left-2 text-xs font-bold text-white bg-black/50 px-2 py-0.5 rounded-full">FRENTE</span>
                </div>
              )}
              {entry.side && (
                <div className="relative">
                  <img src={entry.side} className="w-full h-52 object-cover rounded-xl" alt="perfil" />
                  <span className="absolute bottom-2 left-2 text-xs font-bold text-white bg-black/50 px-2 py-0.5 rounded-full">PERFIL</span>
                </div>
              )}
            </div>

            {entry.note && (
              <p className="px-4 py-2 text-sm text-gray-500 italic">💬 {entry.note}</p>
            )}
          </div>
        ))}
      </div>

      {/* Compare view */}
      {compare && myPhotos.length >= 2 && (() => {
        const p1 = myPhotos.find(p => p.id === compare[0]);
        const p2 = myPhotos.find(p => p.id === compare[1]);
        if (!p1 || !p2) return null;
        return (
          <div className="rounded-2xl p-4 mb-4" style={{ background: c.light, border: `2px solid ${c.main}33` }}>
            <p className="font-black text-center mb-3" style={{ color: c.main }}>🔍 ANTES × DEPOIS</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-bold text-center text-gray-500 mb-1">{p1.label}</p>
                {p1.front && <img src={p1.front} className="w-full h-48 object-cover rounded-xl" alt="antes" />}
              </div>
              <div>
                <p className="text-xs font-bold text-center mb-1" style={{ color: c.main }}>{p2.label}</p>
                {p2.front && <img src={p2.front} className="w-full h-48 object-cover rounded-xl" alt="depois" />}
              </div>
            </div>
            <button onClick={() => setCompare(null)} className="w-full mt-3 text-sm text-gray-400 py-1">Fechar</button>
          </div>
        );
      })()}

      {/* Add button / form */}
      {!adding ? (
        <button onClick={() => { setAdding(true); setNewWeek(nextWeek()); }}
          className="w-full border-2 border-dashed py-4 rounded-2xl text-sm font-bold transition-all hover:opacity-80"
          style={{ borderColor: c.main, color: c.main, background: c.light }}>
          + Adicionar Foto de Evolução
        </button>
      ) : (
        <div className="rounded-2xl p-4 space-y-4" style={{ background: c.light, border: `2px solid ${c.main}33` }}>
          <p className="font-black text-center" style={{ color: c.main }}>📸 Nova Foto</p>

          {/* Week selector */}
          <div>
            <p className="text-xs font-bold text-gray-500 mb-2">Semana</p>
            <div className="flex gap-2 flex-wrap">
              {SUGGESTED_WEEKS.map(sw => (
                <button key={sw.week} onClick={() => setNewWeek(sw.week)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all`}
                  style={newWeek === sw.week
                    ? { background: c.main, color: 'white' }
                    : { background: 'white', color: c.main, border: `1.5px solid ${c.main}` }}>
                  Sem {sw.week}
                </button>
              ))}
            </div>
          </div>

          {/* Front photo */}
          <div>
            <p className="text-xs font-bold text-gray-500 mb-2">📷 Foto Frontal</p>
            {pendingFront
              ? <div className="relative">
                  <img src={pendingFront} className="w-full h-40 object-cover rounded-xl" alt="frente" />
                  <button onClick={() => setPendingFront(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 text-sm font-bold">×</button>
                </div>
              : <button onClick={() => frontRef.current?.click()}
                  className="w-full h-24 rounded-xl text-sm font-bold flex flex-col items-center justify-center gap-1 border-2 border-dashed"
                  style={{ borderColor: c.main, color: c.main }}>
                  <span className="text-2xl">🤳</span>
                  Tirar / Escolher foto frontal
                </button>
            }
            <input ref={frontRef} type="file" accept="image/*" className="hidden"
              onChange={async e => e.target.files?.[0] && setPendingFront(await readFile(e.target.files[0]))} />
          </div>

          {/* Side photo */}
          <div>
            <p className="text-xs font-bold text-gray-500 mb-2">📷 Foto de Perfil</p>
            {pendingSide
              ? <div className="relative">
                  <img src={pendingSide} className="w-full h-40 object-cover rounded-xl" alt="perfil" />
                  <button onClick={() => setPendingSide(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 text-sm font-bold">×</button>
                </div>
              : <button onClick={() => sideRef.current?.click()}
                  className="w-full h-24 rounded-xl text-sm font-bold flex flex-col items-center justify-center gap-1 border-2 border-dashed"
                  style={{ borderColor: c.main, color: c.main }}>
                  <span className="text-2xl">🏃‍♀️</span>
                  Tirar / Escolher foto de perfil
                </button>
            }
            <input ref={sideRef} type="file" accept="image/*" className="hidden"
              onChange={async e => e.target.files?.[0] && setPendingSide(await readFile(e.target.files[0]))} />
          </div>

          {/* Note */}
          <input placeholder="Nota (opcional) — ex: peso, medidas, como tá se sentindo..."
            value={newNote} onChange={e => setNewNote(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white" />

          <div className="flex gap-2">
            <button onClick={addEntry}
              className={`flex-1 py-3 rounded-xl text-white text-sm font-black shadow-md ${!pendingFront && !pendingSide ? 'opacity-40' : ''}`}
              style={{ background: c.main }} disabled={!pendingFront && !pendingSide}>
              ✅ Salvar Foto
            </button>
            <button onClick={() => { setAdding(false); setPendingFront(null); setPendingSide(null); }}
              className="px-4 bg-gray-200 text-gray-600 rounded-xl text-sm font-bold">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
