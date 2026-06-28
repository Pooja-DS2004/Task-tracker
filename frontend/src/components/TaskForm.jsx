import { useState, useEffect } from 'react';

const EMPTY = { title: '', description: '', status: 'todo', priority: 'medium', dueDate: '' };

export default function TaskForm({ onSubmit, onCancel, initialData }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'todo',
        priority: initialData.priority || 'medium',
        dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : ''
      });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [initialData]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    else if (form.title.trim().length < 3) e.title = 'Title must be at least 3 characters';
    else if (form.title.length > 100) e.title = 'Title too long (max 100)';
    if (form.description.length > 500) e.description = 'Description too long (max 500)';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSubmitting(true);
    const ok = await onSubmit(form);
    setSubmitting(false);
    if (ok && !initialData) setForm(EMPTY);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">{initialData ? 'Edit Task' : 'New Task'}</h2>

      <div className="field">
        <label>Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="What needs to be done?"
          className={errors.title ? 'error' : ''}
          maxLength={100}
        />
        {errors.title && <span className="err-msg">{errors.title}</span>}
      </div>

      <div className="field">
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add details (optional)"
          rows={3}
          maxLength={500}
          className={errors.description ? 'error' : ''}
        />
        <span className="char-count">{form.description.length}/500</span>
        {errors.description && <span className="err-msg">{errors.description}</span>}
      </div>

      <div className="field-row">
        <div className="field">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="field">
          <label>Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="field">
          <label>Due Date</label>
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Saving...' : initialData ? 'Update Task' : 'Add Task'}
        </button>
        {onCancel && (
          <button type="button" className="btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
