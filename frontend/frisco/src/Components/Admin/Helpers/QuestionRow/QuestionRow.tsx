import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './QuestionRow.css';
import { IonIcon } from '@ionic/react';
import { ACTIVE_URL } from '../../../../constants';
import { useAuthContext } from '../../../../utils/useAuthContext';
import CKEditorComponent from '../../../../utils/CKEditorComponent';
import { useNavigate } from 'react-router-dom';

interface QuestionOption {
    title: string;
    goto: number;
    weight: number;
}

interface QuestionRowProps {
    id: number;
    priority: string;
    question: string;
    type: string;
    options: QuestionOption[];
    questionCategory: string;
    weight: string;
    onSetInactiveClick: () => void;
    description: string;
}

interface QuestionData {
    question_id: string;
    description: string;
    text: string;
    type: string;
    category: string;
    questionnaire: string;
    position: string;
    options: QuestionOption[];
    weight: string;

}

const QuestionRow: React.FC<QuestionRowProps> = ({ id, options: initialOptions, description: initialDescription, weight: initialWeight, priority: initialPriority, question: initialQuestion, type: initialType, questionCategory: initialQuestionCategory, onSetInactiveClick }) => {
    const { authTokens } = useAuthContext();
    const [updateState, setUpdateState] = useState(false);
    const [priority, setPriority] = useState(initialPriority);
    const [weight, setWeight] = useState(initialWeight);
    const [question, setQuestion] = useState(initialQuestion);
    const [type, setType] = useState(initialType);
    const [questionCategory, setQuestionCategory] = useState(initialQuestionCategory);
    const [options, setOptions] = useState(initialOptions);
    const [description, setDescription] = useState(initialDescription);
    const navigate = useNavigate();
    const context = useAuthContext();

    const postUpdatedQuestion = (questionData: QuestionData) => {
        if (!authTokens || !authTokens.access) {
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`,
            },
            body: JSON.stringify(questionData),
        };
        fetch(`${ACTIVE_URL}/api/update_question/`, requestOptions)
            .then(response => {
                if (response.ok) {
                    console.log('Question updated');
                } else {
                    console.error('Failed to update question');
                    if (response.status === 401) {
                        context.logoutUser();
                        navigate('/login');
                    }
                }
            })
            .catch(error => {
                console.error('Error updating question:', error);
            });
    };

    const [qCats, setQCats] = useState([]);
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
                setQCats(data);
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
        fetchQuestionCategories();
    }, []);

    const handleSetInactiveClick = () => {
        onSetInactiveClick();
    };

    const handleUpdateStatus = () => {
        setUpdateState(!updateState);
    };

    const initialQuestionData: QuestionData = {
        question_id: id.toString(),
        text: question,
        description: description,
        type: type,
        weight: weight,
        category: questionCategory,
        questionnaire: '1',
        position: priority,
        options: options,

    };
    if (updateState) {
        console.log(options)
    }
    const [questionData, setQuestionData] = useState<QuestionData>(initialQuestionData);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | string) => {
        if (typeof e === 'string') {
            // Handle CKEditor input
            setQuestionData({
                ...questionData,
                description: e,
            });
        } else {
            // Handle regular input elements
            const { name, value } = e.target;
            setQuestionData({
                ...questionData,
                [name]: value,
            });
        }
    };

    const handleOptionsChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newOptions = [...questionData.options];
        newOptions[index].title = e.target.value;
        setQuestionData({
            ...questionData,
            options: newOptions,
        });
    };

    const handleOptionGotoChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newOptions = [...questionData.options];
        newOptions[index].goto = Number(e.target.value);
        setQuestionData({
            ...questionData,
            options: newOptions,
        });
    };
    const handleOptionWeightChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newOptions = [...questionData.options];
        newOptions[index].weight = Number(e.target.value);
        setQuestionData({
            ...questionData,
            options: newOptions,
        });
    };

    const handleAddOption = () => {
        const newOptions = [
            ...questionData.options,
            { title: '', goto: -1, weight: 0 }
        ];
        setQuestionData({
            ...questionData,
            options: newOptions,
        });
    };
    const handleRemoveOption = (index: number) => {
        const newOptions = [...questionData.options];
        newOptions.splice(index, 1);
        setQuestionData({
            ...questionData,
            options: newOptions,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postUpdatedQuestion(questionData);
        setPriority(questionData.position);
        setQuestion(questionData.text);
        setType(questionData.type);
        setQuestionCategory(questionData.category);
        setOptions(questionData.options);
        setWeight(questionData.weight);
        setUpdateState(false);
        setDescription(questionData.description);
    };

    return (
        <div>
            {!updateState ? (
                <>
                    <div className='question-header' >
                        <div>{priority}</div>
                        <div>{question}</div>
                        <div>{questionCategory ? questionCategory : 'NaN'}</div>
                        <div>{type}</div>
                        <div>{weight}</div>
                        <div ><IonIcon icon='trash-outline' onClick={handleSetInactiveClick} className='cursor-pointer text-xl hover:text-red-500'></IonIcon> </div>
                        <div onClick={handleUpdateStatus} ><IonIcon icon='create' className='cursor-pointer text-xl hover:text-green-500' ></IonIcon> </div>
                    </div>
                </>
            ) : (
                <>
                    <form onSubmit={handleSubmit} >
                        <div className='question-header'>
                            <input type="number" className={`w-3/4 px-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`} name="position" value={questionData.position} onChange={handleChange} />
                            <input type="text" name="text" value={questionData.text} onChange={handleChange} className={`w-3/4 px-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`} />
                            <select name="category" value={questionData.category} onChange={handleChange} className={`w-3/4 px-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`}>
                                {qCats.map((qCat) => (
                                    <option value={qCat['name']} key={qCat['name']} >{qCat['name']}</option>
                                ))}
                            </select>
                            <select name="type" value={questionData.type} onChange={handleChange} className={`w-3/4 px-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`}>
                                <option value="text" >Text</option>
                                <option value="multiple_choice" >Multiple Choice</option>
                                <option value="multiple_select" >Multiple Select</option>
                                <option value="open_ended" >Open Ended</option>
                                <option value="file" >File</option>
                                <option value="email" >Email</option>
                                <option value="phone" >Phone</option>
                            </select>
                            <input type="number" step=".01" className={`w-3/4 px-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`} min={0} max={100} name="weight" value={questionData.weight} onChange={handleChange} />
                            <div ><IonIcon icon='trash-outline' className='text-xl update-delete-icon'></IonIcon> </div>
                            <button type="submit" className="bg-blue-600 text-white cursor-pointer text-m py-1 w-16 font-semibold rounded mytransition-colors shadow-md hover:bg-blue-700 focus:outline-none edit-save-btn">Save</button>
                        </div>

                        <div className='px-4 py-1'>
                            <label htmlFor='description' className='text-lg'>Question Description:</label>
                            <CKEditorComponent initialValue={description} onChange={handleChange} />

                        </div>

                        {(questionData.type === 'multiple_choice' || questionData.type == 'multiple_select') && (
                            <div className='px-4'>
                                <label className='text-lg'>Options:</label>
                                <div className="flex items-center space-x-2 my-4">
                                    <label className={`w-full  text-black no-outline mt-1`}>Option Title</label>
                                    <label className={`w-full text-black no-outline mt-1`}>Goto Question #</label>
                                    <label className={`w-full  text-black no-outline mt-1`}>Option Weight</label>
                                    <label className={`px-2`}>Remove</label>
                                </div>
                                {questionData.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            name={`option-${index}`}
                                            value={option.title}
                                            onChange={(e) => handleOptionsChange(e, index)}
                                            placeholder={`Option ${index + 1}`}
                                            className={`w-full p-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`}
                                        />
                                        <input
                                            type="number"
                                            name={`goto-${index}`}
                                            value={option.goto}
                                            onChange={(e) => handleOptionGotoChange(e, index)}
                                            className={`w-full p-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`}
                                        />
                                        <input
                                            type="number"
                                            placeholder='Option Weight'
                                            name={`weight-${index}`}
                                            step=".01"
                                            value={option.weight}
                                            onChange={(e) => handleOptionWeightChange(e, index)}
                                            className={`w-full p-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveOption(index)}
                                            className="text-red-500 font-semibold py-2 px-2 mb-2 rounded-md hover:text-white hover:bg-red-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={handleAddOption} className="px-3 py-2 rounded-md text-blue-500 font-semibold mt-2 hover:bg-blue-600 hover:text-white mb-8">Add Option</button>
                            </div>
                        )}
                    </form>
                </>
            )}
        </div>
    );
};

export default QuestionRow;