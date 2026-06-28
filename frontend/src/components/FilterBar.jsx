export default function FilterBar({ filters, onChange }) {
  const handle = (key, val) => onChange({ ...filters, [key]: val });

  return (
    <div className="filter-bar">
      <input
        className="search-input"
        placeholder="🔍 Search tasks..."
        value={filters.search || ''}
        onChange={e => handle('search', e.target.value)}
      />

      <select value={filters.status || 'all'} onChange={e => handle('status', e.target.value)}>
        <option value="all">All Status</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select value={filters.priority || 'all'} onChange={e => handle('priority', e.target.value)}>
        <option value="all">All Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <select value={filters.sort || 'createdAt'} onChange={e => handle('sort', e.target.value)}>
        <option value="createdAt">Newest First</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="title">Title A-Z</option>
      </select>

      <button className="btn-ghost" onClick={() => onChange({ search: '', status: 'all', priority: 'all', sort: 'createdAt' })}>
        Clear
      </button>
    </div>
  );
}
