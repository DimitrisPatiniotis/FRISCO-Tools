import React, { useState } from 'react';
import './FlowController.css';

interface FlowControllerProps {
    question?: string;
    answers?: {
        answer_text: string;
        answer_add: number[];
    }[];
    setAnswer: (answer: { answer_text: string; answer_add: number[] }) => void;
}

const FlowController: React.FC<FlowControllerProps> = ({ question, answers, setAnswer }) => {
    return (
        <div className='flow-choice-panel bg-gray-800 border-gray-800 rounded-md shadow-lg p-4'>
            <div className='text-lg text-white'>{question}</div>
            <div className='flex flex-col gap-4 mt-4'>
                {answers &&
                    answers.map((answer) => (
                        <div
                            key={answer.answer_text}
                            className='text-white w-full bg-blue-600 py-2 px-2 rounded-md cursor-pointer'
                            onClick={() => setAnswer(answer)}
                        >
                            {answer.answer_text}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default FlowController;
