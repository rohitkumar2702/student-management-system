/*
  API error helpers.
  Works with the normalized error shape from axiosClient:
  { status, message, fieldErrors, isNetworkError }
*/

/**
 * Get a toast-friendly message from a normalized API error.
 * Falls back to a generic message if the error is unexpected.
 */
export function getErrorMessage(error) {
  if (!error) return "Something went wrong. Please try again.";

  // Normalized error from axiosClient
  if (typeof error === "object" && "message" in error && "status" in error) {
    return error.message || "Something went wrong. Please try again.";
  }

  // Fallback for a raw Error
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

/**
 * Get field-level errors (if any) from a normalized API error.
 * Returns an object like { email: "Please enter a valid email" } or null.
 */
export function getFieldErrors(error) {
  if (error && typeof error === "object" && error.fieldErrors) {
    return error.fieldErrors;
  }
  return null;
}

/**
 * Detect if the error is a duplicate/conflict (409).
 */
export function isConflictError(error) {
  return !!error && error.status === 409;
}

/**
 * Detect if the error is a not-found (404).
 */
export function isNotFoundError(error) {
  return !!error && error.status === 404;
}

/**
 * Detect if the error is a validation error (400).
 */
export function isValidationError(error) {
  return !!error && error.status === 400;
}

/**
 * Detect if the error is a network-level failure (no response).
 */
export function isNetworkError(error) {
  return !!error && error.isNetworkError === true;
}