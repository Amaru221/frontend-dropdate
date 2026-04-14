export default function Footer() {
  return (
    <footer className="w-full py-12 bg-surface-container-lowest border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-screen-2xl mx-auto gap-8">
        
        {/* Brand */}
        <div className="flex flex-col space-y-2 items-center md:items-start">
          <div className="font-headline font-bold text-white text-xl">
            DIGITAL CURATOR
          </div>

          <p className="text-xs uppercase tracking-widest text-outline">
            © 2026 DIGITAL CURATOR. ARCHIVING THE FUTURE.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest">
          <a className="text-outline hover:text-white transition">Privacy</a>
          <a className="text-outline hover:text-white transition">Terms</a>
          <a className="text-outline hover:text-white transition">Contact</a>
          <a className="text-outline hover:text-white transition">API</a>
          <a className="text-outline hover:text-white transition">About</a>
        </div>

        {/* Social */}
        <div className="flex space-x-4 text-outline">
          <span className="cursor-pointer hover:text-primary">🔗</span>
          <span className="cursor-pointer hover:text-primary">📡</span>
        </div>

      </div>
    </footer>
  );
}