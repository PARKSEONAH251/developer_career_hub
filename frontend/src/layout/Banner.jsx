import React from 'react';
import '../styles/Banner.css';
import bannerImg from '../image/banner-img.png';

function Banner() {
    return (
        <section className="main-banner">
            <div className="banner-content">
                <div className="banner-text">
                    <h2>최신 개발자 채용 정보</h2>
                    <p>지금 회원가입 후 공고 확인</p>
                    <button onClick={() => alert('회원가입 페이지로 이동')}>회원가입</button>
                </div>
                <div className="banner-image">
                    {/* <img src={bannerImg} alt="취업공고" /> */}
                </div>
            </div>
        </section>
    )
}

export default Banner;