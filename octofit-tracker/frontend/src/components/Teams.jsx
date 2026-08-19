import { EmptyState, ErrorState, LoadingState } from './CollectionStates.jsx';
import { useCollection } from '../hooks.js';

function Teams() {
  const { data, loading, error } = useCollection('teams');

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1></div><span className="count-badge">{data.length} teams</span></div>
      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && data.length === 0 && <EmptyState resource="teams" />}
      {!loading && !error && data.length > 0 && <div className="card-grid">{data.map((team) => (
        <article className="info-card" key={team._id || team.name}>
          <div className="card-mark">+</div>
          <h2>{team.name}</h2>
          <p>{team.description || 'A team building consistency together.'}</p>
          <footer>{team.members?.length || 0} members <span>→</span></footer>
        </article>
      ))}</div>}
    </section>
  );
}

export default Teams;
