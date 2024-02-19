// SmallTextQuestion.tsx

import React, { useState } from 'react';

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
        <div className="flex gap-8">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-frisco_purple text-white font-semibold rounded transition-colors shadow-md hover:bg-blue-700 focus:outline-none"
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

export default SmallTextQuestion;
