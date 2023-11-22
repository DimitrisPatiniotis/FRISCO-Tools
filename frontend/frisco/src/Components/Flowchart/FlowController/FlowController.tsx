import React from 'react';
import './FlowController.css';

interface FlowControllerProps {
    is_last_node?: boolean;
    question?: string;
    answers?: {
        answer_text: string;
        answer_add: number[];
    }[];
    setAnswer: (answer: { answer_text: string; answer_add: number[] }) => void;
    toDownload?: () => void;
}

const FlowController: React.FC<FlowControllerProps> = ({ question, answers, setAnswer, is_last_node, toDownload }) => {
    if (is_last_node) {
        return (
            <div className='flow-choice-panel bg-gray-800 border-gray-800 rounded-md shadow-lg p-4'>
                <div className='text-lg text-white mb-2'>{question}</div>
                <div className='text-white w-full bg-blue-600 py-2 px-2 rounded-md cursor-pointer' onClick={toDownload}>
                    Download
                </div>
            </div>
        )
    }
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
