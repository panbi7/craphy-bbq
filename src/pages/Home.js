import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

function Home() {
    const [date, setDate] = useState(new Date());
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:3000/reservations'); // URL에 호스트 명시
                setReservations(response.data);
                console.log("Reservations fetched:", response.data); // 데이터 확인
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
    };

    // 선택한 날짜에 맞는 예약만 필터링
    const selectedDateReservations = reservations.filter(
        reservation => reservation.userDate === date.toISOString().split('T')[0]  // 날짜 형식 맞춤
    );

    return (
        <div>
            <h2>Home Page</h2>
            <Calendar onChange={handleDateChange} value={date} />
            <h3>Reservations for {date.toDateString()}</h3>
            {selectedDateReservations.length > 0 ? (
                <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone Number</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Time</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Butane Gas</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Icebox Needed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedDateReservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{reservation.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{reservation.phoneNumber}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{reservation.userTime}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{reservation.numOfGas}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {reservation.userIcebox ? 'Yes' : 'No'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No reservations for this date.</p>
            )}
            <Link to={`/create?date=${date.toISOString().split('T')[0]}`}>
                <button style={{ marginTop: '20px' }}>
                    Create Reservation for {date.toDateString()}
                </button>
            </Link>
        </div>
    );
}

export default Home;