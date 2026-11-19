import { Loader2 } from "lucide-react";
import "./Button.css";

/**
 * Button
 * @param {"primary"|"secondary"|"ghost"|"danger"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {boolean} loading
 * @param {React.ReactNode} iconLeft
 * @param {React.ReactNode} iconRight
 * @param {boolean} fullWidth
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  type = "button",
  className = "",
  ...rest
}) {
  const classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--full" : "",
    loading ? "btn--loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <Loader2 size={16} className="btn__spinner" aria-hidden="true" />
      ) : (
        iconLeft && <span className="btn__icon">{iconLeft}</span>
      )}
      {children && <span className="btn__label">{children}</span>}
      {!loading && iconRight && (
        <span className="btn__icon">{iconRight}</span>
      )}
    </button>
  );
}