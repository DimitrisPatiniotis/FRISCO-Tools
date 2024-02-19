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
        <div className="absolute top-0 left-0 w-full h-[6px] bg-neutral-50">
            <div className="progress-bar__fill h-full bg-frisco_purple max-w-[100%] overflow-hidden" style={{ width: `${progress}%` }}></div>
        </div>
    );
}

export default ProgressBar;