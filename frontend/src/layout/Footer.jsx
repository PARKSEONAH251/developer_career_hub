import React from 'react';
import '../styles/Footer.css';
import facebookIcon from '../image/ficon.png';
import instagramIcon from '../image/insticon.png';
import linkedinIcon from '../image/indeedicon.png';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-left">
          <p><strong>DEVELOPER CAREER HUB</strong></p>
          <p>고객센터: 1588-0000 | help@developerhub.co.kr</p>
          <p>© 2025 DEVELOPER CAREER HUB. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <img src={facebookIcon} alt="Facebook" className="footer-icon" />
          <img src={instagramIcon} alt="Instagram" className="footer-icon" />
          <img src={linkedinIcon} alt="LinkedIn" className="footer-icon" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

