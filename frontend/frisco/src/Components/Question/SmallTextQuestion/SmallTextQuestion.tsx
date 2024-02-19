// SmallTextQuestion.tsx

import React, { useState } from 'react';
import QuestionFooter from '../QuestionFooter/QuestionFooter';

interface SmallTextQuestionProps {
  sendText: (text: string) => void;
  deleteAnswer: () => void;
  lastAnswerId: number | undefined;
}

const SmallTextQuestion: React.FC<SmallTextQuestionProps> = ({ sendText, deleteAnswer, lastAnswerId }) => {
  const [textAnswer, setTextAnswer] = useState('');

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (textAnswer.trim() !== '') {
      sendText(textAnswer);
      setTextAnswer('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={textAnswer}
        onChange={handleTextChange}
        placeholder="Type your answer here..."
        className="w-full p-2 mb-3 border-2 rounded text-black no-outline focus:outline-none active:outline-none"
      />
      <QuestionFooter onClickNext={handleSubmit} onClickBack={deleteAnswer} isFirstQuestion={lastAnswerId === undefined} />
    </div>
  );
};

export default SmallTextQuestion;
