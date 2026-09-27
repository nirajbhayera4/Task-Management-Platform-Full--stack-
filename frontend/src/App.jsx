import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';  
import Signup from './Pages/Signup';



function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>

    </Routes>
    
    
    </BrowserRouter>
  );
}

export default App;