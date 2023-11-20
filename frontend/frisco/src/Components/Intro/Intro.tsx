import React from 'react';

interface IntroProps {
    onButtonClick: (newMode: string) => void;
}

const Intro: React.FC<IntroProps> = ({ onButtonClick }) => {
    document.title = 'FRISCO Demo - Intro';
    return (
        <div className="bg-main-q text-white p-5 flex flex-col gap-10">
            <h1 className="text-4xl font-bold">Frisco Demo</h1>
            <button
                className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded transition-colors shadow-md focus:outline-none"
                onClick={() => onButtonClick('question')}
            >
                Let's begin!
            </button>
        </div>
    );
};

export default Intro;