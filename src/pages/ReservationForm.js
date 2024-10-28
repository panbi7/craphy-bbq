import React, { useState } from 'react';
import axios from 'axios';

function ReservationForm() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userDate, setUserDate] = useState('');
    const [userTime, setUserTime] = useState('');
    const [numOfGas, setNumOfGas] = useState(0);
    const [userIcebox, setUserIcebox] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 필수 필드가 채워졌는지 확인
        if (!name || !phoneNumber || !userDate || !userTime) {
            alert("Please fill out all required fields.");
            return;
        }

        try {
            const response = await axios.post('/userData', {
                name,
                phoneNumber,
                userDate,
                userTime,
                numOfGas: numOfGas >= 0 ? numOfGas : 0, // 음수 방지
                userIcebox: userIcebox ? 1 : 0 // SQLite에서는 1/0으로 저장
            });
            alert(response.data);
        } catch (error) {
            console.error('Error saving user data:', error);
            alert('Error saving user data');
        }
    };

    return (
        <div>
            <h2>Create Reservation</h2>
            <form onSubmit={handleSubmit}>
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
                    onChange={(e) => setUserDate(e.target.value)}
                    required
                />
                <input
                    type="time"
                    value={userTime}
                    onChange={(e) => setUserTime(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Number of Butane Gas"
                    value={numOfGas}
                    onChange={(e) => setNumOfGas(Number(e.target.value))}
                    min="0" // 음수 방지
                />
                <label>
                    Need Icebox:
                    <input
                        type="checkbox"
                        checked={userIcebox}
                        onChange={(e) => setUserIcebox(e.target.checked)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ReservationForm;
