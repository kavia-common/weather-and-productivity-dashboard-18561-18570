# Weather & Productivity Dashboard (Ocean Professional)

A modern React dashboard that shows current weather and a 7-day forecast powered by OpenWeatherMap, plus a placeholder Jira visualization panel. Styled with the Ocean Professional theme (blue + amber accents) using CSS variables and utility-like classes.

## Features

- Current weather and 7-day forecast (OpenWeatherMap)
- Location via browser geolocation with fallback to city search
- Units toggle (°C/°F) and preference persistence (localStorage)
- Jira panel mock with Recharts (issues by status and weekly activity)
- Responsive dashboard layout with top navbar, left sidebar, and central panels
- Ocean Professional theme: subtle shadows, rounded corners, gradients, and accessible UI

## Prerequisites

- Node.js 16+ recommended
- An OpenWeatherMap API key

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create your environment file:
   ```
   cp .env.example .env
   ```
   Edit `.env` and set:
   - `REACT_APP_OWM_API_KEY` (required)
   - `REACT_APP_OWM_API_BASE` (optional; defaults to https://api.openweathermap.org)

3. Start the app (port 3000):
   ```
   npm start
   ```
   Open http://localhost:3000

## Project Structure

- `src/components/Navbar.jsx` — Top navigation with gradient title
- `src/components/Sidebar.jsx` — City search, units toggle
- `src/components/Weather/WeatherPanel.jsx` — Current weather and forecast
- `src/components/Weather/ForecastCard.jsx` — Forecast day card
- `src/components/JiraPanel.jsx` — Mock charts using Recharts
- `src/services/weatherApi.js` — Service layer for OpenWeatherMap calls
- `src/hooks/useWeather.js` — State, geolocation, fetching, persistence
- `src/theme/theme.css` — Ocean Professional theme and utilities
- `src/utils/format.js` — Formatting helpers

## Environment Variables

See `.env.example` for details:
- `REACT_APP_OWM_API_KEY` — your OpenWeatherMap API key
- `REACT_APP_OWM_API_BASE` — API base URL (optional)

## Accessibility

- Semantic elements, aria labels for forms and dynamic content
- Focus styles on inputs and buttons
- Reduced motion friendly design

## Future Jira Integration

The Jira panel currently uses mock data. For real integration:
- Implement OAuth 2.0 (3LO) with Jira
- Retrieve issues via the Jira REST Search API
- Never store secrets in the frontend; use a secure backend

## Scripts

- `npm start` — dev server at port 3000
- `npm test` — run unit tests
- `npm run build` — production build

## License

MIT
