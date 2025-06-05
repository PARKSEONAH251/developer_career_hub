// src/pages/Kdigital.jsx
import React, { useEffect, useState } from 'react';
import Header from '../layout/header';
import '../styles/Kdigital.css'; // CSS 분리

function Kdigital() {
  const [dataList, setDataList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('http://localhost:8080/api/kdigital')
      .then((res) => res.json())
      .then((data) => {
        setDataList(data);
        setCurrentPage(1);
      });
  }, []);

  const indexOfLastItem = currentPage * visibleCount;
  const indexOfFirstItem = indexOfLastItem - visibleCount;
  const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataList.length / visibleCount);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleVisibleCountChange = (count) => {
    setVisibleCount(count);
    setCurrentPage(1);
  };

  // 주소와 전화번호 분리 함수
  const splitAddressAndPhone = (addressPhone) => {
    if (!addressPhone || typeof addressPhone !== 'string') {
      return { address: '정보 없음', phone: '정보 없음' };
    }

    // 전각 괄호 → 반각 괄호로 변환
    const normalized = addressPhone.replace(/（/g, '(').replace(/）/g, ')');

    console.log('📦 원본 addressPhone:', addressPhone);
    console.log('🛠️ 정규화된 normalized:', normalized);

    // 괄호 안의 전화번호 추출
    const phoneMatch = normalized.match(/\((.*?)\)/);
    const phone = phoneMatch ? phoneMatch[1].trim() : '';

    // 괄호 제거한 나머지를 주소로 간주
    const address = normalized.replace(/\(.*?\)/, '').trim();

    return {
      address: address || '정보 없음',
      phone: phone || '정보 없음',
    };
  };

  return (
    <div>
      <Header />
      <div className="kd-container">
        {/* <h1 className="kd-title">📚 K-Digital Training 목록</h1> */}

        <div className="kd-button-group">
          <button onClick={() => handleVisibleCountChange(10)}>10개 보기</button>
          <button onClick={() => handleVisibleCountChange(20)}>20개 보기</button>
          <button onClick={() => handleVisibleCountChange(50)}>50개 보기</button>
        </div>

        <div className="kd-card-grid">
          {currentItems.map((item, idx) => {
            const { address, phone } = splitAddressAndPhone(item.addressPhone);
            return (
              <div key={idx} className="kd-card-box">
                <div className="kd-card-body">
                  <h3 className="kd-course-name">{item.courseName}</h3>
                  <p className="kd-meta">🏫 훈련기관: {item.trainingInstitution || '정보 없음'}</p>
                  <p className="kd-meta">📍 주소: {address}</p>
                  <p className="kd-meta">📞 전화: {phone}</p>
                  <p className="kd-meta">⏰ 훈련기간: {item.trainingPeriod || '정보 없음'}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="kd-pagination">
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>«</button>
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>‹</button>

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

          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>›</button>
          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>»</button>
        </div>
      </div>
    </div>
  );
}

export default Kdigital;
