import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/FavoritePage.module.css'; // CSS 모듈 import

const FavoritePage = ({
  contests = [],
  favorites = [],
  handleFavorite,
  isLoggedIn
}) => {
  const navigate = useNavigate();
  const favoriteContests = contests.filter(item => favorites.includes(item.제목));

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/')} className={styles.backButton}>
        ← 공모전 리스트로 돌아가기
      </button>

      {favoriteContests.length === 0 ? (
        <p className={styles.emptyMessage}>즐겨찾기한 공모전이 없습니다.</p>
      ) : (
        <div className={styles.grid}>
          {favoriteContests.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <div>
                <img
                  src={item.썸네일}
                  alt={item.제목}
                  className={styles.thumbnail}
                  onError={(e) => e.target.style.display = 'none'}
                />
                <h2 className={styles.title}>{item.제목}</h2>
                <p className={styles.org}>{item.기관}</p>
              </div>

              <div className={styles.cardFooter}>
                <a
                  href={item.상세링크}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.detailLink}
                >
                  상세보기
                </a>

                {isLoggedIn ? (
                  <button
                    onClick={() => handleFavorite(item.제목)}
                    title="즐겨찾기 해제"
                    className={styles.starButton}
                  >
                    🌟
                  </button>
                ) : (
                  <button
                    disabled
                    title="로그인 후 즐겨찾기 가능"
                    className={styles.starButtonDisabled}
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
