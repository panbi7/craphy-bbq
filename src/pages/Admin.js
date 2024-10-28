// pages/Admin.js
import React, { useState } from 'react';

function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [reservations, setReservations] = useState([
        { id: 1, name: 'John Doe', status: 'Pending' },
        { id: 2, name: 'Jane Smith', status: 'Pending' }
    ]);

    // 로그인 기능
    const handleLogin = () => {
        if (password === 'craphy0323@') {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect Password');
        }
    };

    // 로그아웃 기능
    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword('');
    };

    // 예약 승인 기능
    const handleApprove = (id) => {
        setReservations(prevReservations =>
            prevReservations.map(reservation =>
                reservation.id === id ? { ...reservation, status: 'Approved' } : reservation
            )
        );
    };

    // 예약 확정(fix) 기능
    const handleFix = (id) => {
        setReservations(prevReservations =>
            prevReservations.map(reservation =>
                reservation.id === id ? { ...reservation, status: 'Fixed' } : reservation
            )
        );
    };

    return (
        <div>
            <h2>Admin Page</h2>
            {isAuthenticated ? (
                <div>
                    <p>Admin Mode Enabled</p>
                    <button onClick={handleLogout}>Logout</button>
                    <h3>Reservation List</h3>
                    {reservations.map(reservation => (
                        <div key={reservation.id} style={{ marginBottom: '10px' }}>
                            <p>{reservation.name} - Status: {reservation.status}</p>
                            {reservation.status === 'Pending' && (
                                <button onClick={() => handleApprove(reservation.id)}>Approve</button>
                            )}
                            {reservation.status === 'Approved' && (
                                <button onClick={() => handleFix(reservation.id)}>Fix</button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <input
                        type="password"
                        placeholder="Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
}

export default Admin;
