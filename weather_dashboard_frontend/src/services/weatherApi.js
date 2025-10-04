const API_BASE = process.env.REACT_APP_OWM_API_BASE || 'https://api.openweathermap.org';
const API_KEY = process.env.REACT_APP_OWM_API_KEY;

// PUBLIC_INTERFACE
export async function getCurrentWeatherByCoords(lat, lon, units = 'metric', signal) {
  /**
   * Fetch current weather by coordinates from OpenWeatherMap.
   * params:
   *  - lat, lon: numbers
   *  - units: 'metric' | 'imperial'
   * returns: JSON object of current weather (OWM /weather)
   */
  if (!API_KEY) {
    throw new Error('Missing REACT_APP_OWM_API_KEY');
  }
  const url = new URL(`${API_BASE}/data/2.5/weather`);
  url.searchParams.set('lat', String(lat));
  url.searchParams.set('lon', String(lon));
  url.searchParams.set('appid', API_KEY);
  url.searchParams.set('units', units);
  const resp = await fetch(url.toString(), { signal });
  if (!resp.ok) throw new Error(`Weather error: ${resp.status}`);
  return resp.json();
}

// PUBLIC_INTERFACE
export async function getOneCall(lat, lon, units = 'metric', signal) {
  /**
   * Fetch One Call forecast (daily) by coordinates.
   * returns: JSON object with daily array
   */
  if (!API_KEY) {
    throw new Error('Missing REACT_APP_OWM_API_KEY');
  }
  const url = new URL(`${API_BASE}/data/3.0/onecall`);
  url.searchParams.set('lat', String(lat));
  url.searchParams.set('lon', String(lon));
  url.searchParams.set('appid', API_KEY);
  url.searchParams.set('units', units);
  url.searchParams.set('exclude', 'minutely,hourly,alerts');
  const resp = await fetch(url.toString(), { signal });
  if (!resp.ok) throw new Error(`Forecast error: ${resp.status}`);
  return resp.json();
}

// PUBLIC_INTERFACE
export async function getCoordsForCity(city, signal) {
  /**
   * Simple city name to coordinate lookup using OWM geocoding.
   * returns: { lat, lon, name, country } for first match or null
   */
  if (!API_KEY) {
    throw new Error('Missing REACT_APP_OWM_API_KEY');
  }
  const url = new URL(`${API_BASE}/geo/1.0/direct`);
  url.searchParams.set('q', city);
  url.searchParams.set('limit', '1');
  url.searchParams.set('appid', API_KEY);
  const resp = await fetch(url.toString(), { signal });
  if (!resp.ok) throw new Error(`Geocode error: ${resp.status}`);
  const data = await resp.json();
  if (Array.isArray(data) && data.length > 0) {
    const first = data[0];
    return { lat: first.lat, lon: first.lon, name: first.name, country: first.country };
  }
  return null;
}
