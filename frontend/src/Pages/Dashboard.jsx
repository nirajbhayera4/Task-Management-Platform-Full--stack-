import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import api from '../api/axios';
import './Dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const boardRef = useRef(null);
  const formRef = useRef(null);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
    // Animate columns in on page load
    gsap.fromTo(
      '.column',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' }
    );
  }, []);

  useEffect(() => {
    // Animate task cards whenever the task list changes
    gsap.fromTo(
      '.task-card',
      { opacity: 0, scale: 0.9, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'back.out(1.5)' }
    );
  }, [tasks]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      // Little "pulse" on the button when clicked
      gsap.fromTo(
        e.target.querySelector('button[type="submit"]'),
        { scale: 0.9 },
        { scale: 1, duration: 0.25, ease: 'back.out(3)' }
      );
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

  const deleteTask = async (id, cardEl) => {
    // Animate out, then delete from backend after animation finishes
    gsap.to(cardEl, {
      opacity: 0,
      x: 50,
      scale: 0.8,
      duration: 0.3,
      ease: 'power1.in',
      onComplete: async () => {
        try {
          await api.delete(`/tasks/${id}`);
          fetchTasks();
        } catch (err) {
          console.error(err);
        }
      },
    });
  };

  const handleLogout = () => {
    gsap.to(boardRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      },
    });
  };

  const columns = ['todo', 'in-progress', 'done'];
  const columnTitles = { todo: 'To Do', 'in-progress': 'In Progress', done: 'Done' };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Tasks</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <form ref={formRef} className="add-task-form" onSubmit={handleAddTask}>
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

      <div className="board" ref={boardRef}>
        {columns.map((col) => (
          <div key={col} className="column">
            <h3>{columnTitles[col]}</h3>
            {tasks
              .filter((t) => t.status === col)
              .map((task) => (
                <div
                  key={task.id}
                  className="task-card"
                  onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2 })}
                  onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
                >
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                  <div className="task-card-footer">
                    <select
                      value={task.status}
                      onChange={(e) => updateStatus(task, e.target.value)}
                    >
                      {columns.map((c) => (
                        <option key={c} value={c}>{columnTitles[c]}</option>
                      ))}
                    </select>
                    <button
                      className="delete-btn"
                      onClick={(e) => deleteTask(task.id, e.target.closest('.task-card'))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;