import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

function Home() {
    const [date, setDate] = useState(new Date());
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        // 서버에서 예약 데이터를 가져와서 상태에 저장
        const fetchReservations = async () => {
            try {
                const response = await axios.get('/reservations');
                setReservations(response.data); // 서버에서 받아온 데이터를 상태로 설정
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
    };

    // 선택한 날짜의 예약을 필터링하여 보여줍니다.
    const selectedDateReservations = reservations.filter(
        reservation => reservation.userDate === date.toISOString().split('T')[0]
    );

    return (
        <div>
            <h2>Home Page</h2>
            <Calendar onChange={handleDateChange} value={date} />
            <h3>Reservations for {date.toDateString()}</h3>
            {selectedDateReservations.length > 0 ? (
                selectedDateReservations.map(reservation => (
                    <div key={reservation.id} style={{ margin: '10px 0' }}>
                        <p>
                            {reservation.name} - Status: {reservation.status || 'Pending'}
                        </p>
                    </div>
                ))
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
