import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { ACTIVE_URL } from '../../constants';

interface QuestionaireIntroProps {
  continueS: string;
  questionnaireId: number;
  onButtonClick: (newMode: string, continueFlag: boolean) => void;
}

const QuestionnaireIntro: React.FC<QuestionaireIntroProps> = ({ continueS, questionnaireId, onButtonClick }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    fetch(`${ACTIVE_URL}/api/questionnaire/${questionnaireId}/`)
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
  }, [questionnaireId]);

  return (
    <div className="max-w-md flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-neutral-800">{title}</h1>
      <p style={{ whiteSpace: 'pre-line' }} className='text-neutral-800'>{description}</p>
      {continueS === 'start' ? (
        <div className="cursor-pointer z-10 px-4 py-2 bg-frisco_purple text-white font-semibold rounded transition-colors shadow-md hover:bg-frisco_purple_light focus:outline-none w-min flex gap-1 items-center" onClick={() => onButtonClick('question', false)}>Start <IonIcon icon="arrow-forward-outline" /></div>
      ) : (
        <div className='flex justify-between dual-btn'>
          <div className="cursor-pointer z-10 px-4 py-2 bg-frisco_purple text-white font-semibold rounded transition-colors shadow-md hover:bg-frisco_purple_light focus:outline-none" onClick={() => onButtonClick('question', true)}>Continue <IonIcon style={{ 'transform': 'translateY(3px)' }} icon="arrow-forward-outline" /></div>
          <div className="py-2 z-10 px-4 z-1 cursor-pointer text-frisco_orange" onClick={() => onButtonClick('question', false)}>Restart </div>
        </div>
      )}
    </div>
  );
}

export default QuestionnaireIntro;