import React, { useEffect, useState } from 'react';
import Header from '../layout/header';
import '../styles/Kdigital.css';
import { matchCategory } from '../utils/matchCategory';
import { splitAddressAndPhone } from '../utils/getRegion';

function Kdigital() {
  const [dataList, setDataList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion1, setSelectedRegion1] = useState("전체");
  const [selectedRegion2, setSelectedRegion2] = useState("전체");

  const [region1Options, setRegion1Options] = useState([]);
  const [region2Options, setRegion2Options] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/kdigital')
      .then((res) => res.json())
      .then((data) => {
        const categorized = data.map(item => {
          const { address, phone, region1, region2 } = splitAddressAndPhone(item.addressPhone);
          return {
            ...item,
            category: matchCategory(item),
            address,
            phone,
            region1,
            region2
          };
        });

        // 시/도 중복 제거
        const uniqueRegion1 = [...new Set(categorized.map(item => item.region1))].filter(r => r && r !== '정보 없음');
        setRegion1Options(["전체", ...uniqueRegion1]);
        setDataList(categorized);
        setCurrentPage(1);
      });
  }, []);

  useEffect(() => {
    // 시/군/구 중복 제거
    const filtered = selectedRegion1 === "전체"
      ? dataList
      : dataList.filter(item => item.region1 === selectedRegion1);

    const uniqueRegion2 = [...new Set(filtered.map(item => item.region2))].filter(r => r && r !== '정보 없음');
    setRegion2Options(["전체", ...uniqueRegion2]);
    setSelectedRegion2("전체"); // 상위 지역 선택 시 하위 지역 초기화
  }, [selectedRegion1, dataList]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredList = dataList
    .filter(item => selectedRegion1 === "전체" || item.region1 === selectedRegion1)
    .filter(item => selectedRegion2 === "전체" || item.region2 === selectedRegion2)
    .filter(item =>
      (item.courseName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.trainingInstitution || '').toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="kd-container">
        {/* 🔍 검색창 */}
        <input
          type="text"
          placeholder="과정명 또는 훈련기관 검색"
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* 📍 지역 필터링 */}
        <div className="region-selectors">
          <select
            value={selectedRegion1}
            onChange={(e) => setSelectedRegion1(e.target.value)}
          >
            {region1Options.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>

          <select
            value={selectedRegion2}
            onChange={(e) => setSelectedRegion2(e.target.value)}
          >
            {region2Options.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* 카드 리스트 */}
        <div className="kd-card-grid">
          {currentItems.map((item, idx) => (
            <div key={idx} className="kd-card-box">
              <div className="kd-card-body">
                <h3 className="kd-course-name">{item.courseName}</h3>
                <p className="kd-meta">🏫 훈련기관: {item.trainingInstitution || '정보 없음'}</p>
                <p className="kd-meta">📍 주소: {item.address}</p>
                <p className="kd-meta">📞 전화: {item.phone}</p>
                <p className="kd-meta">📂 분야: {item.category || '분류 안됨'}</p>
                <p className="kd-meta">⏰ 훈련기간: {item.trainingPeriod || '정보 없음'}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="kd-pagination">
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

export default Kdigital;
