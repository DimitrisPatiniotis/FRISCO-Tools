import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';

interface Option {
    id: number;
    text: string;
    question: number;
}

interface OptionQuestionProps {
    options: Option[];
    sendOption: (selectedOptionId: number) => void;
}

const OptionQuestion: React.FC<OptionQuestionProps> = ({ options, sendOption }) => {
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

    const handleRadioChange = (optionId: number) => {
        setSelectedOptionId(optionId);
    };


    const handleSubmit = () => {
        if (selectedOptionId !== null) {
            sendOption(selectedOptionId);
        }
    };

    return (
        <div>
            <ul className='mb-3'>
                {options.map((option) => (
                    <li key={option.id} className='mb-1'>
                        <label className="inline-flex items-center  cursor-pointer">
                            <input
                                type="radio"
                                className="hidden"
                                checked={selectedOptionId === option.id}
                                onChange={() => handleRadioChange(option.id)}
                            />
                            {selectedOptionId === option.id ? (
                                <span className="relative flex items-center justify-center w-4 h-4 border border-gray-300 rounded bg-white cursor-pointer">
                                    <IonIcon icon="checkmark-outline" className="absolute text-blue-800 font-semibold" />
                                </span>
                            ) : (
                                <span className="relative flex items-center justify-center w-4 h-4 border border-gray-300 rounded  cursor-pointer">
                                </span>
                            )}
                            <span className='ml-1'>{option.text}</span>
                        </label>
                    </li>
                ))}
            </ul>
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded transition-colors shadow-md hover:bg-blue-700 focus:outline-none">
                Next
            </button>
        </div>
    );
};

export default OptionQuestion;