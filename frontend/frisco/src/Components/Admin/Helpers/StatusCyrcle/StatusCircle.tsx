import React from 'react';
import './StatusCircle.css';

interface StatusCircleProps {
    circleColorHex: string;
}

const StatusCircle: React.FC<StatusCircleProps> = ({ circleColorHex }) => {
    const circleStyle = {
        backgroundColor: circleColorHex,
    };
    return (
        <div className='status-circle' style={circleStyle}></div>
    );
};

export default StatusCircle;