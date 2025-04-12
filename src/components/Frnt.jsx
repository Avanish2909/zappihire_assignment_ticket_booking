import React, { useState } from 'react';
import '../style/Frnt.css'; // Import your CSS file for styling

const Frnt = () => {
    const [seats, setSeats] = useState(
        Array.from({ length: 11 }, (_, i) =>
            Array.from({ length: i === 10 ? 3 : 7 }, () => false)
        )
    );
    const [inputValue, setInputValue] = useState('');
    const [bookedSeats, setBookedSeats] = useState([]);

    const handleBookSeats = () => {
        const numSeats = parseInt(inputValue, 10);
        if (isNaN(numSeats) || numSeats <= 0 || numSeats > 7) {
            alert('Please enter a valid number between 1 and 7.');
            return;
        }

        const newSeats = [...seats];
        let booked = false;
        const currentBookedSeats = [];

        // Try to book seats in one row
        for (let i = 0; i < newSeats.length; i++) {
            const row = newSeats[i];
            let availableSeats = 0;
            for (let j = 0; j < row.length; j++) {
                if (!row[j]) availableSeats++;
                else availableSeats = 0;

                if (availableSeats === numSeats) {
                    for (let k = j - numSeats + 1; k <= j; k++) {
                        row[k] = true;
                        currentBookedSeats.push(i * 7 + k + 1);
                    }
                    booked = true;
                    break;
                }
            }
            if (booked) break;
        }

        // If not possible in one row, book nearby seats
        if (!booked) {
            let seatsToBook = numSeats;
            for (let i = 0; i < newSeats.length && seatsToBook > 0; i++) {
                const row = newSeats[i];
                for (let j = 0; j < row.length && seatsToBook > 0; j++) {
                    if (!row[j]) {
                        row[j] = true;
                        currentBookedSeats.push(i * 7 + j + 1);
                        seatsToBook--;
                    }
                }
            }
        }

        setSeats(newSeats);
        setBookedSeats(currentBookedSeats);
        setInputValue('');
    };

    const handleReset = () => {
        setSeats(
            Array.from({ length: 11 }, (_, i) =>
                Array.from({ length: i === 10 ? 3 : 7 }, () => false)
            )
        );
        setBookedSeats([]);
    };

    const availableSeats = seats.flat().filter(seat => !seat).length;

    const rows = seats.map((row, i) => (
        <div key={i} className="row">
            {row.map((isBooked, j) => (
                <div
                    key={j}
                    className={`seat ${isBooked ? 'booked' : 'available'}`}
                >
                    {i * 7 + j + 1}
                </div>
            ))}
        </div>
    ));

    return (
        <div className="container">
            <style>
                
            </style>
            <div className="content">
                <div className="left-panel">
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Ticket Booking</h2>
                    {rows}
                    <div className="stats">
                        <div className="stat booked">
                            Booked seats: {seats.flat().filter(seat => seat).length}
                        </div>
                        <div className="stat available">
                            Available seats: {availableSeats}
                        </div>
                    </div>
                </div>
                <div className="right-panel">
                    <div className="input-container">
                        <h3 style={{ marginBottom: '18px', alignSelf: 'flex-start', color: 'black' }}>Book Seat </h3>
                        {bookedSeats.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                {bookedSeats.map((seat, index) => (
                                    <div
                                        key={index}
                                        className="seat booked"
                                        style={{ color: 'white' }}
                                    >
                                        {seat}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Enter number of seats"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button onClick={handleBookSeats}>Book</button>
                    </div>
                    <button className="reset-button" onClick={handleReset}>Reset Booking</button>
                </div>
            </div>
        </div>
    );
};

export default Frnt;