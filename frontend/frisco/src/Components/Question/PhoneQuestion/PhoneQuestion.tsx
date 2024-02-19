import React, { useState } from 'react';
import QuestionFooter from '../QuestionFooter/QuestionFooter';

interface PhoneQuestionProps {
  sendPhone: (phone: string) => void;
  deleteAnswer: () => void;
  lastAnswerId: number | undefined;
}

const PhoneQuestion: React.FC<PhoneQuestionProps> = ({ sendPhone, deleteAnswer, lastAnswerId }) => {
  const [phone, setPhone] = useState('');
  const [isInvalidPhone, setIsInvalidPhone] = useState(false);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleSubmit = () => {
    // Regular expression for validating a phone number
    const phoneRegex = /^\+?\d{8,15}$/;

    if (phone.trim() !== '' && phoneRegex.test(phone)) {
      sendPhone(phone);
      setPhone('');
    } else {
      setIsInvalidPhone(true);
    }
  };

  return (
    <div>
      {isInvalidPhone ? (
        <p className="text-white text-sm">Παρακαλώ εισάγετε έναν έγκυρο αριθμό τηλεφώνου</p>
      ) : null}
      <input
        type="text"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="Please enter your phone number..."
        className={`w-full p-2 mb-3 border-2 rounded text-black no-outline ${isInvalidPhone ? 'border-red-500' : 'border-white'
          } focus:outline-none active:outline-none`}
      />
      <QuestionFooter onClickNext={handleSubmit} onClickBack={deleteAnswer} isFirstQuestion={lastAnswerId === undefined} />
    </div>
  );
};

export default PhoneQuestion;