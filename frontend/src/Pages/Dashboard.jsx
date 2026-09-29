import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Dashboard() {
  const [tasks, setTasks]=useState([]);
  const [title, setTitle]=useState('');
  const [description, setDescription]=useState('');
  const navigate=useNavigate();


  const fetchTasks=async()=>{
    try{
      const res=await api.get('/tasks');
      setTasks(res.data);
    }
    catch(err){
      console.error(err);
    }
  };

  useEffect(()=>{
    fetchTasks();
  },[]);

  const handleTasks=async(e)=>{
    e.preventDefault();
    try{
      await api.post('/tasks',{title,description, status :'todo'})
      setTitle('');
      setDescription('');
      fetchTasks();

    }
    catch(err){
      console.error(err);

    }
  };

  const updateStatus=async(tasks, newStatus)=>{
    try{
      await api.put(`/tasks/${tasks.id}`,{...tasks,status : newStatus});

    }
    catch(err){
      console.error(err);
    }
  };
  const deleteTask=async(id)=>{
    try{
      await api.delete(`/tasks/${id}`);
      fetchTasks();

    }
    catch(err){
      console.error(err);
    }
  };

  const handleLogout=async()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    
  };


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