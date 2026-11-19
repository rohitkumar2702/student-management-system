import "./Input.css";

/**
 * Input
 * @param {string} id - required for label association
 * @param {string} label
 * @param {string} error - error message string
 * @param {string} hint - helper text
 * @param {React.ReactNode} iconLeft
 * @param {React.ReactNode} iconRight
 * @param {string} type - text | email | number | password
 */
export default function Input({
  id,
  label,
  error,
  hint,
  iconLeft = null,
  iconRight = null,
  type = "text",
  className = "",
  ...rest
}) {
  const hasError = Boolean(error);

  return (
    <div className={`input-field ${className}`.trim()}>
      {label && (
        <label htmlFor={id} className="input-field__label">
          {label}
        </label>
      )}

      <div
        className={`input-field__control ${hasError ? "is-error" : ""}`}
      >
        {iconLeft && (
          <span className="input-field__icon" aria-hidden="true">
            {iconLeft}
          </span>
        )}
        <input
          id={id}
          type={type}
          className="input-field__input"
          aria-invalid={hasError}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          {...rest}
        />
        {iconRight && (
          <span className="input-field__icon" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </div>

      {error ? (
        <p id={`${id}-error`} className="input-field__error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="input-field__hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}