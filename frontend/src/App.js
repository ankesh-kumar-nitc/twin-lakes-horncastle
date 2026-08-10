import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DayTicket from './pages/DayTicket';
import Syndicate from './pages/Syndicate';
import StayAndDine from './pages/StayAndDine';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/day-ticket-fishing" element={<DayTicket />} />
          <Route path="/syndicate-lake" element={<Syndicate />} />
          <Route path="/stay-and-dine" element={<StayAndDine />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
