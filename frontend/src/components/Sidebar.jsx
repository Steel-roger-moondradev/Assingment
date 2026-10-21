import { useState } from "react";

function Sidebar() {
  const navigation = [
    { label: "Dashboard", href: "#dashboard", icon: "▦" },
    { label: "Analytics", href: "#analytics", icon: "▥" },
    { label: "Data Explorer", href: "#data", icon: "▤" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="mobile-menu-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        ☰
      </button>

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-logo">B</div>

          <div>
            <h2>Blackcoffer</h2>
            <p>Analytics Platform</p>
          </div>
        </div>

        <div className="sidebar-divider" />

        <nav className="sidebar-nav" aria-label="Main navigation">
          <p className="nav-section-title">WORKSPACE</p>

          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`sidebar-link ${
                item.label === "Dashboard" ? "active" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        <div className="sidebar-status">
          <div className="status-dot" />
          <div>
            <strong>System Online</strong>
            <span>All services operational</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <span className="footer-avatar">D</span>
          <div>
            <strong>Data Dashboard</strong>
            <span>Blackcoffer</span>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}

export default Sidebar;
