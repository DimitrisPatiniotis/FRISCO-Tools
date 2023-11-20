import React, { useState, ChangeEvent, FormEvent } from 'react';
import './CreateQuestionCategory.css';
import {IonIcon} from '@ionic/react';
import CKEditorComponent from '../../../../utils/CKEditorComponent';

interface QuestionCategoryData {
    title: string;
    description: string;
}

interface CreateQuestionCategoryFormProps {
    onCreateQuestion: (QuestionCategoryData: QuestionCategoryData) => void;
}

const CreateQuestionCategoryForm: React.FC<CreateQuestionCategoryFormProps> = ({ onCreateQuestion }) => {
    const initialQuestionCategoryData: QuestionCategoryData = {
        title: '',
        description: '',
    };

    const [QuestionCategoryData, setQuestionCategoryData] = useState<QuestionCategoryData>(initialQuestionCategoryData);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setQuestionCategoryData({
            ...QuestionCategoryData,
            [name]: value,
        });
    };

    const handleCKEditorChange = (content: string) => {
        setQuestionCategoryData({
            ...QuestionCategoryData,
            description: content,
        });
        console.log(QuestionCategoryData)
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreateQuestion(QuestionCategoryData);
        setQuestionCategoryData(initialQuestionCategoryData);
    };

    return (
        <form onSubmit={handleSubmit} className='p-4'>
            <label htmlFor='title' className='text-lg'>Category Title:</label>
            <input type="text" name="title" value={QuestionCategoryData.title} onChange={handleInputChange} className={`w-full p-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`} />
            <label htmlFor='description' className='text-lg'>Question Description:</label>
            <CKEditorComponent onChange={handleCKEditorChange} />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white cursor-pointer mt-1 text-m font-semibold rounded transition-colors shadow-md hover:bg-blue-700 focus:outline-none"><IonIcon icon='add-outline' className='cursor-pointer text-xl hover:text-green-500 translate-y-1/4' ></IonIcon> Create Question</button>
        </form>
    );
};

export default CreateQuestionCategoryForm;