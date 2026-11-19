import { useEffect, useState } from "react";

/**
 * Debounce a value.
 * Returns a delayed version of `value` that only updates
 * after `delay` ms of no changes.
 *
 * @param {*} value - the value to debounce
 * @param {number} delay - delay in ms (default 300)
 * @returns {*} debounced value
 */
export default function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}