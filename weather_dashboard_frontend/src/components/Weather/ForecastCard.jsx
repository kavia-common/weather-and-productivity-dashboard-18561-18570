import { formatDay, formatTemperature, getWeatherIconUrl } from '../../utils/format';
import '../../theme/theme.css';

// PUBLIC_INTERFACE
export default function ForecastCard({ day, units }) {
  /**
   * Card for a daily forecast item from OWM onecall (daily[]).
   * Props:
   *  - day: object with dt, temp, weather[], etc.
   *  - units: 'metric' | 'imperial'
   */
  if (!day) return null;
  const icon = day?.weather?.[0]?.icon;
  const desc = day?.weather?.[0]?.description || '';
  const min = day?.temp?.min;
  const max = day?.temp?.max;

  return (
    <div className="card" role="listitem" aria-label={`Forecast ${formatDay(day.dt)}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="title" style={{ fontSize: 14 }}>{formatDay(day.dt)}</div>
          <div className="subtitle" style={{ textTransform: 'capitalize' }}>{desc}</div>
        </div>
        {icon ? (
          <img src={getWeatherIconUrl(icon)} alt={desc} width={56} height={56} />
        ) : (
          <div className="skeleton" style={{ width: 56, height: 56 }} />
        )}
      </div>
      <div className="mt-16 flex items-center gap-12">
        <span className="badge">High {formatTemperature(max, units)}</span>
        <span className="badge warn">Low {formatTemperature(min, units)}</span>
      </div>
    </div>
  );
}
