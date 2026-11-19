// RFC-lite email check — mirrors @Email well enough for client-side UX
export function isValidEmail(value) {
  if (!value) return false;
  // Backend @Email accepts standard patterns; keep a practical regex.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}