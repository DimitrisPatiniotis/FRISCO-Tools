import React, { useState, useEffect } from 'react';
import OpenEndedQuestion from './OpenEndedQuestion/OpenEndedQuestion';
import OptionQuestion from './OptionQuestion/OptionQuestion';
import EmailQuestion from './EmailQuestion/EmailQuestion';
import FileQuestion from './FileQuestion/FileQuestion';
import ProgressBar from '../ProgressBar/ProgressBar';
import PhoneQuestion from './PhoneQuestion/PhoneQuestion';
import SmallTextQuestion from './SmallTextQuestion/SmallTextQuestion';
import MultipleSelectProps from './MultipleSelectQuestion/MultipleSelectQuestion';
import './Question.css';
import axios from 'axios';
import { ACTIVE_URL } from '../../constants';
import HTMLRenderer from '../../utils/HTMLRenderer';
import Tooltip from '../../utils/Tooltip/Tooltip';

interface QuestionaireIntroProps {
    questionaireId: number;
    responseId: string;
    continueState: string;
    onEnd: (newMode: string) => void;
}

interface Option {
    id: number;
    text: string;
    question: number;
}

const Question: React.FC<QuestionaireIntroProps> = ({ questionaireId, responseId, onEnd, continueState }) => {

    const [questionChangeSwitch, setQuestionChangeSwitch] = useState(1);
    const [questionPos, setQuestionPos] = useState<number>(0);
    const [inTransition, setInTransition] = useState<boolean>(false);
    const [questionCategory, setQuestionCategory] = useState<string>('');
    const [questionDescription, setQuestionDescription] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [question_type, setQuestionType] = useState<string>('');
    const [question_options, setQuestionOptions] = useState<Option[]>([]);
    const [question_id, setQuestionId] = useState<number>(0);
    const [total_questions, setTotalQuestions] = useState<number>(0);

    const sendOptionAnswer = async (option_id?: number, text?: string, email?: string, file?: File, phone?: string, small_text?: string, selected_options?: number[]) => {
        try {
            const formData = new FormData();
            formData.append('option_id', option_id ? option_id.toString() : '');
            formData.append('text', text || '');
            formData.append('email', email || '');
            if (file) {
                formData.append('file', file);
            }
            if (phone) {
                formData.append('phone', phone);
            }

            if (small_text) {
                formData.append('small_text', small_text);
            }
            if (selected_options) {
                const selectedOptionsStrings = selected_options.map(optionId => optionId.toString());
                formData.append('selected_options', selectedOptionsStrings.join(','));
            }
            const response = await axios.post(`${ACTIVE_URL}/api/answer/${responseId}/${question_id}/`, formData);
            setInTransition(true);
            setTimeout(() => {
                setQuestionChangeSwitch(questionChangeSwitch + 1);
                setInTransition(false);
            }, 290);


        } catch (error) {
            console.error('Error sending answer:', error);
        }
    };

    useEffect(() => {
        fetch(`${ACTIVE_URL}/api/questionnaire/${questionaireId}/${responseId}/questions/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data['end']) {
                    onEnd('end');
                }
                setQuestionPos(data['question_position']);
                setQuestionType(data['question_type']);
                setQuestionCategory(data['question_category'])
                setDescription(data['question_text']);
                setQuestionOptions(data['options']);
                setQuestionId(data['question_id']);
                setTotalQuestions(data['total_questions_in_questionnaire']);
                setQuestionDescription(data['description']);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [questionChangeSwitch]);

    return (
        <div>
            <ProgressBar totalQuestions={total_questions} currentQuestion={questionPos} />
            <div className="question-container">

                <div className={`question-slide ${inTransition ? 'question-slide-exit-active' : 'question-slide-enter-active'}`}>

                    <h3 className='text-lg'>{questionCategory}</h3>
                    <h1 className='mb-2 text-2xl question-title'>
                        <div className='w-full'>
                            {continueState === 'start' ? questionChangeSwitch : questionPos}.  {description}
                        </div>
                        {(questionDescription &&
                            <div  className='ml-5 h-full'>
                                <Tooltip title={description} text={questionDescription} />
                            </div>
                        )}
                    </h1>

                    {question_type === 'multiple_select' ? (<MultipleSelectProps options={question_options} sendOptions={(selected_options) => sendOptionAnswer(undefined, undefined, undefined, undefined, undefined, undefined, selected_options)} />) : null}
                    {question_type === 'multiple_choice' ? (<OptionQuestion options={question_options} sendOption={sendOptionAnswer} />) : null}
                    {question_type === 'open_ended' ? (<OpenEndedQuestion sendOption={(text) => sendOptionAnswer(undefined, text)} />) : null}
                    {question_type === 'email' ? (<EmailQuestion className='flex-col' sendEmail={(email) => sendOptionAnswer(undefined, undefined, email)} />) : null}
                    {question_type === 'file' ? (<FileQuestion sendFile={(file) => sendOptionAnswer(undefined, undefined, undefined, file)} />) : null}
                    {question_type === 'phone' ? (<PhoneQuestion sendPhone={(phone) => sendOptionAnswer(undefined, undefined, undefined, undefined, phone)} />) : null}
                    {question_type === 'text' ? (<SmallTextQuestion sendText={(small_text) => sendOptionAnswer(undefined, undefined, undefined, undefined, undefined, small_text)} />) : null}
                </div>

            </div>
        </div>
    )
}

export default Question;