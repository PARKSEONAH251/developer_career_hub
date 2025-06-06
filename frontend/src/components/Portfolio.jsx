// Portfolio.jsx
import React, { useEffect, useState } from "react";
import "../styles/Portfolio_style.css";

function PortfolioModal({ open, pin, onClose }) {
  if (!open || !pin) return null;
  return (
    <div
      className="modal-bg active"
      onClick={e => {
        if (e.target.className.includes("modal-bg")) onClose();
      }}
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <img src={pin.image} alt="" />
        <div className="modal-title">{pin.title}</div>
        <div className="modal-cont">{pin.content}</div>
      </div>
    </div>
  );
}

const Portfolio = () => {
  const [pins, setPins] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pins") || "[]");
    setPins(stored);
  }, []);

  const handleImgClick = idx => {
    setSelectedPin(pins[idx]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPin(null);
  };

  return (
    <div>
      <header className="top-header">
        <div className="logo">
          <b>
            DEVELOPER <br /> CAREER HUB
          </b>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="검색어 입력" />
          <button>🔍</button>
        </div>
      </header>
      <div className="nav-bar-wrapper">
        <div className="nav-bar">
          <a href="#">
            <b>취업공고</b>
          </a>
          <a href="#">
            <b>코딩학습</b>
          </a>
          <a href="#">
            <b>공모전</b>
          </a>
          <a href="#">
            <b>포트폴리오</b>
          </a>
          <a href="#">
            <b>마이페이지</b>
          </a>
        </div>
        <div className="login-register">
          <a href="#">LOGIN / REGISTER</a>
        </div>
      </div>
      <div className="uploadBtn">
        <a href="../Portfolio-upload">
          <button className="upBtn">포트폴리오 등록</button>
        </a>
      </div>
      <div id="portfolio-container">
        <main>
          <section id="portfolioList">
            {pins.length === 0 ? (
              <p>등록된 포트폴리오가 없습니다.</p>
            ) : (
              pins.map((pin, idx) => (
                <article className={idx % 2 === 0 ? "odd" : "even"} key={idx}>
                  <div>
                    <img
                      src={pin.image}
                      alt=""
                      style={{ cursor: "pointer" }}
                      onClick={() => handleImgClick(idx)}
                    />
                    <h2>{pin.title}</h2>
                    <p>{pin.content}</p>
                    {pin.link && (
                      <p>
                        <a
                          href={pin.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          사이트로 이동
                        </a>
                      </p>
                    )}
                    {pin.tags && <p>{pin.tags}</p>}
                  </div>
                </article>
              ))
            )}
          </section>
        </main>
        <PortfolioModal open={modalOpen} pin={selectedPin} onClose={closeModal} />
      </div>
    </div>
  );
};

export default Portfolio;
