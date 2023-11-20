import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { ACTIVE_URL } from '../../../../constants';
import './CreateQuestion.css';
import { useAuthContext } from '../../../../utils/useAuthContext';
import CKEditorComponent from '../../../../utils/CKEditorComponent';
import { useNavigate } from 'react-router-dom';

interface QuestionOption {
    title: string;
    goto: number;
    weight: number;
}

interface QuestionData {
    text: string;
    type: string;
    category: string;
    questionnaire: string;
    position: number;
    weight: number;
    options: QuestionOption[];
    description: string;
}

interface CreateQuestionFormProps {
    onCreateQuestion: (questionData: QuestionData) => void;
}

const CreateQuestionForm: React.FC<CreateQuestionFormProps> = ({ onCreateQuestion }) => {
    const navigate = useNavigate();
    const context = useAuthContext();
    const { authTokens } = useAuthContext();
    const [qCats, setQCats] = useState([]);
    const fetchQuestionCategories = async () => {
        try {
            if (!authTokens || !authTokens.access) {
                return;
            }
            const response = await fetch(`${ACTIVE_URL}/api/get_all_question_categories/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`,
                }
            });
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

    const initialQuestionData: QuestionData = {
        description: '',
        text: '',
        type: 'text',
        category: '',
        questionnaire: '1',
        position: 0,
        weight: 0,
        options: [{ title: '', goto: -1, weight: 0 }],
    };

    const [questionData, setQuestionData] = useState<QuestionData>(initialQuestionData);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | string) => {
        if (typeof e === 'string') {
            // Handle CKEditor input
            setQuestionData({
                ...questionData,
                description: e, // Assuming 'description' is the CKEditor field
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
        onCreateQuestion(questionData);
        setQuestionData(initialQuestionData);
    };

    return (
        <form onSubmit={handleSubmit} className='create-question'>
            <label htmlFor='text' className='text-lg'>Question Title:</label>
            <input type="text" name="text" value={questionData.text} onChange={handleChange} className={`w-full p-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`} />

            <label htmlFor='description' className='text-lg'>Question Description:</label>
            <CKEditorComponent onChange={handleChange} />

            <label htmlFor='type' className='text-lg'>Type:</label>
            <select name="type" value={questionData.type} onChange={handleChange} className={`w-full p-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`}>
                <option value="text" selected>Text</option>
                <option value="multiple_choice">Multiple Choice</option>
                <option value="multiple_select">Multiple Select</option>
                <option value="open_ended">Open Ended</option>
                <option value="file">File</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
            </select>

            <label htmlFor='category' className='text-lg'>Category:</label>
            <select name="category" value={questionData.category} onChange={handleChange} className={`w-full p-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`}>
                <option value={''}>----------</option>
                {qCats.map((qCat) => (
                    <option value={qCat['id']} key={qCat['id']}>{qCat['name']}</option>
                ))}
            </select>

            <label htmlFor='position' className='text-lg'>Position:</label>
            <input type="number" className={`w-full p-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`} name="position" value={questionData.position} onChange={handleChange} />

            <label htmlFor='weight' className='text-lg'>Weight:</label>
            <input type="number" step='.01' className={`w-full p-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`} name="weight" min={0} max={100} value={questionData.weight} onChange={handleChange} />
            {(questionData.type === 'multiple_choice' || questionData.type == 'multiple_select') && (
                <div className='mt-8 mb-12'>
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
                                placeholder='Goto Question #'
                                name={`goto-${index}`}
                                value={option.goto}
                                onChange={(e) => handleOptionGotoChange(e, index)}
                                className={`w-full p-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`}
                            />
                            <input
                                type="number"
                                placeholder='Option Weight'
                                step=".01"
                                name={`weight-${index}`}
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
                    <button type="button" onClick={handleAddOption} className="px-3 py-2 rounded-md text-blue-500 font-semibold mt-2 hover:bg-blue-600 hover:text-white ">Add Option</button>
                </div>
            )}


            <button type="submit" className="px-4 py-2 bg-blue-600 text-white cursor-pointer mt-1 text-m font-semibold rounded transition-colors shadow-md hover:bg-blue-700 focus:outline-none">Create Question</button>
        </form>
    );
};

export default CreateQuestionForm;
