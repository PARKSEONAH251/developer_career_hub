import React from 'react';
import '../styles/LoginForm.css'; // CSS 분리
import loginImage from '../image/login.jpg'; // 이미지 경로

function LoginForm() {
  return (
    <div className="login-card">
      {/* <img src={loginImage} alt="Login Visual" className="login-visual" /> */}

      <h2 className="login-title">Welcome back!</h2>
      <p className="login-subtitle">Start managing your finance faster and better</p>

      <input type="email" placeholder="you@example.com" className="login-input" />
      <input type="password" placeholder="At least 8 characters" className="login-input" />

      <div className="form-options">
        <a href="#">Forgot password?</a>
      </div>

      <button className="login-btn">Login</button>

      <div className="divider">or</div>

      <div className="social-buttons">
        <button className="google-btn">Google</button>
        <button className="facebook-btn">Facebook</button>
      </div>

      <p className="signup-text">
        Don’t have an account? <a href="#">Sign Up</a>
      </p>
    </div>
  );
}

export default LoginForm;
