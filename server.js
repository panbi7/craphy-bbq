const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');  // 경로를 처리하기 위한 모듈

const app = express();
const PORT = 3000;  // 하나의 포트로 실행합니다.

app.use(cors());
app.use(express.json());

// SQLite 데이터베이스 연결 설정
const db = new sqlite3.Database('./BBQ_userData.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the BBQ_userData SQLite database.');
    }
});

// 테이블 생성 (존재하지 않을 경우에만)
db.run(`
    CREATE TABLE IF NOT EXISTS userData (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phoneNumber TEXT NOT NULL,
        userDate TEXT NOT NULL,
        userTime TEXT NOT NULL,
        numOfGas INTEGER,
        userIcebox INTEGER
    )
`);

// 사용자 데이터를 데이터베이스에 저장하는 POST 엔드포인트
app.post('/userData', (req, res) => {
    const { name, phoneNumber, userDate, userTime, numOfGas, userIcebox } = req.body;

    // 데이터가 제대로 전달되는지 확인
    console.log("Received data:", req.body);

    const query = `INSERT INTO userData (name, phoneNumber, userDate, userTime, numOfGas, userIcebox) VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(query, [name, phoneNumber, userDate, userTime, numOfGas || 0, userIcebox ? 1 : 0], function (err) {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(500).send('Error saving user data');
        } else {
            console.log('Data inserted successfully with ID:', this.lastID);
            res.status(200).send('User data saved successfully');
        }
    });
});

// 예약 데이터를 가져오는 GET 엔드포인트
app.get('/reservations', (req, res) => {
    db.all('SELECT * FROM userData', (err, rows) => {
        if (err) {
            console.error('Error fetching reservations:', err.message);
            res.status(500).send('Error fetching reservations');
        } else {
            res.status(200).json(rows);
        }
    });
});

// 예약 데이터 업데이트하는 PUT 엔드포인트
app.put('/reservations/:id', (req, res) => {
    const { id } = req.params;
    const { name, phoneNumber, userDate, userTime, numOfGas, userIcebox } = req.body;

    const query = `UPDATE userData SET name = ?, phoneNumber = ?, userDate = ?, userTime = ?, numOfGas = ?, userIcebox = ? WHERE id = ?`;
    const params = [name, phoneNumber, userDate, userTime, numOfGas || 0, userIcebox ? 1 : 0, id];

    db.run(query, params, function (err) {
        if (err) {
            console.error('Error updating reservation:', err.message);
            res.status(500).send('Error updating reservation');
        } else {
            console.log(`Reservation with ID ${id} updated successfully`);
            res.status(200).send('Reservation updated successfully');
        }
    });
});

// 예약 데이터 삭제하는 DELETE 엔드포인트
app.delete('/reservations/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Delete request received for ID: ${id}`); // 요청 수신 로그

    const query = `DELETE FROM userData WHERE id = ?`;
    db.run(query, [id], function (err) {
        if (err) {
            console.error('Error deleting reservation:', err.message);
            res.status(500).send('Error deleting reservation');
        } else {
            console.log(`Reservation with ID ${id} deleted successfully`);
            res.status(200).send('Reservation deleted successfully');
        }
    });
});

// 정적 파일을 제공하기 위한 설정
app.use(express.static(path.join(__dirname, 'build')));

// 라우트를 처리하지 않는 경우 React 애플리케이션을 제공
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server and React app running on http://localhost:${PORT}`);
});
