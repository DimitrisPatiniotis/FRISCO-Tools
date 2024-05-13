
import React from 'react';

interface QuestionFooterProps {
    onClickNext: () => void;
    onClickBack: () => void;
    isFirstQuestion?: boolean;
}

const QuestionFooter: React.FC<QuestionFooterProps> = ({ onClickNext, onClickBack, isFirstQuestion }) => {

    return (
        <div className="flex  w-full justify-between items-center gap-8">
            {!isFirstQuestion ? (
                <button onClick={onClickBack} className="px-4 py-2 bg-neutral-500 text-white font-semibold rounded transition-colors shadow-md hover:bg-neutral-600 focus:outline-none">
                    Back
                </button>
            ) : (
                <div className="flex-grow"/>
            )}
            <button onClick={onClickNext} className="px-4 py-2 bg-frisco_purple text-white font-semibold rounded transition-colors shadow-md hover:bg-frisco_purple_light focus:outline-none">
                <p>Next</p>
            </button>
        </div>
    )
}

export default QuestionFooter;