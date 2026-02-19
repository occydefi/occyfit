export default function Header() {
  return (
    <header className="relative overflow-hidden text-white shadow-2xl" style={{ minHeight: '160px' }}>
      {/* Background beach photo */}
      <img
        src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=85&fit=crop"
        alt="praia"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 40%' }}
      />
      {/* Tiffany/Maldivas overlay */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, rgba(0,180,180,0.75) 0%, rgba(0,128,128,0.55) 50%, rgba(0,80,100,0.40) 100%)'
      }} />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)'
      }} />

      {/* Decorative wave */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ height: '30px' }}>
        <path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,15 1440,20 L1440,40 L0,40 Z"
          fill="white" fillOpacity="0.15"/>
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-7 flex items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-wide drop-shadow-lg"
            style={{
              fontFamily: 'Raleway, sans-serif',
              textShadow: '0 2px 12px rgba(0,0,0,0.3), 0 0 30px rgba(0,200,200,0.4)',
              letterSpacing: '2px',
            }}>
            OccyFit
          </h1>
          <p className="text-sm font-semibold drop-shadow mt-0.5"
            style={{ color: '#b2f5ea', letterSpacing: '1px' }}>
            🌊 VIVA SAUDÁVEL · VIVA EM ALOHA
          </p>
        </div>
        <div className="ml-auto flex flex-col items-end gap-1 opacity-90">
          <span className="text-4xl drop-shadow-lg">🌺</span>
          <span className="text-xs font-bold tracking-widest" style={{ color: '#b2f5ea' }}>SURF LIFE</span>
        </div>
      </div>
    </header>
  );
}
