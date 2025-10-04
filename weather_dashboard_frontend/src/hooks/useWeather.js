import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getCoordsForCity, getCurrentWeatherByCoords, getOneCall } from '../services/weatherApi';

const DEFAULT_CITY = 'San Francisco';
const LS_KEY = 'wd_prefs_v1';

function loadPrefs() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function savePrefs(prefs) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(prefs));
  } catch {
    // ignore
  }
}

// PUBLIC_INTERFACE
export function useWeather() {
  /**
   * Hook that encapsulates weather fetching, preferences, and geolocation fallback.
   * Returns state and actions to control location and units.
   */
  const abortRef = useRef(null);

  const [units, setUnits] = useState(() => loadPrefs()?.units || 'metric'); // 'metric' or 'imperial'
  const [city, setCity] = useState(() => loadPrefs()?.city || DEFAULT_CITY);
  const [coords, setCoords] = useState(() => loadPrefs()?.coords || null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState([]);

  const persist = useCallback((next) => {
    const prev = loadPrefs() || {};
    savePrefs({ ...prev, ...next });
  }, []);

  const resolveCoordsFromGeolocation = useCallback(() => {
    return new Promise((resolve) => {
      if (!('geolocation' in navigator)) {
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => resolve(null),
        { enableHighAccuracy: false, maximumAge: 300000, timeout: 8000 }
      );
    });
  }, []);

  const fetchData = useCallback(async (lat, lon, activeUnits) => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError('');
    try {
      const [cur, one] = await Promise.all([
        getCurrentWeatherByCoords(lat, lon, activeUnits, controller.signal),
        getOneCall(lat, lon, activeUnits, controller.signal)
      ]);
      setCurrent(cur);
      setDaily(Array.isArray(one?.daily) ? one.daily.slice(0, 7) : []);
    } catch (e) {
      setError(e?.message || 'Failed to load weather');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize: try geolocation, then fallback to stored or default city
  useEffect(() => {
    (async () => {
      const stored = loadPrefs();
      if (stored?.coords) {
        setCoords(stored.coords);
        fetchData(stored.coords.lat, stored.coords.lon, stored.units || units);
        return;
      }
      const geo = await resolveCoordsFromGeolocation();
      if (geo) {
        setCoords(geo);
        persist({ coords: geo });
        fetchData(geo.lat, geo.lon, units);
      } else {
        try {
          const found = await getCoordsForCity(city);
          if (found) {
            setCoords({ lat: found.lat, lon: found.lon });
            persist({ coords: { lat: found.lat, lon: found.lon }, city: found.name });
            fetchData(found.lat, found.lon, units);
          } else {
            setError('Could not resolve default city.');
            setLoading(false);
          }
        } catch (e) {
          setError(e?.message || 'Initialization failed');
          setLoading(false);
        }
      }
    })();

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When units change, refetch for same coords
  useEffect(() => {
    if (coords) {
      persist({ units });
      fetchData(coords.lat, coords.lon, units);
    }
  }, [coords, units, fetchData, persist]);

  const searchCity = useCallback(async (term) => {
    if (!term || term.trim().length < 2) return { ok: false, message: 'Enter at least 2 characters' };
    try {
      const found = await getCoordsForCity(term.trim());
      if (!found) return { ok: false, message: 'City not found' };
      const nextCoords = { lat: found.lat, lon: found.lon };
      setCity(found.name);
      setCoords(nextCoords);
      persist({ city: found.name, coords: nextCoords });
      await fetchData(nextCoords.lat, nextCoords.lon, units);
      return { ok: true };
    } catch (e) {
      return { ok: false, message: e?.message || 'Search failed' };
    }
  }, [fetchData, persist, units]);

  const toggleUnits = useCallback(() => {
    setUnits((u) => (u === 'metric' ? 'imperial' : 'metric'));
  }, []);

  return useMemo(() => ({
    state: { loading, error, current, daily, city, units },
    actions: { searchCity, toggleUnits, setUnits },
  }), [loading, error, current, daily, city, units, searchCity, toggleUnits]);
}
