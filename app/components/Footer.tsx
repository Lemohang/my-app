// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="relative mt-10 p-8 backdrop-blur-md bg-white/10 border-t border-white/20 rounded-t-3xl shadow-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
        {/* Logo / Brand */}
        <div>
          <h2 className="text-2xl font-bold">HealthCare+</h2>
          <p className="text-sm opacity-70 mt-2">
            Your trusted partner in health management — book, chat, and get care anytime.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Find a Doctor</a></li>
            <li><a href="#" className="hover:underline">Appointments</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Health Tips</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm opacity-70 mb-3">
            Subscribe for updates and health tips.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-lg bg-white/20 text-white placeholder-white/70 border border-white/20 focus:outline-none"
            />
            <button className="bg-gradient-to-r from-teal-400 to-blue-500 px-4 rounded-r-lg text-white font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 text-center text-xs opacity-70 border-t border-white/20 pt-4">
        © {new Date().getFullYear()} HealthCare+. All rights reserved.
      </div>
    </footer>
  );
}
