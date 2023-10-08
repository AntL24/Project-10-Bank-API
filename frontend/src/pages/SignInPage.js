import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/userSlice';

function SignInPage() {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.user.loginStatus);
  const loginError = useSelector((state) => state.user.loginError);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('rememberMe')) {
      setUsername(localStorage.getItem('rememberMe'));
      setRememberMe(true);
    }
  }, []);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ credentials: { email: username, password }, rememberMe }));
  
    if (rememberMe) {
      localStorage.setItem('rememberMe', username);
    } else {
      localStorage.removeItem('rememberMe');
    }
  };

  useEffect(() => {
    let userToken = localStorage.token ? localStorage.token : sessionStorage.token;
    if (userToken) {
    navigate('/user');
    }
  }, [loginStatus, navigate]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        {loginStatus === 'failed' && <p>{loginError}</p>}
        <form onSubmit={handleSubmit} id="sign-in-form">
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              autoComplete="username"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              autoComplete="current-password"
            />
          </div>
          <div className="input-remember">
            <input 
              type="checkbox" 
              id="remember-me" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignInPage;
