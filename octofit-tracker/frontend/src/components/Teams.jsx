import { useEffect, useState } from 'react';
import { apiBaseUrl, fetchItems } from '../api.js';
import { EmptyState, ErrorState, LoadingState } from './ResourceState.jsx';

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : `${apiBaseUrl}/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchItems(teamsEndpoint).then(setTeams).catch((error) => setStatus({ loading: false, error: error.message })).finally(() => setStatus((current) => ({ ...current, loading: false })));
  }, []);

  if (status.loading) return <LoadingState />;
  if (status.error) return <ErrorState message={status.error} />;
  if (!teams.length) return <EmptyState label="teams" />;
  return <div className="row g-3">{teams.map((team) => <div className="col-md-6" key={team._id || team.id || team.name}><article className="data-card h-100 d-block"><div className="d-flex justify-content-between align-items-start gap-3"><div><h3>{team.name}</h3><p className="muted">{team.motto}</p></div><strong className="score">{team.totalPoints ?? 0} pts</strong></div><div className="member-list">{(team.members || []).map((member) => <span key={member._id || member.id || member.username} className="member-pill">{member.displayName || member.username || member}</span>)}</div></article></div>)}</div>;
}

export default Teams;