import React from 'react';
import '../styles/login.css';
import LoginForm from '../login/LoginForm';

function Login() {
  return (
    <div className="login-container">
      <div className="login-left" />
      <div className="login-right">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
