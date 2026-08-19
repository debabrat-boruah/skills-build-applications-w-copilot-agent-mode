export function LoadingState() {
  return <p className="state-message">Loading your latest data...</p>;
}

export function ErrorState({ message }) {
  return <p className="state-message state-error">{message}</p>;
}

export function EmptyState({ resource }) {
  return <p className="state-message">No {resource} have been added yet.</p>;
}

