import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import './MultipleSelectQuestion.css';
import QuestionFooter from '../QuestionFooter/QuestionFooter';

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
            <QuestionFooter onClickNext={handleSubmit} onClickBack={deleteAnswer} isFirstQuestion={lastAnswerId === undefined} />
        </div>
    );
};

export default MultipleSelectQuestion;