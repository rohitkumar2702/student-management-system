import { Menu } from "lucide-react";
import "./Topbar.css";

/**
 * Topbar
 * @param {string} title
 * @param {string} subtitle
 * @param {React.ReactNode} actions - right-side actions
 * @param {() => void} onOpenMobile
 */
export default function Topbar({
  title,
  subtitle,
  actions = null,
  onOpenMobile,
}) {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          type="button"
          className="topbar__menu-btn"
          onClick={onOpenMobile}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
        <div className="topbar__heading">
          {title && <h1 className="topbar__title">{title}</h1>}
          {subtitle && <p className="topbar__subtitle">{subtitle}</p>}
        </div>
      </div>

      {actions && <div className="topbar__actions">{actions}</div>}
    </header>
  );
}