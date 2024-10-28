// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ReservationForm from './pages/ReservationForm';
import WaitingList from './pages/WaitingList';
import Admin from './pages/Admin';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<ReservationForm />} />
                <Route path="/waiting-list" element={<WaitingList />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}

export default App;
