export default function Header() {
  return (
    <header className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-4 px-6 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <span className="text-3xl">🧌</span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">OccyFit</h1>
          <p className="text-green-100 text-sm">Seu guia de alimentação saudável</p>
        </div>
      </div>
    </header>
  );
}
