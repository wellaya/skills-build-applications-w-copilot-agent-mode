export function LoadingState() {
  return <div className="empty-state">Loading your OctoFit data...</div>;
}

export function ErrorState({ message }) {
  return <div className="alert alert-danger mb-0">{message}</div>;
}

export function EmptyState({ label }) {
  return <div className="empty-state">No {label} have been added yet.</div>;
}