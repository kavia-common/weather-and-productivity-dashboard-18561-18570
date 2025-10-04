import { formatTemperature, formatWind, getWeatherIconUrl } from '../../utils/format';
import ForecastCard from './ForecastCard';
import '../../theme/theme.css';

// PUBLIC_INTERFACE
export default function WeatherPanel({ loading, error, current, daily, units }) {
  /**
   * Weather panel showing current conditions and 7-day forecast.
   * Props include loading/error states, current weather object, daily array, and units.
   */
  return (
    <section className="card" aria-label="Weather Panel">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-12">
          <h2 className="title" style={{ fontSize: 18 }}>Current Weather</h2>
          {loading && <span className="badge">Loading…</span>}
          {error && <span className="badge error" role="alert">{error}</span>}
        </div>
      </header>

      <div className="mt-16">
        {loading ? (
          <div className="flex items-center gap-12">
            <div className="skeleton" style={{ width: 80, height: 80 }} />
            <div className="skeleton" style={{ width: 200, height: 24 }} />
          </div>
        ) : current ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              {current?.weather?.[0]?.icon ? (
                <img
                  src={getWeatherIconUrl(current.weather[0].icon)}
                  alt={current?.weather?.[0]?.description || 'weather icon'}
                  width={72}
                  height={72}
                />
              ) : (
                <div className="skeleton" style={{ width: 72, height: 72 }} />
              )}
              <div>
                <div className="title" style={{ fontSize: 28 }}>
                  {formatTemperature(current?.main?.temp, units)}
                </div>
                <div className="subtitle" style={{ textTransform: 'capitalize' }}>
                  {current?.weather?.[0]?.description || '—'}
                </div>
              </div>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
              <div className="card" style={{ padding: 12 }}>
                <div className="subtitle">Feels like</div>
                <div className="title" style={{ fontSize: 16 }}>
                  {formatTemperature(current?.main?.feels_like, units)}
                </div>
              </div>
              <div className="card" style={{ padding: 12 }}>
                <div className="subtitle">Humidity</div>
                <div className="title" style={{ fontSize: 16 }}>
                  {current?.main?.humidity != null ? `${current.main.humidity}%` : '—'}
                </div>
              </div>
              <div className="card" style={{ padding: 12 }}>
                <div className="subtitle">Wind</div>
                <div className="title" style={{ fontSize: 16 }}>
                  {formatWind(current?.wind?.speed, units)}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="subtitle">No current data available.</div>
        )}
      </div>

      <div className="mt-24">
        <h3 className="title" style={{ fontSize: 16, marginBottom: 12 }}>7-Day Forecast</h3>
        {loading ? (
          <div className="grid grid-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card">
                <div className="skeleton" style={{ width: '100%', height: 96 }} />
              </div>
            ))}
          </div>
        ) : daily && daily.length > 0 ? (
          <div role="list" className="grid grid-3">
            {daily.map((d, idx) => (
              <ForecastCard key={d?.dt ?? idx} day={d} units={units} />
            ))}
          </div>
        ) : (
          <div className="subtitle">Forecast unavailable.</div>
        )}
      </div>
    </section>
  );
}
