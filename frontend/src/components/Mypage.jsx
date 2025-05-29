import React, { useState, useEffect, useRef } from 'react';
import '../styles/MyPage.css';

// Header Component
function TopHeader() {
  return (
    <header className="top-header">
      <div className="logo">
        <b>DEVELOPER <br /> CAREER HUB</b>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="검색어 입력" />
        <button>🔍</button>
      </div>
    </header>
  );
}

// Navigation Bar Component
function NavBar() {
  return (
    <div className="nav-bar-wrapper">
      <div className="nav-bar">
        <a href="#"><b>취업공고</b></a>
        <a href="#"><b>코딩학습</b></a>
        <a href="#"><b>공모전</b></a>
        <a href="#"><b>포트폴리오</b></a>
        <a href="#"><b>마이페이지</b></a>
      </div>
      <div className="login-register">
        <a href="#">LOGIN / REGISTER</a>
      </div>
    </div>
  );
}

// Profile Card Component
function ProfileCard({ profile, onEdit }) {
  return (
    <section className="mypage-card">
      <div className="card-title">회원정보</div>
      <div className="mypage">
        <img className="mypage-img" src={profile.image || ''} alt="프로필" />
        <div>
          <div><b>이름:</b> <span>{profile.name}</span></div>
          <div><b>이메일:</b> <span>{profile.email}</span></div>
          <div><b>기술스택:</b> <span>{profile.skills}</span></div>
        </div>
      </div>
      <button onClick={onEdit}>수정</button>
    </section>
  );
}

// Portfolio Card List Component
function PortfolioSection({ portfolios, onEdit, onDelete }) {
  return (
    <section className="mypage-card">
      <div className="card-title">포트폴리오</div>
      <div className="portfolio-list">
        {portfolios.length === 0 ? (
          <p>등록된 포트폴리오가 없습니다.</p>
        ) : (
          portfolios.map((pin, idx) => (
            <div className="portfolio-card" key={idx}>
              <img src={pin.image} alt="포트폴리오 이미지" />
              <div className="portfolio-title">{pin.title || '(제목 없음)'}</div>
              <div>{pin.content || ''}</div>
              {pin.link && <div><a href={pin.link} target="_blank" rel="noopener noreferrer">사이트로 이동</a></div>}
              {pin.tags && <div className="portfolio-tags">{pin.tags}</div>}
              <div className="portfolio-actions">
                <button onClick={() => onEdit(idx)}>수정</button>
                <button className="delete" onClick={() => onDelete(idx)}>삭제</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

// Resume Section Component
function ResumeSection({ resume, isLiked, onLike, onEdit }) {
  return (
    <section className="mypage-card">
      <div className="card-title">이력서</div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
        <div style={{ flexGrow: 1 }}>
          {resume.fileType === 'image' && (
            <img src={resume.file} alt="이력서 이미지" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8 }} />
          )}
          {resume.fileType === 'pdf' && (
            <embed src={resume.file} type="application/pdf" width="100%" height="300px" />
          )}
          {!resume.file && <p>등록된 이력서가 없습니다.</p>}
        </div>
        <button
          id="resumeLikeBtn"
          title="이력서 좋아요"
          className={isLiked ? 'liked' : ''}
          onClick={onLike}
        >
          {isLiked ? '👍 취소' : '👍 좋아요'}
        </button>
      </div>
      <button onClick={onEdit}>이력서 등록/수정</button>
    </section>
  );
}

// Profile Modal Component
function ProfileModal({ open, profile, onClose, onSave }) {
  const [editProfile, setEditProfile] = useState(profile);
  const fileInputRef = useRef();

  useEffect(() => {
    setEditProfile(profile);
  }, [profile, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setEditProfile(prev => ({ ...prev, image: evt.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!open) return null;
  return (
    <div className="modal-bg active">
      <div className="modal profile-modal">
        <h3>기본정보 수정</h3>
        <img src={editProfile.image || ''} alt="프로필" />
        <label htmlFor="profileImageInput">이미지</label>
        <input
          type="file"
          id="profileImageInput"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <label htmlFor="editName">이름</label>
        <input
          type="text"
          id="editName"
          name="name"
          value={editProfile.name || ''}
          onChange={handleChange}
          placeholder="이름"
        />
        <label htmlFor="editEmail">이메일</label>
        <input
          type="email"
          id="editEmail"
          name="email"
          value={editProfile.email || ''}
          onChange={handleChange}
          placeholder="이메일"
        />
        <label htmlFor="editSkills">기술스택</label>
        <input
          type="text"
          id="editSkills"
          name="skills"
          value={editProfile.skills || ''}
          onChange={handleChange}
          placeholder="기술스택(,로 구분)"
        />
        <div className="modal-actions">
          <button onClick={() => { onSave(editProfile); fileInputRef.current.value = ''; }}>저장</button>
          <button className="delete" onClick={() => { onClose(); fileInputRef.current.value = ''; }}>취소</button>
        </div>
      </div>
    </div>
  );
}

// (포트폴리오/이력서 모달도 위와 같은 방식으로 구현)

function MyPage() {
  // 상태 선언
  const defaultProfile = { image: '', name: '', email: '', skills: '' };
  const [profile, setProfile] = useState(defaultProfile);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const [portfolios, setPortfolios] = useState([]);
  // 포트폴리오 모달 관련 상태도 추가 필요

  const [resume, setResume] = useState({});
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeLiked, setResumeLiked] = useState(false);

  // 로컬스토리지에서 데이터 불러오기
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile') || '{}');
    setProfile({ ...defaultProfile, ...storedProfile });

    const storedPins = JSON.parse(localStorage.getItem('pins') || '[]');
    setPortfolios(storedPins);

    const storedResume = JSON.parse(localStorage.getItem('resume') || '{}');
    setResume(storedResume);

    const liked = JSON.parse(localStorage.getItem('resumeLiked') || 'false');
    setResumeLiked(liked);
  }, []);

  // 저장 함수들
  const handleProfileSave = (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem('profile', JSON.stringify(newProfile));
    setProfileModalOpen(false);
  };

  // 포트폴리오/이력서 관련 함수도 유사하게 구현

  const handleResumeLike = () => {
    if (!resume.file) {
      alert('이력서가 등록되어 있지 않습니다.');
      return;
    }
    const newLiked = !resumeLiked;
    setResumeLiked(newLiked);
    localStorage.setItem('resumeLiked', JSON.stringify(newLiked));
  };

  return (
    <div>
      <TopHeader />
      <NavBar />
      <h1>마이페이지</h1>
      <div className="container">
        <ProfileCard profile={profile} onEdit={() => setProfileModalOpen(true)} />
        <PortfolioSection
          portfolios={portfolios}
          onEdit={(idx) => {/* 포트폴리오 수정 모달 열기 */}}
          onDelete={(idx) => {
            if (window.confirm('정말 삭제하시겠습니까?')) {
              const newPins = portfolios.filter((_, i) => i !== idx);
              setPortfolios(newPins);
              localStorage.setItem('pins', JSON.stringify(newPins));
            }
          }}
        />
        <ResumeSection
          resume={resume}
          isLiked={resumeLiked}
          onLike={handleResumeLike}
          onEdit={() => setResumeModalOpen(true)}
        />
      </div>
      <ProfileModal
        open={profileModalOpen}
        profile={profile}
        onClose={() => setProfileModalOpen(false)}
        onSave={handleProfileSave}
      />
      {/* 포트폴리오/이력서 모달 컴포넌트도 추가 */}
    </div>
  );
}

export default MyPage;
