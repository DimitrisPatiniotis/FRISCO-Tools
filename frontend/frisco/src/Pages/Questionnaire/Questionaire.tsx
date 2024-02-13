import React, { useState } from 'react';
import Intro from '../../Components/Intro/Intro';
import QuestionaireWrapper from '../../Components/QuestionaireWrapper/QuestionaireWrapper';
import './Questionaire.css';

const Questionaire = () => {
    const [mode, setMode] = useState('intro');
    const handleButtonClick = (newMode: string) => {
      setMode(newMode);
    };
    return (
        <div className="h-screen bg-neutral-50 text-white flex flex-col items-center justify-center">
          {mode === 'intro' ? (<Intro onButtonClick={handleButtonClick} />) : (<QuestionaireWrapper />)}
          {/* <AdditionalInfo /> */}
        </div>
    
    );
}

export default Questionaire;