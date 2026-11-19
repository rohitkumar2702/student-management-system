import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, GraduationCap, X } from "lucide-react";
import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/students", label: "Students", icon: Users, end: false },
];

/**
 * Sidebar
 * @param {boolean} mobileOpen
 * @param {() => void} onCloseMobile
 */
export default function Sidebar({ mobileOpen = false, onCloseMobile }) {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`sidebar-backdrop ${mobileOpen ? "is-open" : ""}`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside className={`sidebar ${mobileOpen ? "is-open" : ""}`}>
        {/* Brand */}
        <div className="sidebar__brand">
          <div className="sidebar__brand-mark" aria-hidden="true">
            <GraduationCap size={20} />
          </div>
          <div className="sidebar__brand-text">
            <span className="sidebar__brand-name">Scholarly</span>
            <span className="sidebar__brand-sub">Student System</span>
          </div>
          <button
            type="button"
            className="sidebar__close"
            onClick={onCloseMobile}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="sidebar__nav" aria-label="Main navigation">
          <p className="sidebar__section-label">Menu</p>
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? "is-active" : ""}`
              }
              onClick={onCloseMobile}
            >
              <Icon size={18} className="sidebar__link-icon" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar__footer">
          <div className="sidebar__footer-card">
            <p className="sidebar__footer-title">Student Management</p>
            <p className="sidebar__footer-text">
              Built with React &amp; Spring Boot
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}