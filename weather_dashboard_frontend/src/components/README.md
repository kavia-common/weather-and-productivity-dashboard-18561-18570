# Components Overview

- Navbar.jsx: top navigation with gradient, title, and subtle branding accent.
- Sidebar.jsx: city search and units toggle. Uses parent-provided actions from useWeather hook.
- JiraPanel.jsx: mock charts using Recharts; future integration target for Jira.
- Weather/WeatherPanel.jsx: current conditions and forecast area.
- Weather/ForecastCard.jsx: forecast item UI.

All components consume styles from src/theme/theme.css and utility classes.
