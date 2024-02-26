import React, { useState } from 'react';
import Intro from '../../Components/Intro/Intro';
import QuestionnaireWrapper from '../../Components/QuestionnaireWrapper/QuestionnaireWrapper';
import './Questionnaire.css';

const Questionnaire = () => {
    document.title = 'Questionnaire';
    const [mode, setMode] = useState('intro');
    const handleButtonClick = (newMode: string) => {
      setMode(newMode);
    };
    return (
        <div className="h-screen bg-neutral-50 text-white flex flex-col items-center justify-center">
          {mode === 'intro' ? (<Intro onButtonClick={handleButtonClick} />) : (<QuestionnaireWrapper />)}
          {/* <AdditionalInfo /> */}
        </div>
    
    );
}

export default Questionnaire;