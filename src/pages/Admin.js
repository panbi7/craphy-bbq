import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [reservations, setReservations] = useState([]);
    const [editingReservation, setEditingReservation] = useState(null);

    // 예약 목록 가져오기
    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:3000/reservations');
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchReservations();  // 로그인 후 예약 목록 가져오기
        }
    }, [isAuthenticated]);

    // 로그인 기능
    const handleLogin = () => {
        if (password === '1234') {
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

    // 예약 삭제 기능
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this reservation?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:3000/reservations/${id}`);
            fetchReservations();  // 삭제 후 목록 다시 가져오기
            alert('Reservation deleted successfully');
        } catch (error) {
            console.error('Error deleting reservation:', error);
            alert('Failed to delete reservation');
        }
    };

    // 예약 수정 저장 기능
    const handleSaveEdit = async (id) => {
        const confirmSave = window.confirm("Are you sure you want to save changes?");
        if (!confirmSave) return;

        try {
            await axios.put(`http://localhost:3000/reservations/${id}`, editingReservation);
            fetchReservations();  // 수정 후 목록 다시 가져오기
            setEditingReservation(null);
            alert('Reservation updated successfully');
        } catch (error) {
            console.error('Error updating reservation:', error);
            alert('Failed to update reservation');
        }
    };

    // 수정할 예약 선택 기능
    const handleEdit = (reservation) => {
        setEditingReservation({ ...reservation });
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
                        <div key={reservation.id} style={{ marginBottom: '10px', border: '1px solid #ddd', padding: '10px' }}>
                            {editingReservation && editingReservation.id === reservation.id ? (
                                // 편집 모드
                                <div>
                                    <input
                                        type="text"
                                        value={editingReservation.name}
                                        onChange={(e) =>
                                            setEditingReservation({ ...editingReservation, name: e.target.value })
                                        }
                                    />
                                    <input
                                        type="text"
                                        value={editingReservation.phoneNumber}
                                        onChange={(e) =>
                                            setEditingReservation({ ...editingReservation, phoneNumber: e.target.value })
                                        }
                                    />
                                    <input
                                        type="date"
                                        value={editingReservation.userDate}
                                        onChange={(e) =>
                                            setEditingReservation({ ...editingReservation, userDate: e.target.value })
                                        }
                                    />
                                    <input
                                        type="time"
                                        value={editingReservation.userTime}
                                        onChange={(e) =>
                                            setEditingReservation({ ...editingReservation, userTime: e.target.value })
                                        }
                                    />
                                    <input
                                        type="number"
                                        value={editingReservation.numOfGas}
                                        onChange={(e) =>
                                            setEditingReservation({ ...editingReservation, numOfGas: parseInt(e.target.value) })
                                        }
                                    />
                                    <label>
                                        Icebox Needed:
                                        <input
                                            type="checkbox"
                                            checked={editingReservation.userIcebox}
                                            onChange={(e) =>
                                                setEditingReservation({ ...editingReservation, userIcebox: e.target.checked ? 1 : 0 })
                                            }
                                        />
                                    </label>
                                    <button onClick={() => handleSaveEdit(reservation.id)}>Save</button>
                                    <button onClick={() => setEditingReservation(null)}>Cancel</button>
                                </div>
                            ) : (
                                // 보기 모드
                                <div>
                                    <p><strong>Name:</strong> {reservation.name}</p>
                                    <p><strong>Phone Number:</strong> {reservation.phoneNumber}</p>
                                    <p><strong>Date:</strong> {reservation.userDate}</p>
                                    <p><strong>Time:</strong> {reservation.userTime}</p>
                                    <p><strong>Butane Gas:</strong> {reservation.numOfGas}</p>
                                    <p><strong>Icebox Needed:</strong> {reservation.userIcebox ? 'Yes' : 'No'}</p>
                                </div>
                            )}
                            <button onClick={() => handleEdit(reservation)}>Edit</button>
                            <button onClick={() => handleDelete(reservation.id)}>Delete</button>
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
