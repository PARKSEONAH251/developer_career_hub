import React, { useEffect, useState } from 'react';
import '../styles/JobCard.css'; // CSS 분리되어 있는 상태

function Header() {
  return (
    <header className="top-nav">
      <div className="nav-left">
        <img src="/logo192.png" alt="logo" className="nav-logo" />
        <span className="site-title">Developer Career Hub</span>
        <nav className="nav-links">
          <a href="#">채용정보</a>
          <a href="#">부트캠프</a>
          <a href="#">공모전</a>
          <a href="#">포트폴리오</a>
        </nav>
      </div>
      <div className="nav-right">
        <button className="btn-outline">로그인</button>
        <button className="btn-primary">회원가입</button>
      </div>
    </header>
  );
}

function App() {
  const [jobList, setJobList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('http://localhost:8080/api/jobs')
      .then(res => res.json())
      .then(data => {
        setJobList(data);
        setCurrentPage(1);
      });
  }, []);

  const indexOfLastItem = currentPage * visibleCount;
  const indexOfFirstItem = indexOfLastItem - visibleCount;
  const currentItems = jobList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(jobList.length / visibleCount);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleVisibleCountChange = (count) => {
    setVisibleCount(count);
    setCurrentPage(1);
  };

  return (
    <div>
      <Header />

      <div className="container">
        <h1 className="title">📋 채용 공고 목록</h1>

        {/* 보기 개수 선택 */}
        <div className="button-group">
          <button onClick={() => handleVisibleCountChange(10)}>10개 보기</button>
          <button onClick={() => handleVisibleCountChange(20)}>20개 보기</button>
          <button onClick={() => handleVisibleCountChange(50)}>50개 보기</button>
        </div>

        {/* 카드형 UI */}
        <div className="card-grid">
          {currentItems.map((job, idx) => (
            <div key={idx} className="job-card-box">
              <div className="job-card-header">
                <img src={job.companyLogo} alt="로고" className="company-logo" />
              </div>
              <div className="job-card-body">
                <h3 className="job-title">{job.jobTitle}</h3>
                <p className="company-name">{job.companyName}</p>
                <p className="job-meta">📍 {job.workLocation} · 💼 {job.career || '경력무관'}</p>
                <p className="job-deadline">⏰ {job.deadline || '마감일 미정'}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="pagination">
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>«</button>
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>‹</button>

          {Array.from({ length: totalPages }, (_, idx) => idx + 1)
            .slice(
              Math.max(currentPage - 5, 0),
              Math.min(Math.max(currentPage - 5, 0) + 10, totalPages)
            )
            .map((num) => (
              <button
                key={num}
                className={currentPage === num ? 'active' : ''}
                onClick={() => handlePageChange(num)}
              >
                {num}
              </button>
            ))}

          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>›</button>
          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>»</button>
        </div>
      </div>
    </div>
  );
}

export default App;
