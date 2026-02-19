export default function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 text-white py-5 px-6 shadow-lg">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 text-6xl opacity-20 -mt-2">🌺</div>
      <div className="absolute bottom-0 left-32 text-5xl opacity-15 mb-1">🍍</div>
      <div className="absolute top-1 right-24 text-3xl opacity-20">🌸</div>
      <div className="max-w-4xl mx-auto flex items-center gap-3 relative z-10">
        <span className="text-3xl">🧌</span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight drop-shadow">OccyFit</h1>
          <p className="text-orange-100 text-sm">🌊 Viva saudável, viva em aloha!</p>
        </div>
        <div className="ml-auto text-3xl opacity-80">☀️</div>
      </div>
    </header>
  );
}
