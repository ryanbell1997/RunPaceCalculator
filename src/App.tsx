import React, { useState } from 'react';
import TimeInput from './components/TimeInput';

function parseTimeToSeconds(time: string): number | null {
    // Accepts formats like mm:ss or hh:mm:ss
    const parts = time.split(':').map(Number);
    if (parts.some(isNaN)) return null;
    if (parts.length === 2) {
        // mm:ss
        return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
        // hh:mm:ss
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return null;
}

function formatSecondsToPace(seconds: number): string {
    if (isNaN(seconds) || seconds <= 0) return '-';
    const min = Math.floor(seconds / 60);
    const sec = Math.round(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

const App: React.FC = () => {
    const [time, setTime] = useState('');

    const handleTimeChange = (newTime: string) => {
        setTime(newTime);
    };

    const totalSeconds = parseTimeToSeconds(time);
    const pacePerKm = totalSeconds ? totalSeconds / 5 : null;
    const pace800m = totalSeconds ? totalSeconds / (5000 / 800) : null;
    const pace400m = totalSeconds ? totalSeconds / (5000 / 400) : null;
    const pace200m = totalSeconds ? totalSeconds / (5000 / 200) : null;

    return (
        <div style={{ padding: '20px', textAlign: 'center', maxWidth: 400, margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h1 style={{ fontSize: '1.5em' }}>5km Pace Calculator</h1>
            <TimeInput time={time} onTimeChange={handleTimeChange} />
            {totalSeconds !== null && time && (
                <div style={{ marginTop: 24, background: '#f8f8f8', borderRadius: 8, padding: 16, boxShadow: '0 1px 4px #0001' }}>
                    <h2 style={{ fontSize: '1.1em', marginBottom: 12 }}>Pace Breakdown</h2>
                    <div style={{ fontSize: '1em', margin: '8px 0' }}>Per km: <b>{formatSecondsToPace(pacePerKm!)}</b> /km</div>
                    <div style={{ fontSize: '1em', margin: '8px 0' }}>Per 800m: <b>{formatSecondsToPace(pace800m!)}</b></div>
                    <div style={{ fontSize: '1em', margin: '8px 0' }}>Per 400m: <b>{formatSecondsToPace(pace400m!)}</b></div>
                    <div style={{ fontSize: '1em', margin: '8px 0' }}>Per 200m: <b>{formatSecondsToPace(pace200m!)}</b></div>
                </div>
            )}
        </div>
    );
};

export default App;