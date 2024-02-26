import React from 'react';
import QuestionnaireWrapper from '../../Components/QuestionnaireWrapper/QuestionnaireWrapper';
import './Questionnaire.css';

const Questionnaire = () => {
    document.title = '[FRISCO] Questionnaire';
    return (
        <div className="h-screen bg-neutral-50 text-white flex flex-col items-center justify-center">
            <QuestionnaireWrapper />
            {/* <AdditionalInfo /> */}
        </div>
    
    );
}

export default Questionnaire;