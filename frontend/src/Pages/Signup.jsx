import { useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import api from '../api/axios';
import './Signup.css';

function Signup(){
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error, setError]=useState('');
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError('');
        try{
            await api.post('/auth/signup',{name, email, password});
            navigate('/login');

        }
        catch(err){
            setError(err.response?.data?.message || 'Sign up failed');

        }
    }

    return (
        <div className="signup-container">
            <h2 className="signup-heading">Sign up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input className="input-field" type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required/><br/><br/>
                <input className="input-field" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/><br/><br/>
                <input className="input-field" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/><br/><br/>
                {error && <p style={{color :'red'}}>{error}</p>}
                <button className="login-btn" type="submit">Sign up</button>

                
                

            </form>
            <p className="login-link">-Already have an account?<Link className="login-btn" to="/login">Login</Link></p>
        </div>
    );

}
export default Signup;