import { useEffect, useState } from 'react';
import { fetchItems } from '../api.js';
import { EmptyState, ErrorState, LoadingState } from './ResourceState.jsx';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchItems('leaderboard').then(setEntries).catch((error) => setStatus({ loading: false, error: error.message })).finally(() => setStatus((current) => ({ ...current, loading: false })));
  }, []);

  if (status.loading) return <LoadingState />;
  if (status.error) return <ErrorState message={status.error} />;
  if (!entries.length) return <EmptyState label="leaderboard entries" />;
  return <div className="leaderboard-list">{entries.map((entry, index) => <article className="leaderboard-row" key={entry._id || entry.id || entry.user?._id || index}><span className="rank">{entry.rank || index + 1}</span><div className="flex-grow-1"><h3>{entry.user?.displayName || entry.user?.username || entry.user || 'Unknown member'}</h3><p className="muted mb-0">{entry.team?.name || entry.team || 'Independent'} · {entry.weeklyStreak ?? 0} week streak</p></div><strong className="score">{entry.points ?? 0} pts</strong></article>)}</div>;
}

export default Leaderboard;