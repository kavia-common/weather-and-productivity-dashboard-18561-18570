import { useMemo } from 'react';
import '../theme/theme.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

const COLORS = ['#2563EB', '#F59E0B', '#10B981', '#EF4444'];

// PUBLIC_INTERFACE
export default function JiraPanel() {
  /**
   * Placeholder for Jira visualizations using mock data and Recharts.
   * Includes issues by status (pie) and weekly activity (bar).
   * Note: Future integration will use Jira OAuth/API.
   */
  const statusData = useMemo(() => ([
    { name: 'To Do', value: 12 },
    { name: 'In Progress', value: 8 },
    { name: 'Review', value: 5 },
    { name: 'Done', value: 20 },
  ]), []);

  const activityData = useMemo(() => ([
    { week: 'W1', created: 8, done: 5 },
    { week: 'W2', created: 6, done: 7 },
    { week: 'W3', created: 10, done: 8 },
    { week: 'W4', created: 7, done: 9 },
  ]), []);

  return (
    <section className="card" aria-label="Jira Productivity Panel">
      <header className="flex items-center justify-between">
        <h2 className="title" style={{ fontSize: 18 }}>Jira Overview (Mock)</h2>
        <span className="badge">Demo</span>
      </header>

      <p className="subtitle mt-8">
        Placeholder visualization with mock data. Future versions will connect to Jira via OAuth/API.
      </p>

      <div className="grid grid-2 mt-16">
        <div className="card" style={{ height: 280 }}>
          <h3 className="title" style={{ fontSize: 16, marginBottom: 8 }}>Issues by Status</h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ height: 280 }}>
          <h3 className="title" style={{ fontSize: 16, marginBottom: 8 }}>Weekly Activity</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={activityData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="created" fill="#2563EB" />
              <Bar dataKey="done" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-16">
        <button className="btn ghost" type="button" aria-label="Settings and integration notes">
          Settings & Integration Notes
        </button>
        <p className="subtitle mt-8">
          To integrate: implement Jira OAuth 2.0 (3LO) and call the Search API to fetch issues. Store tokens securely.
        </p>
      </div>
    </section>
  );
}
