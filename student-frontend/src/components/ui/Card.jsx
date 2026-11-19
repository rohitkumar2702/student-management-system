import "./Card.css";

/**
 * Card
 * @param {string} title
 * @param {string} subtitle
 * @param {React.ReactNode} action - right side of the header (e.g. a Button)
 * @param {boolean} padded - apply inner padding to body
 * @param {boolean} glass - use the strong glass variant
 */
export default function Card({
  children,
  title,
  subtitle,
  action,
  padded = true,
  glass = false,
  className = "",
  bodyClassName = "",
  ...rest
}) {
  const hasHeader = Boolean(title || subtitle || action);

  return (
    <section
      className={`card ${glass ? "card--glass" : ""} ${className}`.trim()}
      {...rest}
    >
      {hasHeader && (
        <header className="card__header">
          <div className="card__heading">
            {title && <h3 className="card__title">{title}</h3>}
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>
          {action && <div className="card__action">{action}</div>}
        </header>
      )}

      <div
        className={`card__body ${padded ? "card__body--padded" : ""} ${bodyClassName}`.trim()}
      >
        {children}
      </div>
    </section>
  );
}