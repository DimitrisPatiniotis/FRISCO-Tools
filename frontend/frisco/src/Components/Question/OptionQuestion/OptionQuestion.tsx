import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import QuestionFooter from '../QuestionFooter/QuestionFooter';

interface Option {
    id: number;
    text: string;
    question: number;
}

interface OptionQuestionProps {
    options: Option[];
    sendOption: (selectedOptionId: number) => void;
    deleteAnswer: () => void;
    lastAnswerId: number | undefined;
}

const OptionQuestion: React.FC<OptionQuestionProps> = ({ options, sendOption, deleteAnswer, lastAnswerId }) => {
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
                                <span className="relative flex items-center justify-center w-4 h-4 border border-frisco_orange rounded bg-frisco_orange cursor-pointer">
                                    <IonIcon icon="checkmark-outline" className="absolute text-white font-semibold" />
                                </span>
                            ) : (
                                <span className="relative flex items-center justify-center w-4 h-4 border border-frisco_orange rounded  cursor-pointer">
                                </span>
                            )}
                            <span className='ml-1 text-neutral-800'>{option.text}</span>
                        </label>
                    </li>
                ))}
            </ul>
            <QuestionFooter onClickNext={handleSubmit} onClickBack={deleteAnswer} isFirstQuestion={lastAnswerId === undefined} />
        </div>
    );
};

export default OptionQuestion;