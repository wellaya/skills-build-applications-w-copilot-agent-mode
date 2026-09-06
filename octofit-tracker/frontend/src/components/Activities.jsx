import { useEffect, useState } from 'react';
import { apiBaseUrl, fetchItems } from '../api.js';
import { EmptyState, ErrorState, LoadingState } from './ResourceState.jsx';

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : `${apiBaseUrl}/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchItems(activitiesEndpoint).then(setActivities).catch((error) => setStatus({ loading: false, error: error.message })).finally(() => setStatus((current) => ({ ...current, loading: false })));
  }, []);

  if (status.loading) return <LoadingState />;
  if (status.error) return <ErrorState message={status.error} />;
  if (!activities.length) return <EmptyState label="activities" />;
  return <div className="table-responsive data-table-wrap"><table className="table align-middle mb-0"><thead><tr><th>Member</th><th>Activity</th><th>Duration</th><th>Distance</th><th>Calories</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id || activity.id}><td>{activity.user?.displayName || activity.user?.username || activity.user || 'Unknown member'}</td><td><span className="activity-tag">{activity.activityType || activity.type}</span></td><td>{activity.durationMinutes ?? activity.duration ?? '-'} min</td><td>{activity.distanceKm ? `${activity.distanceKm} km` : '-'}</td><td>{activity.calories ?? '-'} kcal</td></tr>)}</tbody></table></div>;
}

export default Activities;