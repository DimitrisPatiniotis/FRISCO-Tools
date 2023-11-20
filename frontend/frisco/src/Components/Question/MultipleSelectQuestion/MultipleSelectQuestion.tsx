import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';

interface Option {
    id: number;
    text: string;
    question: number;
}

interface MultipleSelectProps {
    options: Option[];
    sendOptions: (selectedOptionsIds: number[]) => void;
}

const MultipleSelectQuestion: React.FC<MultipleSelectProps> = ({ options, sendOptions }) => {
    const [selectedOptionsIds, setSelectedOptionsIds] = useState<number[]>([]);
    const isSubmitDisabled = selectedOptionsIds.length === 0;

    const handleCheckboxChange = (optionId: number) => {
        if (selectedOptionsIds.includes(optionId)) {
            setSelectedOptionsIds(selectedOptionsIds.filter(id => id !== optionId));
        } else {
            setSelectedOptionsIds([...selectedOptionsIds, optionId]);
        }
    };
    const handleSubmit = () => {
        if (!isSubmitDisabled) {
            sendOptions(selectedOptionsIds);
        }
    };
    return (
        <div>
            <ul className='mb-3'>
                {options.map((option) => (
                    <li key={option.id} className='mb-1'>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={selectedOptionsIds.includes(option.id)}
                                onChange={() => handleCheckboxChange(option.id)}
                            />
                            {selectedOptionsIds.includes(option.id) ? (
                                <span className="relative flex items-center justify-center w-4 h-4 border border-gray-300 rounded bg-white cursor-pointer">
                                    <IonIcon icon="checkmark-outline" className="absolute text-blue-800 font-semibold" />
                                </span>
                            ) : (
                                <span className="relative flex items-center justify-center w-4 h-4 border border-gray-300 rounded cursor-pointer">
                                </span>
                            )}
                            <span className='ml-1'>{option.text}</span>
                        </label>
                    </li>
                ))}
            </ul>
            <button
                onClick={handleSubmit}
                className={`px-4 py-2  text-white font-semibold rounded transition-colors bg-blue-600 shadow-md focus:outline-none ${isSubmitDisabled ? '' : 'hover:bg-blue-700'}`}
                disabled={isSubmitDisabled}
            >
                Submit
            </button>
        </div>
    );
};

export default MultipleSelectQuestion;