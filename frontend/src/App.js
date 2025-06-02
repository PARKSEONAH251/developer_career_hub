import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Kdigital from '../src/components/Kdigital';
import JobList from '../src/components/JobsList';
import RecoSection from '../src/components/RecoSection';
import MainPage from '../src/components/MainPage';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/JobList" element={<JobList />} />
        <Route path="/Kdigital" element={<Kdigital />} />
        <Route path="/RecoSection" element={<RecoSection/>}/>
        <Route path="/" element={<MainPage/>}/>
      </Routes>
    </Router>
  );
}

export default Main;
