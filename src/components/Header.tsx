export default function Header() {
  return (
    <header className="relative overflow-hidden text-white shadow-xl" style={{ minHeight: '140px' }}>
      {/* Background beach photo */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&fit=crop"
        alt="praia"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/70 via-blue-800/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-6 flex items-center gap-3">
        <span className="text-4xl drop-shadow-lg">🧌</span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight drop-shadow-lg">OccyFit</h1>
          <p className="text-cyan-100 text-sm drop-shadow">🌊 Viva saudável, viva em aloha!</p>
        </div>
        <div className="ml-auto flex flex-col items-center gap-1 opacity-90">
          <span className="text-3xl drop-shadow">☀️</span>
          <span className="text-xs text-cyan-100">🌺 aloha</span>
        </div>
      </div>
    </header>
  );
}
