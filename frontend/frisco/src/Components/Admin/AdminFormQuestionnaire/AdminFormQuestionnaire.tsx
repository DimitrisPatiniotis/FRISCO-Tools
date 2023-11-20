import React, { useState, useEffect } from 'react';
import AdminMainHeader from '../AdminMainHeader/AdminMainHeader';
import AdminBox from '../Helpers/AdminBox/AdminBox';
import AdimBoxTitle from '../Helpers/AdminBoxTitle/AdimBoxTitle';
import QuestionnaireTitleEdit from '../Helpers/QuestionnaireTitleEdit/QuestionnaireTitleEdit';
import QuestionnaireDescEdit from '../Helpers/QuestionnaireDescEdit/QuestionnaireDescEdit';
import './AdminFormQuestionnaire.css';
import { useAuthContext } from '../../../utils/useAuthContext';
import { ACTIVE_URL } from '../../../constants';


const AdminFormQuestionnaire: React.FC = () => {
    const { authTokens } = useAuthContext();
    const [questionnaireTitle, setQuestionnaireTitle] = useState('');
    const [questionnaireDescrition, setQuestionnaireDescrition] = useState('');
    const [questionnaireOutroTitle, setQuestionnaireOutroTitle] = useState('');
    const [questionnaireOutroDescrition, setQuestionnaireOutroDescrition] = useState('');
    
    useEffect(() => {
        const fetchQuestionnaire = async () => {
            try {
                if (!authTokens || !authTokens.access) {
                    return;
                }
                const response = await fetch(`${ACTIVE_URL}/api/get_questionnaire_info/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authTokens.access}`,
                }});
                if (response.ok) {
                    const data = await response.json();
                    setQuestionnaireTitle(data.title);
                    setQuestionnaireDescrition(data.description);
                    setQuestionnaireOutroTitle(data.outro_title);
                    setQuestionnaireOutroDescrition(data.outro_text)
                } else {
                    console.error('Failed to fetch questionnaire');
                }
            } catch (error) {
                console.error('Error fetching questionnaire:', error);
            }
        };

        fetchQuestionnaire();
    }, []);


    return (
        <div>
            <AdminMainHeader pageTitle='Questionnaire Overview' />
            <AdminBox>
                <AdimBoxTitle title='Questionnaire Title' />
                <QuestionnaireTitleEdit place='intro' currentTitle={questionnaireTitle} />
            </AdminBox>
            <AdminBox>
                <AdimBoxTitle title='Questionnaire Introduction' />
                <QuestionnaireDescEdit place='intro' currentDesc={questionnaireDescrition} />
            </AdminBox>
            <AdminBox>
                <AdimBoxTitle title='Questionnaire Outro Title' />
                <QuestionnaireTitleEdit place='outro' currentTitle={questionnaireOutroTitle} />
            </AdminBox>
            <AdminBox>
                <AdimBoxTitle title='Questionnaire Outro Description' />
                <QuestionnaireDescEdit place='outro' currentDesc={questionnaireOutroDescrition} />
            </AdminBox>
        </div>



    )
};

export default AdminFormQuestionnaire;
