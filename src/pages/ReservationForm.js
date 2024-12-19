import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/ReservationForm.css';

function ReservationForm() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userDate, setUserDate] = useState('');
    const [userTime, setUserTime] = useState('');
    const [numOfGas, setNumOfGas] = useState(0);
    const [userIcebox, setUserIcebox] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();  // useNavigate 훅 추가

    // URL 파라미터에서 날짜 가져오기
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const date = queryParams.get('date');
        if (date) setUserDate(date);
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:3000/userData', {
                name,
                phoneNumber,
                userDate,
                userTime,
                numOfGas,
                userIcebox: userIcebox ? 1 : 0
            });
            console.log("Server response:", response.data);  // 서버 응답 확인
            alert(response.data);

            navigate("/");
        } catch (error) {
            console.error('Error saving user data:', error);
            alert('Error saving user data');
        }
    };
    return (
        <div className="reservation-container">
            <h2>Create Reservation</h2>
            <form className="reservation-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={userDate}
                    readOnly
                />
                <p>Reservation Time</p>
                <input
                    type="time"
                    value={userTime}
                    onChange={(e) => setUserTime(e.target.value)}
                    required
                />
                <p>Number of Butane Gas</p>
                <input
                    type="number"
                    value={numOfGas}
                    onChange={(e) => setNumOfGas(Number(e.target.value))}
                    min="0"
                />
                <label>
                    <input
                        type="checkbox"
                        checked={userIcebox}
                        onChange={(e) => setUserIcebox(e.target.checked)}
                    />
                    Need Icebox
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );    
}

export default ReservationForm;