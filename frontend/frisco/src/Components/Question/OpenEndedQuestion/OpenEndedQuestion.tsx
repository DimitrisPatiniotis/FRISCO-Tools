import React, { useState } from 'react';
import './OpenEndedQuestion.css'
import QuestionFooter from '../QuestionFooter/QuestionFooter';

interface OptionQuestionProps {
  sendOption: (text: string) => void;
  deleteAnswer: () => void;
  lastAnswerId: number | undefined;
}

const OpenEndedQuestion: React.FC<OptionQuestionProps> = ({ sendOption, deleteAnswer, lastAnswerId }) => {
  const [textAnswer, setTextAnswer] = useState('');

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (textAnswer.trim() !== '') {
      sendOption(textAnswer);
      setTextAnswer('');
    }
  };

  return (
    <div>
      <textarea
        value={textAnswer}
        onChange={handleTextChange}
        placeholder="Your answer..."
        className="w-full p-2 mb-3 border rounded text-black no-outline border-white focus:outline-none active:outline-none"
        rows={4}
      />
      <QuestionFooter onClickNext={handleSubmit} onClickBack={deleteAnswer} isFirstQuestion={lastAnswerId === undefined} />
    </div>
  );
};

export default OpenEndedQuestion;