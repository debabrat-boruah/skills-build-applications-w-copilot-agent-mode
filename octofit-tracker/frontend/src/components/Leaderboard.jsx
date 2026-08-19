import { EmptyState, ErrorState, LoadingState } from './CollectionStates.jsx';
import { useCollection } from '../hooks.js';

function Leaderboard() {
  const { data, loading, error } = useCollection('leaderboard');

  return (
    <section className="page-section">
      <div className="section-heading">
        <div><p className="eyebrow">Team pulse</p><h1>Leaderboard</h1></div>
        <span className="count-badge">{data.length} athletes</span>
      </div>
      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && data.length === 0 && <EmptyState resource="leaderboard entries" />}
      {!loading && !error && data.length > 0 && (
        <div className="leaderboard-list">{data.map((entry, index) => {
          const user = typeof entry.userId === 'object' ? entry.userId : null;
          return (
            <article className="leader-row" key={entry._id || entry.userId}>
              <span className={`rank rank-${index + 1}`}>{entry.rank || index + 1}</span>
              <div className="avatar">{(user?.name || 'Athlete').charAt(0)}</div>
              <div className="leader-name"><strong>{user?.name || user?.username || 'Athlete'}</strong><span>{user?.username ? `@${user.username}` : 'OctoFit member'}</span></div>
              <strong className="leader-points">{entry.points} pts</strong>
            </article>
          );
        })}</div>
      )}
    </section>
  );
}

export default Leaderboard;
