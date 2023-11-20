import React, { useState, useEffect } from 'react';
import AdminMainHeader from '../AdminMainHeader/AdminMainHeader';
import AdminBox from '../Helpers/AdminBox/AdminBox';
import AdimBoxTitle from '../Helpers/AdminBoxTitle/AdimBoxTitle';
import QuestionRowHeader from '../Helpers/QuestionRowHeader/QuestionRowHeader';
import QuestionRow from '../Helpers/QuestionRow/QuestionRow';
import CreateQuestionForm from '../Helpers/CreateQuestion/CreateQuestion';
import CreateQuestionCategoryForm from '../Helpers/CreateQuestonCategory/CreateQuestionCategory';
import './AdminFormQuestions.css';
import QuestionCategoryRowHeader from '../Helpers/QuestionCategoryRowHeader/QuestionCategoryRowHeader';
import QuestionCategoryRow from '../Helpers/QuestionCategoryRow/QuestionCategoryRow';
import { Button } from '../../../@/components/ui/button';
import { IonIcon } from '@ionic/react';
import { ACTIVE_URL } from '../../../constants';
import { useAuthContext } from '../../../utils/useAuthContext';
import { useNavigate } from 'react-router-dom';

const AdminFormQuestions: React.FC = () => {
    const navigate = useNavigate();
    const context = useAuthContext();
    const { authTokens } = useAuthContext();
    const [questions, setQuestions] = useState([]);
    const [questionCategories, setQuestionCategories] = useState([]);
    const [currentView, setCurrentView] = useState('general');

    const fetchQuestions = async () => {
        if (!authTokens || !authTokens.access) {
            return;
        }
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`,
            }
        };
        try {
            const response = await fetch(`${ACTIVE_URL}/api/questionnaire/2/questions/`, requestOptions);
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setQuestions(data);
            } else {
                console.error('Failed to fetch questions');
                if (response.status === 401) {
                    context.logoutUser();
                    navigate('/login');
                }
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const fetchQuestionCategories = async () => {
        if (!authTokens || !authTokens.access) {
            return;
        }
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`,
            }
        };
        try {
            const response = await fetch(`${ACTIVE_URL}/api/get_all_question_categories/`, requestOptions);
            if (response.ok) {
                const data = await response.json();
                setQuestionCategories(data);
            } else {
                console.error('Failed to fetch questions');
                if (response.status === 401) {
                    context.logoutUser();
                    navigate('/login');
                }
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    useEffect(() => {
        fetchQuestions();
        fetchQuestionCategories();
    }, []);

    const handleSetInactiveQuestion = (questionId: number) => {
        if (!authTokens || !authTokens.access) {
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`,
            },
            body: JSON.stringify({ active: false }),
        };
        fetch(`${ACTIVE_URL}/api/question/deactivate/${questionId}/`, requestOptions)
            .then(response => {
                if (response.ok) {
                    fetchQuestions();
                } else {
                    if (response.status === 401) {
                        context.logoutUser();
                        navigate('/login');
                    }
                }
            })
            .catch(error => {
                console.error('Error setting question as inactive:', error);
            });
    };

    const handleSetInactiveQuestionCategory = (questionCategoryId: number) => {
        if (!authTokens || !authTokens.access) {
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`,
            },
            body: JSON.stringify({ active: false }),
        };
        fetch(`${ACTIVE_URL}/api/question_category/deactivate/${questionCategoryId}/`, requestOptions)
            .then(response => {
                if (response.ok) {
                    fetchQuestionCategories();
                } else {
                    if (response.status === 401) {
                        context.logoutUser();
                        navigate('/login');
                    }
                }
            })
            .catch(error => {
                console.error('Error setting question category as inactive:', error);
            });
    };
    const switchToCreateQuestionView = () => {
        setCurrentView('create_question');
    };

    const switchToListView = () => {
        setCurrentView('general');
    };

    const switchToCreateQuestionCategoryView = () => {
        setCurrentView('create_question_category');
    };

    interface QuestionOption {
        title: string;
        goto: number;
    }

    interface QuestionData {
        text: string;
        type: string;
        category: string;
        questionnaire: string;
        position: number;
        options: QuestionOption[];
        description: string;
    }

    const createQuestion = async (questionData: QuestionData) => {
        if (!authTokens || !authTokens.access) {
            return;
        }
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`,
                },
                body: JSON.stringify(questionData),
            };
            const response = await fetch(`${ACTIVE_URL}/api/questions/create/`, requestOptions);

            if (response.ok) {
                fetchQuestions();
                switchToListView();
            } else {
                console.error('Failed to create question');
                if (response.status === 401) {
                    context.logoutUser();
                    navigate('/login');
                }
            }
        } catch (error) {
            console.error('Error creating question:', error);
        }
    };

    interface QuestionCategoryData {
        title: string;
    }

    const createQuestionCategory = async (questionCategoryData: QuestionCategoryData) => {
        if (!authTokens || !authTokens.access) {
            return;
        }
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`,
                },
                body: JSON.stringify(questionCategoryData),
            };
            const response = await fetch(`${ACTIVE_URL}/api/question_categories/create/`, requestOptions);
            if (response.ok) {
                fetchQuestionCategories();
                switchToListView();
            }
            else {
                console.error('Failed to create question');
                if (response.status === 401) {
                    context.logoutUser();
                    navigate('/login');
                }
            }
        } catch (error) {
            console.error('Error creating question:', error);
        }
    };

    return (
        <div className=''>
            <AdminMainHeader pageTitle='FRISCO Questions' />
            {currentView === 'general' || currentView === 'create_question' || currentView === 'update_question' ? (
                <AdminBox>
                    <AdimBoxTitle
                        title={
                            currentView === 'general'
                                ? 'FRISCO Form Questions'
                                : currentView === 'create_question'
                                    ? 'Create Question'
                                    : 'Update Question'
                        }
                    />
                    {currentView === 'general' ? (
                        <>
                            <QuestionRowHeader />
                            {questions.map((r) => (
                                <QuestionRow
                                    key={r['id']}
                                    id={r['id']}
                                    priority={r['question_position']}
                                    weight={r['weight']}
                                    question={r['text']}
                                    type={r['type']}
                                    options={r['options']}
                                    questionCategory={r['question_category_title']}
                                    onSetInactiveClick={() => handleSetInactiveQuestion(r['id'])}
                                    description={r['description']}
                                />
                            ))}
                            <Button onClick={switchToCreateQuestionView} className="px-4 py-2  mx-3 bg-blue-600  cursor-pointer mt-3 text-l font-semibold rounded transition-colors shadow-md hover:bg-blue-700 focus:outline-none text-white"><IonIcon icon='add-outline' className='cursor-pointer text-xl hover:text-green-500 mr-1' ></IonIcon> Create Question</Button>
                        </>
                    ) : (
                        <CreateQuestionForm onCreateQuestion={createQuestion} />
                    )}
                </AdminBox>) : null}
            {currentView === 'general' || currentView === 'create_question_category' || currentView === 'update_question_category' ? (
                <AdminBox>
                    <AdimBoxTitle
                        title={
                            currentView === 'general'
                                ? 'FRISCO Question Categories'
                                : currentView === 'create_question_category'
                                    ? 'Create Question Category'
                                    : 'Update Question Category'
                        }
                    />
                    {currentView === 'general' ? (
                        <>
                            <QuestionCategoryRowHeader />
                            {questionCategories.map((r) => (
                                <QuestionCategoryRow
                                    key={r['id']}
                                    name={r['name']}
                                    onSetInactiveClick={() => handleSetInactiveQuestionCategory(r['id'])}
                                />
                            ))}
                            <Button onClick={switchToCreateQuestionCategoryView} className="px-4 py-2 mx-3 bg-blue-600  cursor-pointer mt-1 text-l font-semibold rounded transition-colors shadow-md hover:bg-blue-700 focus:outline-none text-white"><IonIcon icon='add-outline' className='cursor-pointer text-xl hover:text-green-500 mr-1' ></IonIcon> Create Question Category</Button>
                        </>
                    ) : (
                        <CreateQuestionCategoryForm onCreateQuestion={createQuestionCategory} />
                    )}
                </AdminBox>
            ) : null}
        </div>
    )
};

export default AdminFormQuestions;
