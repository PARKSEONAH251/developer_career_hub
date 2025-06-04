import React from 'react';
import '../styles/MainPage.css';
import '../styles/CommunitySection.css'; // ⬅️ 선택
import Header from '../layout/header';
import Banner from '../layout/Banner';
import RecoSection from '../components/RecoSection';
import Footer from '../layout/Footer';

function CommunitySection() {
  const posts = [
    { title: 'React 입문 질문', user: 'devKim', date: '2025-05-14', comments: 5 },
    { title: '채용 후기 공유', user: 'alice', date: '2025-05-13', comments: 2 },
    { title: '포트폴리오 피드백', user: 'juniorLee', date: '2025-05-13', comments: 7 },
  ];

  return (
    <section className="community-section">
      <div className="section-header">
        <h3>💬 커뮤니티</h3>
        <a href="#" className="more-link">더 보기 &gt;</a>
      </div>
      <ul className="community-list">
        {posts.map((item, idx) => (
          <li key={idx} className="community-item">
            <a href="#" className="community-title">{item.title}</a>
            <div className="community-meta">
              <span>{item.user}</span>
              <span>{item.date}</span>
              <span>💬 {item.comments}</span>
            </div>
          </li>
        ))}
      </ul>
      <button className="write-btn">글쓰기</button>
    </section>
  );
}

function MainPage() {
  return (
    <div>
      <Header/>
      <main className="main-content">
        <Banner />
        <RecoSection />
        <CommunitySection />
      </main>

      <Footer />
    </div>
  );
}

export default MainPage;
