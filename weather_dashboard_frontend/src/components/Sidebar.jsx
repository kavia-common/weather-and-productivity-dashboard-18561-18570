import { useState } from 'react';
import '../theme/theme.css';

// PUBLIC_INTERFACE
export default function Sidebar({ onSearch, onToggleUnits, currentCity, units }) {
  /**
   * Sidebar with city search and unit toggle. Persists via parent hook.
   * Props:
   *  - onSearch(term: string)
   *  - onToggleUnits()
   *  - currentCity: string
   *  - units: 'metric' | 'imperial'
   */
  const [term, setTerm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, message } = await onSearch(term);
    if (!ok && message) {
      alert(message); // simple accessible fallback
    } else {
      setTerm('');
    }
  };

  return (
    <aside className="sidebar card" aria-label="Location and Settings">
      <div>
        <h2 className="title" style={{ fontSize: 16 }}>Location & Settings</h2>
        <p className="subtitle">Current: <strong aria-live="polite">{currentCity}</strong></p>
      </div>

      <form onSubmit={handleSubmit} className="mt-16" aria-label="City Search Form">
        <label htmlFor="city-input" className="subtitle" style={{ display: 'block', marginBottom: 8 }}>
          Search city
        </label>
        <div className="flex gap-8">
          <input
            id="city-input"
            aria-label="Enter city name"
            className="input"
            placeholder="e.g., London"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit" className="btn" aria-label="Search city">
            Search
          </button>
        </div>
      </form>

      <div className="mt-24">
        <label className="subtitle" htmlFor="unit-toggle">Units</label>
        <div className="flex items-center gap-12 mt-8">
          <span className="badge" aria-live="polite">{units === 'metric' ? 'Metric (°C)' : 'Imperial (°F)'}</span>
          <button type="button" id="unit-toggle" className="btn ghost" onClick={onToggleUnits} aria-pressed={units === 'imperial'}>
            Toggle °C/°F
          </button>
        </div>
      </div>

      <div className="mt-24">
        <p className="subtitle">
          Tip: This app can use your location for local weather. Adjust permissions in your browser if needed.
        </p>
      </div>
    </aside>
  );
}
