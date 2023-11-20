import React, { useState, useEffect } from 'react';
import {IonIcon} from '@ionic/react';
import {ACTIVE_URL} from '../../constants';

interface QuestionaireIntroProps {
    continueS: string;
    questionaireId: number;
    onButtonClick: (newMode: string, continueFlag: boolean) => void;
}

const QuestionaireIntro: React.FC<QuestionaireIntroProps> = ({ continueS, questionaireId, onButtonClick }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    
    useEffect(() => {
        fetch(`${ACTIVE_URL}/api/questionnaire/${questionaireId}/`)
        .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setTitle(data.title);
            setDescription(data.description);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }, [questionaireId]);

    return (
        <div className="max-w-md flex flex-col gap-6">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p style={{ whiteSpace: 'pre-line' }}>{description}</p>
            {continueS === 'start' ? (
              <p className="underline cursor-pointer" onClick={() => onButtonClick('question', false)}>Start <IonIcon style={{ 'transform': 'translateY(3px)' }} icon="arrow-forward-outline"/></p>
            ) : (
              <div className='flex justify-between dual-btn'>
                <div className="cursor-pointer z-10 px-4 py-2 bg-blue-600 text-white font-semibold rounded transition-colors shadow-md hover:bg-blue-700 focus:outline-none" onClick={() => onButtonClick('question', true)}>Continue <IonIcon style={{ 'transform': 'translateY(3px)' }} icon="arrow-forward-outline"/></div>
                <div className="py-2 z-10 px-4 z-1 cursor-pointer" onClick={() => onButtonClick('question', false)}>Restart</div>
              </div>
            )}
            </div>
    );
}

export default QuestionaireIntro;