import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom';
import api from '../api/axios';
import './Login.css';

function Login(){
    const [email, setEmail]=useState();
    const [password,setPassword]=useState();
    const [error, setError]=useState('');
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError('');
        try{
            const res=await api.post('/auth/login',{email, password});
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('user',JSON.stringify(res.data.user));
            navigate('/dashboard');

        }
        catch(err){
            setError(err.response?.data?.message || 'Login failed');

        }
    }
    return (
        <div style={{maxWidth :400,margin:'50px auto'}}>
            <h2 className="login-heading">Login</h2>
            <form  className="login-form" onSubmit={handleSubmit}>
                <input className="first-input" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required /><br/><br />
                <input className="second-input" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required /><br/><br />

                {error && <p style={{color :'red'}}>{error}</p>}
                <button type="submit">Login</button>
            </form>
            <p className="signup-link">Dont have an account?<Link className="signup-btn"  to="/signup"> Sign up</Link></p>

        </div>
    );

}
export default Login;