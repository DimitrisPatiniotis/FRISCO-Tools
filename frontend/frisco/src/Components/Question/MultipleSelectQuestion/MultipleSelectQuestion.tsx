import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import './MultipleSelectQuestion.css';

interface Option {
    id: number;
    text: string;
    question: number;
}

interface MultipleSelectProps {
    options: Option[];
    sendOptions: (selectedOptionsIds: number[]) => void;
    deleteAnswer: () => void;
    lastAnswerId: number | undefined;
}

const MultipleSelectQuestion: React.FC<MultipleSelectProps> = ({ options, sendOptions, deleteAnswer, lastAnswerId }) => {
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
            <ul className='mb-3 flex flex-col gap-1'>
                {options.map((option) => (
                    <li key={option.id} className=''>
                        <label className="inline-flex items-center cursor-pointer gap-2">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={selectedOptionsIds.includes(option.id)}
                                onChange={() => handleCheckboxChange(option.id)}
                            />
                            {selectedOptionsIds.includes(option.id) ? (
                                <div className="relative flex items-center justify-center w-4 h-4 border border-frisco_orange rounded bg-frisco_orange cursor-pointer custom-checkbox">
                                    <IonIcon icon="checkmark-outline" className="absolute text-white font-semibold" />
                                </div>
                            ) : (
                                <div className=" flex items-center justify-center w-4 h-4 border border-frisco_orange rounded cursor-pointer custom-checkbox">
                                </div>

                            )}
                            <div className='multiple-option-text text-neutral-800 select-none'>{option.text}</div>

                        </label>


                    </li>
                ))}
            </ul>
            <div className="flex gap-8">
                <button
                    onClick={handleSubmit}
                    className={`px-4 py-2  text-white font-semibold rounded transition-colors bg-frisco_purple shadow-md focus:outline-none ${isSubmitDisabled ? '' : 'hover:bg-frisco_purple_light'}`}
                    disabled={isSubmitDisabled}
                >
                    Next
                </button>
                {lastAnswerId && (
                <button onClick={deleteAnswer} className="px-4 py-2 bg-frisco_purple text-white font-semibold rounded transition-colors shadow-md hover:bg-frisco_purple_light focus:outline-none">
                    Back
                </button>
                )}
            </div>
        </div>
    );
};

export default MultipleSelectQuestion;