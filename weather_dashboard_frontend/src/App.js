import React from 'react';
import './App.css';
import './theme/theme.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import WeatherPanel from './components/Weather/WeatherPanel';
import JiraPanel from './components/JiraPanel';
import { useWeather } from './hooks/useWeather';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root application rendering the dashboard layout with Ocean Professional theme.
   * Includes top Navbar, left Sidebar, center content (Weather + Jira).
   */
  const { state, actions } = useWeather();

  return (
    <div>
      <Navbar />
      <main className="container app-shell" role="main">
        <div>
          <Sidebar
            onSearch={actions.searchCity}
            onToggleUnits={actions.toggleUnits}
            currentCity={state.city}
            units={state.units}
          />
        </div>
        <div className="grid" style={{ gap: 16 }}>
          <WeatherPanel
            loading={state.loading}
            error={state.error}
            current={state.current}
            daily={state.daily}
            units={state.units}
          />
          <JiraPanel />
        </div>
      </main>
    </div>
  );
}

export default App;
