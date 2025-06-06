// PortfolioUpload.jsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 추가
import Header from '../layout/header';
import "../styles/Portfolio_upload_style.css";

const PortfolioUpload = () => {
    const navigate = useNavigate(); // ✅ 추가
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
        navigate("/Portfolio"); // ✅ React Router로 페이지 이동
    };

    return (
        <div>
            <Header />
            <h2>포트폴리오 업로드</h2>
            <form id="uploadForm" onSubmit={handleSubmit}>
                <div className="container">
                    <div className="centered-form">
                        <div className="input-img" id="imgBox">
                            {!imageDataUrl && <span id="Text">이미지 업로드</span>}
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

                        <div className="form-fields">
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
                            <button className="submit-btn" type="submit">
                                등록
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PortfolioUpload;
