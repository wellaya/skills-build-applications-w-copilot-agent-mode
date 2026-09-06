import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { apiBaseUrl } from './api.js';
import './App.css';

const navigation = [{ path: '/', label: 'Overview', end: true }, { path: '/activities', label: 'Activities' }, { path: '/leaderboard', label: 'Leaderboard' }, { path: '/teams', label: 'Teams' }, { path: '/users', label: 'Members' }, { path: '/workouts', label: 'Workouts' }];

function Overview() {
  return <div className="overview-grid"><article className="feature-panel"><p className="eyebrow">Weekly focus</p><h2>Build a rhythm that lasts.</h2><p>Keep your team moving with small, visible wins and a clear view of every effort.</p><NavLink className="btn btn-light" to="/activities">View recent activity</NavLink></article><div className="overview-links"><NavLink to="/leaderboard" className="quick-link"><span>01</span><strong>Check the leaderboard</strong><span>↗</span></NavLink><NavLink to="/workouts" className="quick-link"><span>02</span><strong>Find your next workout</strong><span>↗</span></NavLink><NavLink to="/teams" className="quick-link"><span>03</span><strong>Meet your team</strong><span>↗</span></NavLink></div></div>;
}

function App() {
  return <div className="app-shell"><header className="app-header"><NavLink className="brand" to="/" end><img src="/octofitapp-small.png" alt="OctoFit" /><span>OctoFit <em>Tracker</em></span></NavLink><nav className="main-nav" aria-label="Primary navigation">{navigation.map((item) => <NavLink key={item.path} to={item.path} end={item.end}>{item.label}</NavLink>)}</nav></header><main className="app-main"><div className="page-heading"><div><p className="eyebrow">Your movement, in one place</p><h1><Routes><Route path="/" element="Today" /><Route path="/activities" element="Activities" /><Route path="/leaderboard" element="Leaderboard" /><Route path="/teams" element="Teams" /><Route path="/users" element="Members" /><Route path="/workouts" element="Workouts" /></Routes></h1></div><span className="api-status"><i /> API connected</span></div><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main><footer className="app-footer">Connected to <span>{apiBaseUrl}</span></footer></div>;
}

export default App;