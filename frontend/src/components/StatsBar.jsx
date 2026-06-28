export default function StatsBar({ tasks }) {
  const total = tasks.length;
  const todo = tasks.filter(t => t.status === 'todo').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const done = tasks.filter(t => t.status === 'done').length;
  const overdue = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done').length;

  return (
    <div className="stats-bar">
      <div className="stat"><span className="stat-num">{total}</span><span className="stat-label">Total</span></div>
      <div className="stat"><span className="stat-num blue">{todo}</span><span className="stat-label">To Do</span></div>
      <div className="stat"><span className="stat-num yellow">{inProgress}</span><span className="stat-label">In Progress</span></div>
      <div className="stat"><span className="stat-num green">{done}</span><span className="stat-label">Done</span></div>
      {overdue > 0 && <div className="stat"><span className="stat-num red">{overdue}</span><span className="stat-label">Overdue</span></div>}
    </div>
  );
}
