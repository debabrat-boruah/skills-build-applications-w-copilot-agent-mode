import { EmptyState, ErrorState, LoadingState } from './CollectionStates.jsx';
import { useCollection } from '../hooks.js';

function Workouts() {
  const { data, loading, error } = useCollection('workouts');

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Move with intention</p><h1>Workouts</h1></div><span className="count-badge">{data.length} plans</span></div>
      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && data.length === 0 && <EmptyState resource="workouts" />}
      {!loading && !error && data.length > 0 && <div className="card-grid workout-grid">{data.map((workout) => (
        <article className="info-card workout-card" key={workout._id || workout.title}>
          <div className="workout-top"><span className={`difficulty difficulty-${workout.difficulty}`}>{workout.difficulty || 'all levels'}</span><span>{workout.durationMinutes} min</span></div>
          <h2>{workout.title}</h2><p>{workout.description}</p>
          <div className="tag-list">{(workout.activities || []).map((activity) => <span key={activity}>{activity}</span>)}</div>
        </article>
      ))}</div>}
    </section>
  );
}

export default Workouts;
