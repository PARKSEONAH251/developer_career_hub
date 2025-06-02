// src/components/RecoSection.jsx
import React, { useEffect, useState } from 'react';
import "../styles/RecoSection.css";

function RecoSection() {
  const [jobs, setJobs] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // 채용 공고 상위 5개
    fetch('http://localhost:8080/api/jobs')
      .then(res => res.json())
      .then(data => {
        const sliced = data.slice(0, 4);
        const mapped = sliced.map(item => ({
          company: item.companyName,
          position: item.jobTitle,
        }));
        setJobs(mapped);
      });

    // Kdigital 상위 5개
    fetch('http://localhost:8080/api/kdigital')
      .then(res => res.json())
      .then(data => {
        const sliced = data.slice(0, 4);
        const mapped = sliced.map(item => ({
          title: item.courseName,
          desc: item.trainingInstitution,
        }));
        setCourses(mapped);
      });
  }, []);

  return (
    <div className="reco-container">
      {/* 추천 채용 */}
      <section className="popular-jobs-section">
        <h3>🔥 추천 채용 정보</h3>
        <div className="card-grid">
          {jobs.map((job, idx) => (
            <div key={idx} className="card">
              <h4>{job.company}</h4>
              <p>{job.position}</p>
              <button>자세히 보기</button>
            </div>
          ))}
        </div>
      </section>

      {/* 추천 강의 */}
      <section className="recommended-courses-section">
        <h3>🎓 추천 교육 과정</h3>
        <div className="card-grid">
          {courses.map((course, idx) => (
            <div key={idx} className="card">
              <h4>{course.title}</h4>
              <p>{course.desc}</p>
              <button>수강하기</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RecoSection;
