import { useEffect, useState } from 'react';
import { apiBaseUrl, fetchItems } from '../api.js';
import { EmptyState, ErrorState, LoadingState } from './ResourceState.jsx';

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : `${apiBaseUrl}/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    fetchItems(workoutsEndpoint).then(setWorkouts).catch((error) => setStatus({ loading: false, error: error.message })).finally(() => setStatus((current) => ({ ...current, loading: false })));
  }, []);

  if (status.loading) return <LoadingState />;
  if (status.error) return <ErrorState message={status.error} />;
  if (!workouts.length) return <EmptyState label="workouts" />;
  return <div className="row g-3">{workouts.map((workout) => <div className="col-md-6 col-xl-4" key={workout._id || workout.id || workout.title}><article className="data-card d-block h-100"><div className="d-flex justify-content-between gap-3 mb-3"><span className="activity-tag">{workout.category}</span><span className="muted">{workout.durationMinutes} min</span></div><h3>{workout.title}</h3><p className="muted">{workout.description}</p><small className="text-uppercase fw-semibold">{workout.difficulty}</small></article></div>)}</div>;
}

export default Workouts;