import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { title, description, status: 'todo' });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (task, newStatus) => {
    try {
      await api.put(`/tasks/${task.id}`, { ...task, status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const columns = ['todo', 'in-progress', 'done'];
  const columnTitles = { todo: 'To Do', 'in-progress': 'In Progress', done: 'Done' };

  return (
    <div style={{ maxWidth: 900, margin: '30px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>My Tasks</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <form onSubmit={handleAddTask} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <div style={{ display: 'flex', gap: 20 }}>
        {columns.map((col) => (
          <div key={col} style={{ flex: 1, border: '1px solid #ccc', padding: 10 }}>
            <h3>{columnTitles[col]}</h3>
            {tasks
              .filter((t) => t.status === col)
              .map((task) => (
                <div key={task.id} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}>
                  <strong>{task.title}</strong>
                  <p style={{ fontSize: 13 }}>{task.description}</p>
                  <select
                    value={task.status}
                    onChange={(e) => updateStatus(task, e.target.value)}
                  >
                    {columns.map((c) => (
                      <option key={c} value={c}>{columnTitles[c]}</option>
                    ))}
                  </select>
                  <button onClick={() => deleteTask(task.id)} style={{ marginLeft: 8 }}>
                    Delete
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;