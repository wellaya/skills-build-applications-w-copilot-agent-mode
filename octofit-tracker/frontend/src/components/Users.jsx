import { useEffect, useState } from 'react';
import { apiBaseUrl, fetchItems } from '../api.js';
import { EmptyState, ErrorState, LoadingState } from './ResourceState.jsx';

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : `${apiBaseUrl}/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchItems(usersEndpoint).then(setUsers).catch((error) => setStatus({ loading: false, error: error.message })).finally(() => setStatus((current) => ({ ...current, loading: false })));
  }, []);

  if (status.loading) return <LoadingState />;
  if (status.error) return <ErrorState message={status.error} />;
  if (!users.length) return <EmptyState label="users" />;
  return <div className="row g-3">{users.map((user) => <div className="col-md-6 col-xl-4" key={user._id || user.id || user.username}><article className="data-card h-100"><div className="avatar" style={{ backgroundColor: user.avatarColor || '#2a9d8f' }}>{(user.displayName || user.username || '?').charAt(0)}</div><div><h3>{user.displayName || user.username}</h3><p className="muted mb-0">@{user.username}</p><p className="muted mb-0">{user.email}</p></div></article></div>)}</div>;
}

export default Users;