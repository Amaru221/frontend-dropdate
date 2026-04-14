export default function Sidebar() {
  return (
    <aside className="hidden xl:flex h-screen w-64 fixed left-0 top-0 flex-col p-6 space-y-4 pt-24 bg-surface">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-lg font-black text-white">
          Curated Verticals
        </h3>
        <p className="text-xs text-outline opacity-60">
          Browse by category
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <a className="flex items-center space-x-3 p-3 bg-surface-container text-white rounded-lg cursor-pointer">
          <span className="text-primary">🎮</span>
          <span>Gaming</span>
        </a>

        <a className="flex items-center space-x-3 p-3 text-outline hover:text-primary hover:bg-surface-container transition">
          <span>💻</span>
          <span>Tech</span>
        </a>

        <a className="flex items-center space-x-3 p-3 text-outline hover:text-primary hover:bg-surface-container transition">
          <span>👕</span>
          <span>Apparel</span>
        </a>

        <a className="flex items-center space-x-3 p-3 text-outline hover:text-primary hover:bg-surface-container transition">
          <span>🎬</span>
          <span>Media</span>
        </a>

        <a className="flex items-center space-x-3 p-3 text-outline hover:text-primary hover:bg-surface-container transition">
          <span>🌍</span>
          <span>Culture</span>
        </a>
      </nav>
    </aside>
  );
}