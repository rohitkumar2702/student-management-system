import "./Badge.css";

/**
 * Badge
 * @param {"neutral"|"sage"|"burgundy"|"success"|"warning"|"muted"} variant
 * @param {"sm"|"md"} size
 * @param {React.ReactNode} icon - small lucide icon
 */
export default function Badge({
  children,
  variant = "neutral",
  size = "md",
  icon = null,
  className = "",
  ...rest
}) {
  return (
    <span
      className={`badge badge--${variant} badge--${size} ${className}`.trim()}
      {...rest}
    >
      {icon && (
        <span className="badge__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}