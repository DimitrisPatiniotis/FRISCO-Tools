import React, { useState } from 'react';

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

export default PhoneQuestion;