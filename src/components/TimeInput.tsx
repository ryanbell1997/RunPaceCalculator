import React from 'react';

interface TimeInputProps {
    time: string;
    onTimeChange: (newTime: string) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ time, onTimeChange }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Enter 5km time (mm:ss or hh:mm:ss)"
                value={time}
                onChange={e => onTimeChange(e.target.value)}
                style={{
                    width: '80%',
                    fontSize: '1.2em',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    margin: '12px 0',
                    textAlign: 'center',
                    maxWidth: 220
                }}
                inputMode="numeric"
                pattern="[0-9:]*"
            />
        </div>
    );
};

export default TimeInput;