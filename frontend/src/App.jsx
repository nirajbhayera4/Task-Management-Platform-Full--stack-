import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';  
import Signup from './Pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './Pages/Landing';




function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
      
    </Routes>
    
    
    </BrowserRouter>
  );
}

export default App;
