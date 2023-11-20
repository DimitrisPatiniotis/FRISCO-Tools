import React, { useState } from 'react';
import './EmailQuestion.css';

interface EmailQuestionProps {
  sendEmail: (email: string) => void;
  className?: string;
  submitButtonText?: string;
  placeholder?: string;
}

const EmailQuestion: React.FC<EmailQuestionProps> = ({ sendEmail, placeholder, className,submitButtonText }) => {
  const [email, setEmail] = useState('');
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    // Regular expression for validating an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() !== '' && emailRegex.test(email)) {
      sendEmail(email);
      setEmail('');
    } else {
      setIsInvalidEmail(true);
    }
  };

  return (
    <div className={`flex ${className}`}>
      {isInvalidEmail ? (
        <p className="text-white text-sm">Please enter a valid email address</p>
      ) : null}
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder= {placeholder ? placeholder : "Please enter your email address"}
        className={`w-1/2 p-2 mb-3 border-2 rounded text-black no-outline ${isInvalidEmail ? 'border-red-500' : 'border-white'
          } focus:outline-none active:outline-none`}
      />
      <div>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded transition-colors shadow-md hover:bg-blue-700 focus:outline-none"
        >
          {submitButtonText ? submitButtonText : 'Next'}
        </button>
      </div>

    </div>
  );
};

export default EmailQuestion;
