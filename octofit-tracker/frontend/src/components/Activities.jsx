import { EmptyState, ErrorState, LoadingState } from './CollectionStates.jsx';
import { useCollection } from '../hooks.js';

function Activities() {
  const { data, loading, error } = useCollection('activities');

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Movement log</p>
          <h1>Activities</h1>
        </div>
        <span className="count-badge">{data.length} logged</span>
      </div>
      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && data.length === 0 && <EmptyState resource="activities" />}
      {!loading && !error && data.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Type</th><th>Duration</th><th>Points</th><th>Recorded</th></tr></thead>
            <tbody>{data.map((activity) => (
              <tr key={activity._id || `${activity.type}-${activity.recordedAt}`}>
                <td><strong>{activity.type}</strong></td>
                <td>{activity.durationMinutes} min</td>
                <td><span className="points">+{activity.points}</span></td>
                <td>{activity.recordedAt ? new Date(activity.recordedAt).toLocaleDateString() : 'Recently'}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Activities;
