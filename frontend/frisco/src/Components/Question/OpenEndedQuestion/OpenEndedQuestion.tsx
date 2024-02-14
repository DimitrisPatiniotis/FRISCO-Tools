import React, { useState } from 'react';
import './OpenEndedQuestion.css'

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
        <div className="flex gap-8">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-frisco_purple text-white font-semibold rounded focus:outline-none  transition-colors shadow-md hover:bg-blue-700 outline-none"
          >
            Next
          </button>
        {lastAnswerId && (
        <button onClick={deleteAnswer} className="px-4 py-2 bg-frisco_purple text-white font-semibold rounded transition-colors shadow-md hover:bg-frisco_purple_light focus:outline-none">
            Back
        </button>
        )}
        </div>
    </div>
  );
};

export default OpenEndedQuestion;