import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCookies } from 'react-cookie';
import QuestionaireIntro from '../QuestionaireIntro/QuestionaireIntro';
import Question from '../Question/Question';
import QuestionaireOutro from '../QuestionaireOutro/QuestionaireOutro';
import './QuestionaireWrapper.css';
import { useAuthContext } from '../../utils/useAuthContext';

const QuestionaireWrapper = () => {
  const { user } = useAuthContext(); 
  const [questionaire, setQuestionaire] = useState(1);
  const [oldCookie, setOldCookie] = useState('');
  const [questionaireState, setQuestionaireState] = useState('intro');
  const [continueState, setContinueState] = useState('start');
  const [response_id, setResponseId] = useState('');
  const [cookies, setCookie] = useCookies(['response_id']);

  const createNewCookie = () => {
          // If the cookie doesn't exist, initialize response_id with a new UUID
          const newResponseId = uuidv4();
          // 1/5.3 × 10^36 chance of collision
          setResponseId(newResponseId);
    
           // Set the response_id cookie with an expiration date of 7 days
           const expirationDate = new Date();
           expirationDate.setDate(expirationDate.getDate() + 7);
    
          // Set the response_id cookie with the new UUID
          setCookie('response_id', newResponseId, { path: '/' });
  }

  // On first render, check if the response_id cookie exists - Used for saving responses even if the user closes the browser
  useEffect(() => {
    // Check if the response_id cookie exists
    if (cookies.response_id && continueState=='start') {
      // If the cookie exists, set response_id to its value
      setResponseId(cookies.response_id);
      setContinueState('continue');
    } else {
      createNewCookie();
    }
  }, []);

  const changeQuestionState = (newMode: string, continueFlag: boolean = false ) => {
    if (continueFlag) {
      setQuestionaireState(newMode);
    } else {
      // To be added - a read cookie should be ideally different from the one that is set
      setOldCookie(cookies.response_id);
      createNewCookie();
      setQuestionaireState(newMode);
    }
  };


  return (
    <div className='questionaire-wrapper'>
      <div className='questionaire-wrapper-background'></div>
      <div className='questionaire-inner'>
        {questionaireState === 'intro' ? ( <QuestionaireIntro questionaireId={questionaire} continueS={continueState} onButtonClick={changeQuestionState} />) : null} 
        {questionaireState === 'question' ? ( <Question continueState={continueState} questionaireId={questionaire} responseId={response_id} onEnd={(changeQuestionState)} />) : null}
        {questionaireState === 'end' ? ( <QuestionaireOutro questionaireId={questionaire}  responseId={oldCookie} />) : null}
      </div>
      {user ? (<div className='cursor-pointer z-10 absolute bottom-10 right-12 py-10 px-12' onClick={() => window.location.href = '/admin'}>Enter Admin</div>) : null}
    </div>
  );
};

export default QuestionaireWrapper;