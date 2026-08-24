import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Charts from './pages/Charts';
import Starline from './pages/Starline';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans antialiased text-zinc-100 selection:bg-accent-500/30">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/starline" element={<Starline />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
