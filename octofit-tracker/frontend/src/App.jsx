import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { apiBaseUrl } from './api.js';
import './App.css';

const navigation = [
  { to: '/', label: 'Overview', end: true },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Members' },
  { to: '/workouts', label: 'Workouts' },
];

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">Welcome back, athlete</p>
      <h1>Small steps.<br /><em>Strong momentum.</em></h1>
      <p className="overview-copy">Keep your circle moving, celebrate the work, and make today count.</p>
      <div className="overview-actions"><NavLink className="primary-button" to="/activities">Log progress <span>↗</span></NavLink><NavLink className="text-link" to="/workouts">Find a workout</NavLink></div>
      <div className="signal-strip"><div><strong>01</strong><span>Track the work</span></div><div><strong>02</strong><span>Lift each other up</span></div><div><strong>03</strong><span>Keep going</span></div></div>
    </section>
  );
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/"><span className="brand-mark">O</span><span>octofit<span className="brand-dot">.</span></span></NavLink>
        <nav className="main-nav" aria-label="Primary navigation">{navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end}>{item.label}</NavLink>)}</nav>
        <span className="status-dot" title={`API: ${apiBaseUrl}`}>Live</span>
      </header>
      <main><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main>
      <footer className="site-footer"><span>OCTOFIT TRACKER</span><span>Build your rhythm.</span></footer>
    </div>
  );
}

export default App;
