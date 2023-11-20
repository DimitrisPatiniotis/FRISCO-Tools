import React, { useState, useEffect } from 'react';
import './ProgressBar.css';

interface PorgressBarProps {
    totalQuestions: number;
    currentQuestion: number;
}

const ProgressBar: React.FC<PorgressBarProps> = ({ totalQuestions, currentQuestion }) => {

    const [progress, setProgress] = useState<number>(0);
    useEffect(() => {
        setProgress(((currentQuestion - 1 ) / totalQuestions) * 100);
    }, [currentQuestion, totalQuestions]);

    return (
        <div className="progress-bar">
            <div className="progress-bar__fill" style={{ width: `${progress}%` }}></div>
        </div>
    );
}

export default ProgressBar;