// SmallTextQuestion.tsx

import React, { useState } from 'react';

interface SmallTextQuestionProps {
  sendText: (text: string) => void;
}

const SmallTextQuestion: React.FC<SmallTextQuestionProps> = ({ sendText }) => {
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
      
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-frisco_purple text-white font-semibold rounded transition-colors shadow-md hover:bg-blue-700 focus:outline-none"
      >
        Next
      </button>
    </div>
  );
};

export default SmallTextQuestion;
