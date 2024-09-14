import React from 'react';
import './App.css';
import Navbar from './component/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from './pages/about';
import Event from './pages/event';
import SignIn from './pages/signin'


function App() {
  return (
    <Router>
      <Navbar>
        <Routes>
          <Route path ="/about" element={<About/>} />
          <Route path ='/event' element={<Event/>} />
          <Route path = '/signin' element={<SignIn/>} />
        </Routes>
      </Navbar>
    </Router>
  );
}

export default App;
