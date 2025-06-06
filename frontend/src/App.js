import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Kdigital from '../src/components/Kdigital';
import JobList from '../src/components/JobsList';
import RecoSection from '../src/components/RecoSection';
import MainPage from '../src/components/MainPage';
import FavoritePage from '../src/components/FavoritePage';
import Contestpage from '../src/components/Contestpage';
import Portfolio from '../src/components/Portfolio';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path='/Portfolio' element={<Portfolio/>}/>
        <Route path='/Contestpage' element={<Contestpage/>}/>
        <Route path='/FavoritePage' element={<FavoritePage/>}/>
        <Route path="/JobList" element={<JobList />} />
        <Route path="/Kdigital" element={<Kdigital />} />
        <Route path="/RecoSection" element={<RecoSection/>}/>
        <Route path="/" element={<MainPage/>}/>
      </Routes>
    </Router>
  );
}

export default Main;
