import React, { useEffect, useState } from 'react';
import '../styles/Contestpage.css';

const categories = ["전체", "AI", "웹개발", "프론트엔드", "백엔드", "게임", "데이터분석", "클라우드/DevOps", "풀스택", "모바일앱", "기타"];

const ContestPage = ({ isLoggedIn, favorites, handleFavorite }) => {
  const [contests, setContests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;

  const matchCategory = (item) => {
    const text = `${item.제목} ${item.기관}`.toLowerCase();
    if (text.includes("ai")) return "AI";
    if (text.includes("웹") || text.includes("html") || text.includes("javascript")) return "웹개발";
    if (text.includes("프론트")) return "프론트엔드";
    if (text.includes("백엔드")) return "백엔드";
    if (text.includes("게임")) return "게임";
    if (text.includes("데이터") || text.includes("분석")) return "데이터분석";
    if (text.includes("클라우드") || text.includes("aws") || text.includes("docker")) return "클라우드/DevOps";
    if (text.includes("풀스택")) return "풀스택";
    if (text.includes("모바일") || text.includes("android") || text.includes("ios")) return "모바일앱";
    return "기타";
  };

  const calculateDday = (deadline) => {
    if (!deadline) return Infinity;
    const today = new Date();
    return Math.ceil((new Date(deadline) - today) / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    fetch('/talkdata.json')
      .then((res) => res.json())
      .then((data) => {
        const labeled = data.map((item) => ({
          ...item,
          category: matchCategory(item),
          dday: calculateDday(item.마감일),
          등록일: item.등록일 || "2024-01-01"
        }));
        setContests(labeled);
        setFiltered(labeled);
      });
  }, []);

  const filterData = (term, category) => {
    let result = contests;

    if (category !== "전체") {
      result = result.filter((item) => item.category === category);
    }

    if (term) {
      const lowerTerm = term.toLowerCase();
      result = result.filter(item =>
        item.제목.toLowerCase().includes(lowerTerm) ||
        item.기관.toLowerCase().includes(lowerTerm)
      );
    }

    result.sort((a, b) => a.dday - b.dday);
    setFiltered(result);
  };

  const handleFilter = (category) => {
    setSelected(category);
    setCurrentPage(1);
    filterData(searchTerm, category);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    filterData(e.target.value, selected);
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div>
      {/* 헤더 및 네비게이션 */}
      <header className="top-header">
        <div className="logo">
          <b>DEVELOPER <br /> CAREER HUB</b>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="검색어 입력" />
          <button>🔍</button>
        </div>
      </header>
      <div className="nav-bar-wrapper">
        <div className="nav-bar">
          <a href="#"><b>취업공고</b></a>
          <a href="#"><b>코딩학습</b></a>
          <a href="#"><b>공모전</b></a>
          <a href="#"><b>커뮤니티</b></a>
          <a href="#"><b>마이페이지</b></a>
        </div>
        <div className="login-register">
          <a href="#">LOGIN / REGISTER</a>
        </div>
      </div>

      {/* 공모전 리스트 본문 */}
      <div className="contest-container">
        <h1>
          <a href="http://localhost:59408/" style={{ textDecoration: 'none', color: 'inherit' }}>
            공모전 리스트
          </a>
        </h1>

        <input
          type="text"
          placeholder="공모전 제목이나 기관 검색"
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />

        <div className="category-buttons">
          {categories.map(cat => (
            <button key={cat} onClick={() => handleFilter(cat)} className={selected === cat ? 'active' : ''}>
              {cat}
            </button>
          ))}
        </div>

        <div className="contest-grid">
          {currentItems.map((item, index) => (
            <div className="contest-card" key={index}>
              <button
                className={`favorite-star ${favorites.includes(item.제목) ? 'active' : ''}`}
                onClick={() => {
                  if (!isLoggedIn) {
                    alert("로그인이 필요합니다.");
                    return;
                  }
                  handleFavorite(item.제목);
                }}
                title="즐겨찾기"
              >🌟</button>
              <img src={item.썸네일} alt="썸네일" onError={(e) => e.target.style.display = 'none'} />
              <h2>{item.제목}</h2>
              <p>{item.기관}</p>
              <a href={item.상세링크} target="_blank" rel="noopener noreferrer">상세보기</a>
            </div>
          ))}
        </div>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContestPage;
