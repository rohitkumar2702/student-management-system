import "./Skeleton.css";

/**
 * Skeleton
 * @param {"text"|"title"|"circle"|"rect"} variant
 * @param {string|number} width
 * @param {string|number} height
 * @param {string} className
 */
export default function Skeleton({
  variant = "text",
  width,
  height,
  className = "",
  style = {},
  ...rest
}) {
  return (
    <span
      className={`skeleton skeleton--${variant} ${className}`.trim()}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...rest}
    />
  );
}