import { EmptyState, ErrorState, LoadingState } from './CollectionStates.jsx';
import { useCollection } from '../hooks.js';

function Users() {
  const { data, loading, error } = useCollection('users');

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Your community</p><h1>Members</h1></div><span className="count-badge">{data.length} members</span></div>
      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && data.length === 0 && <EmptyState resource="members" />}
      {!loading && !error && data.length > 0 && <div className="member-list">{data.map((user) => (
        <article className="member-row" key={user._id || user.username}>
          <div className="avatar avatar-lime">{(user.name || user.username || '?').charAt(0)}</div>
          <div><strong>{user.name || user.username}</strong><span>@{user.username || 'member'}</span></div>
          <span className="member-email">{user.email}</span>
        </article>
      ))}</div>}
    </section>
  );
}

export default Users;
