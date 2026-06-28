import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import FilterBar from './components/FilterBar';
import StatsBar from './components/StatsBar';

const DEFAULT_FILTERS = { search: '', status: 'all', priority: 'all', sort: 'createdAt' };

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { tasks, loading, error, addTask, editTask, removeTask, toggleStatus } = useTasks(filters);

  const handleSubmit = async (data) => {
    if (editingTask) {
      const ok = await editTask(editingTask._id, data);
      if (ok) { setEditingTask(null); setShowForm(false); }
      return ok;
    } else {
      const ok = await addTask(data);
      if (ok) setShowForm(false);
      return ok;
    }
  };

  const handleEdit = (task) => { setEditingTask(task); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleCancel = () => { setEditingTask(null); setShowForm(false); };

  return (
    <div className="app">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">✅</span>
            <span className="logo-text">TaskTracker</span>
          </div>
          {!showForm && (
            <button className="btn-primary" onClick={() => { setEditingTask(null); setShowForm(true); }}>
              + New Task
            </button>
          )}
        </div>
      </header>

      <main className="main">
        {showForm && (
          <div className="form-wrapper">
            <TaskForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editingTask}
            />
          </div>
        )}

        <StatsBar tasks={tasks} />
        <FilterBar filters={filters} onChange={setFilters} />

        {loading && <div className="center-msg">Loading tasks...</div>}
        {error && <div className="center-msg error-msg">{error}</div>}

        {!loading && !error && tasks.length === 0 && (
          <div className="empty-state">
            <p className="empty-icon">📋</p>
            <p>No tasks found. {filters.search || filters.status !== 'all' ? 'Try clearing filters.' : 'Add your first task!'}</p>
          </div>
        )}

        <div className="task-grid">
          {tasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={removeTask}
              onStatusChange={toggleStatus}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
