import React from 'react';
import styles from '../styles/header.module.css';
import signupIcon from '../image/signupicon.png';
import workIcon from '../image/workicon.png';
import loginIcon from '../image/loginicon.png';

const Heard = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logoSection}>
          <img src={workIcon} alt="logo" className={styles.logoIcon} />
          <span className={styles.logoText}>Developer Dareer Hub</span>
        </div>
        <nav className={styles.navMenu}>
          <a href="#">채용정보</a>
          <a href="#">부트캠프</a>
          <a href="#">공모전</a>
          <a href="#">포트폴리오</a>
        </nav>
      </div>
      <div className={styles.authSection}>
        <button className={styles.loginBtn}>
          <img src={loginIcon} alt="login" className={styles.icon} />
          로그인
        </button>
        <button className={styles.signupBtn}>
          <img src={signupIcon} alt="signup" className={styles.icon} />
          회원가입
        </button>
      </div>
    </header>
  );
};

export default Heard;