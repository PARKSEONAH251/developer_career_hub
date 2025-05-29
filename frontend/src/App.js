// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobsList from "./components/JobsList";
import PortfolioUpload from "./components/PortfolioUpload";
import Mypage from "./components/Mypage";
import Portfolio from "./components/Portfolio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobsList />} />
        <Route path="/portfolio-upload" element={<PortfolioUpload />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
