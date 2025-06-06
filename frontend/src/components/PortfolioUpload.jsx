// PortfolioUpload.jsx
import React, { useRef, useState } from "react";
import "../styles/Portfolio_upload_style.css";

const PortfolioUpload = () => {
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const imgRef = useRef();

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = evt => {
        setImageDataUrl(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!imageDataUrl) {
      alert("이미지를 업로드하세요!");
      return;
    }
    const pin = {
      image: imageDataUrl,
      title,
      content,
      link,
      tags,
    };
    const pins = JSON.parse(localStorage.getItem("pins") || "[]");
    pins.unshift(pin);
    localStorage.setItem("pins", JSON.stringify(pins));
    alert("등록 완료! 포트폴리오 페이지에서 확인하세요.");
    window.location.href = "portfolio.html"; // 필요에 따라 React Router의 navigate 사용
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
      <h2>포트폴리오 업로드</h2>
      <form id="uploadForm" onSubmit={handleSubmit}>
        <div className="container">
          <div className="left">
            <div className="input-img" id="imgBox">
              {!imageDataUrl && (
                <span id="Text">이미지 업로드</span>
              )}
              {imageDataUrl && (
                <img
                  id="Img"
                  src={imageDataUrl}
                  alt="preview"
                  style={{ display: "block" }}
                  ref={imgRef}
                />
              )}
              <input
                type="file"
                id="imgInput"
                accept="image/*"
                required
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="right">
            <input
              className="input-box"
              type="text"
              name="title"
              id="title"
              placeholder="제목"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              className="input-box"
              name="content"
              id="content"
              placeholder="자세한 설명을 적어주세요"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <input
              className="input-box"
              type="text"
              name="link"
              id="link"
              placeholder="링크 추가"
              value={link}
              onChange={e => setLink(e.target.value)}
            />
            <input
              className="input-box"
              type="text"
              name="tags"
              id="tags"
              placeholder="태그"
              value={tags}
              onChange={e => setTags(e.target.value)}
            />
            <br />
            <button className="submit-btn" type="submit">
              등록
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PortfolioUpload;
