import React, { useEffect, useState } from 'react';
import { matchCategory } from '../utils/matchCategory';
import Header from '../layout/header';
import '../styles/JobCard.css';

function App() {
  const [jobList, setJobList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchTerm, setSearchTerm] = useState(""); // ✅ 검색어 상태

  useEffect(() => {
    fetch('http://localhost:8080/api/jobs')
      .then(res => res.json())
      .then(data => {
        const categorized = data.map(item => ({
          ...item,
          category: matchCategory(item)
        }));
        setJobList(categorized);
        setCurrentPage(1);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const categories = ["전체", "프론트엔드", "백엔드", "웹개발", "AI", "데이터분석", "게임", "클라우드/DevOps", "풀스택", "모바일앱", "기타"];

  const filteredList = jobList
    .filter(item =>
      selectedCategory === "전체" || item.category === selectedCategory
    )
    .filter(item =>
      item.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastItem = currentPage * visibleCount;
  const indexOfFirstItem = indexOfLastItem - visibleCount;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredList.length / visibleCount);

  const handlePageChange = (pageNum) => setCurrentPage(pageNum);

  const handleVisibleCountChange = (count) => {
    setVisibleCount(count);
    setCurrentPage(1);
  };

  return (
    <div>
      <Header />

      {/* 🔍 검색창 */}
      <input
        type="text"
        placeholder="제목이나 회사 검색"
        className="search-input"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="container">
        {/* 카테고리 필터 */}
        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 채용 카드 리스트 */}
        <div className="card-grid">
          {currentItems.map((job, idx) => (
            <div key={idx} className="job-card-box">
              <div className="job-card-header">
                <img src={job.companyLogo} alt="로고" className="company-logo" />
              </div>
              <div className="job-card-body">
                <h3 className="job-title">{job.jobTitle}</h3>
                <p className="company-name">{job.companyName}</p>
                <p className="job-category">📂 {job.category}</p>
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
            .slice(Math.max(currentPage - 5, 0), Math.min(Math.max(currentPage - 5, 0) + 10, totalPages))
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
