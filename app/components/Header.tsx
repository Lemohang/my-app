// components/GlassHeader.tsx
export default function GlassHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="backdrop-blur-lg bg-white/30 border-b border-white/40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-200 rounded-full shadow-md border border-white/50" />
            <span className="text-xl font-semibold text-white drop-shadow-md">
              HealthCare MVP
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="features" className="text-white hover:text-blue-200 transition font-medium">
              Features
            </a>
            <a href="services" className="text-white hover:text-blue-200 transition font-medium">
              Services
            </a>
            <a href="pricing" className="text-white hover:text-blue-200 transition font-medium">
              Pricing
            </a>
            <a href="#contact" className="text-white hover:text-blue-200 transition font-medium">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <button className="px-5 py-2 bg-gradient-to-br from-blue-400 to-blue-200 text-gray-900 font-semibold rounded-full shadow-md hover:opacity-90 transition">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
