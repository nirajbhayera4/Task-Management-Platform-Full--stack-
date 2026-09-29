import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Dashboard() {
  const [tasks, setTasks]=useState([]);
  const [title, setTitle]=useState('');
  const [description, setDescription]=useState('');
  const navigate=useNavigate();


  const fetchTasks=async()=>{};

  useEffect(()=>{
    fetchTasks();
  },[]);

  const handleTasks=async()=>{};

  const updateStatus=async()=>{};
  const deleteTask=async()=>{};

  const handleLogout=async()=>{};


  const columns=['todo','in-progress','done'];
  const columnsTitles={todo : 'To Do', 'in-progress': 'In Progress', done : 'Done'}
  return (
    <div>
      <div>
        <h2>My Tasks</h2>
        <button>Logout</button>
      </div>

      <form action="">
        <input type="text" />
        <input type="text" />
      </form>

      <div>
        
      </div>
    </div>
  );

}