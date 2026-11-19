import "./EmptyState.css";

/**
 * EmptyState
 * @param {React.ReactNode} icon - Lucide icon
 * @param {string} title
 * @param {string} description
 * @param {React.ReactNode} action - optional CTA button
 * @param {"compact"|"default"} variant
 */
export default function EmptyState({
  icon,
  title,
  description,
  action,
  variant = "default",
}) {
  return (
    <div className={`empty-state empty-state--${variant}`} role="status">
      {icon && (
        <div className="empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      )}
      {title && <h3 className="empty-state__title">{title}</h3>}
      {description && (
        <p className="empty-state__description">{description}</p>
      )}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}