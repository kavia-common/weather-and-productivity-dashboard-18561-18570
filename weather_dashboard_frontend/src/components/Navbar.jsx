import '../theme/theme.css';

// PUBLIC_INTERFACE
export default function Navbar() {
  /** Top navigation bar with title and subtle gradient background. */
  return (
    <nav className="navbar" role="navigation" aria-label="Top Navigation">
      <div className="navbar-inner container">
        <div className="flex items-center gap-12">
          <div
            aria-hidden="true"
            style={{
              width: 12,
              height: 12,
              borderRadius: 4,
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              boxShadow: '0 0 0 6px rgba(37,99,235,0.12)'
            }}
          />
          <div>
            <h1 className="title" style={{ letterSpacing: '0.2px' }}>
              Weather & Productivity Dashboard
            </h1>
            <p className="subtitle">Ocean Professional · Clean insights at a glance</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
