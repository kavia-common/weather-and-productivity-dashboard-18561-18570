//
// PUBLIC_INTERFACE
export function formatTemperature(value, units = 'metric') {
  /** Format temperature with degree symbol based on units (metric/imperial). */
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  const rounded = Math.round(value);
  const suffix = units === 'imperial' ? '°F' : '°C';
  return `${rounded}${suffix}`;
}

// PUBLIC_INTERFACE
export function formatWind(speed, units = 'metric') {
  /** Format wind speed string for UI based on units. */
  if (speed === null || speed === undefined || Number.isNaN(speed)) return '—';
  const suffix = units === 'imperial' ? 'mph' : 'm/s';
  return `${Math.round(speed)} ${suffix}`;
}

// PUBLIC_INTERFACE
export function formatDay(ts) {
  /** Format UNIX timestamp (seconds) to weekday short label. */
  try {
    const d = new Date(ts * 1000);
    return d.toLocaleDateString(undefined, { weekday: 'short' });
  } catch {
    return '';
  }
}

// PUBLIC_INTERFACE
export function getWeatherIconUrl(icon) {
  /** Returns the OpenWeatherMap icon URL for the provided icon code. */
  if (!icon) return '';
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
