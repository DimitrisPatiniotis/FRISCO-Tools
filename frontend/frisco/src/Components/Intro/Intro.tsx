import React from 'react';
import Logo from '../../assets/images/logos/Final-logo-Frisco-scaled.png';
interface IntroProps {
    onButtonClick: (newMode: string) => void;
}

const Intro: React.FC<IntroProps> = ({ onButtonClick }) => {
    document.title = '[FRISCO] Questionnaire';
    return (
        <div className="bg-neutral-50 p-5 flex flex-col gap-10">
            <div className='absolute m-[15px] top-0 left-0'>
                <img src={Logo} className='w-52' />
            </div>
            <h1 className="text-4xl font-bold text-neutral-800">Frisco Questionnaire</h1>
            <button
                className="px-6 py-3 bg-frisco_purple hover:bg-frisco_purple_light text-white font-semibold rounded transition-colors shadow-md focus:outline-none"
                onClick={() => onButtonClick('question')}
            >
                Let's begin!
            </button>
        </div>
    );
};

export default Intro;