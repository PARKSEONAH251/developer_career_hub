import React from 'react';
import { useNavigate } from 'react-router-dom';

const FavoritePage = ({ contests, favorites, handleFavorite, isLoggedIn }) => {
  const navigate = useNavigate();

  const favoriteContests = contests.filter(item => favorites.includes(item.제목));

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: '0 20px' }}>
      {/* 돌아가기 버튼 */}
      <button
        onClick={() => navigate('/')}
        style={{
          marginBottom: 20,
          padding: '20px 30px',
          backgroundColor: '#2d6cdf',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: 20,
          boxShadow: '0 2px 6px rgba(45,108,223,0.5)'
        }}
      >
        ← 공모전 리스트로 돌아가기
      </button>

      {/* <h1 style={{ textAlign: 'center', marginBottom: 30, color: '#2d6cdf' }}>
        즐겨찾기 목록
      </h1> */}

      {favoriteContests.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: 18, color: '#777' }}>
          즐겨찾기한 공모전이 없습니다.
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 20
        }}>
          {favoriteContests.map((item, idx) => (
            <div key={idx} style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <img
                  src={item.썸네일}
                  alt={item.제목}
                  style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 6 }}
                  onError={(e) => e.target.style.display = 'none'}
                />
                <h2 style={{ margin: '12px 0 6px', fontSize: 20, color: '#333' }}>
                  {item.제목}
                </h2>
                <p style={{ margin: '0 0 10px', color: '#555' }}>{item.기관}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a
                  href={item.상세링크}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    color: '#2d6cdf',
                    fontWeight: 'bold',
                    fontSize: 14
                  }}
                >
                  상세보기
                </a>

                {isLoggedIn ? (
                  <button
                    onClick={() => handleFavorite(item.제목)}
                    title="즐겨찾기 해제"
                    style={{
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                      fontSize: 24,
                      color: '#f39c12',
                      userSelect: 'none',
                      padding: 0
                    }}
                  >
                    🌟
                  </button>
                ) : (
                  <button
                    disabled
                    title="로그인 후 즐겨찾기 가능"
                    style={{
                      fontSize: 24,
                      color: '#ccc',
                      background: 'none',
                      border: 'none',
                      userSelect: 'none',
                      padding: 0
                    }}
                  >
                    🌟
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
