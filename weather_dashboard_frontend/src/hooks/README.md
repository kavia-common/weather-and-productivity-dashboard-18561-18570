# Hooks

- useWeather: orchestrates geolocation + OpenWeatherMap API calls, persists user preferences, and provides a simple API.

Public interface:
- state: { loading, error, current, daily, city, units }
- actions: { searchCity(term), toggleUnits(), setUnits(units) }
