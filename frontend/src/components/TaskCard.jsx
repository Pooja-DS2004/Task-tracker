import { useState } from 'react';

const STATUS_LABELS = { todo: 'To Do', 'in-progress': 'In Progress', done: 'Done' };
const PRIORITY_COLORS = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' };
const STATUS_NEXT = { todo: 'in-progress', 'in-progress': 'done', done: 'todo' };
const STATUS_NEXT_LABEL = { todo: '▶ Start', 'in-progress': '✓ Done', done: '↺ Reopen' };

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [confirming, setConfirming] = useState(false);

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  return (
    <div className={`task-card status-${task.status} ${isOverdue ? 'overdue' : ''}`}>
      <div className="card-header">
        <div className="priority-dot" style={{ background: PRIORITY_COLORS[task.priority] }} title={task.priority + ' priority'} />
        <span className={`status-badge badge-${task.status}`}>{STATUS_LABELS[task.status]}</span>
        <div className="card-actions">
          <button className="icon-btn" onClick={() => onEdit(task)} title="Edit">✏️</button>
          {confirming ? (
            <>
              <button className="icon-btn danger" onClick={() => { onDelete(task._id); setConfirming(false); }} title="Confirm delete">✓</button>
              <button className="icon-btn" onClick={() => setConfirming(false)} title="Cancel">✕</button>
            </>
          ) : (
            <button className="icon-btn" onClick={() => setConfirming(true)} title="Delete">🗑️</button>
          )}
        </div>
      </div>

      <h3 className={`card-title ${task.status === 'done' ? 'strikethrough' : ''}`}>{task.title}</h3>

      {task.description && <p className="card-desc">{task.description}</p>}

      <div className="card-footer">
        {task.dueDate && (
          <span className={`due-date ${isOverdue ? 'overdue-text' : ''}`}>
            📅 {formatDate(task.dueDate)}{isOverdue ? ' · Overdue' : ''}
          </span>
        )}
        <button
          className={`quick-status btn-status-${STATUS_NEXT[task.status]}`}
          onClick={() => onStatusChange(task._id, STATUS_NEXT[task.status])}
        >
          {STATUS_NEXT_LABEL[task.status]}
        </button>
      </div>
    </div>
  );
}
