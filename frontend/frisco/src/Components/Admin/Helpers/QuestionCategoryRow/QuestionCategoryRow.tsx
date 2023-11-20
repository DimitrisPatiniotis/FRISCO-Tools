import React from 'react';
import StatusCircle from '../StatusCyrcle/StatusCircle';
import {IonIcon} from '@ionic/react';

interface QuestionCategoryRowProps {
    name: string;
    onSetInactiveClick: () => void;
}

const QuestionCategoryRow: React.FC<QuestionCategoryRowProps> = ({ name, onSetInactiveClick }) => {
    const handleSetInactiveClick = () => {
        onSetInactiveClick();
    };
    return (
        <div className='question-category-header'>
            <div>{name}</div>
            <div ><IonIcon icon='trash-outline' onClick={handleSetInactiveClick} className='cursor-pointer text-xl hover:text-red-500'></IonIcon> </div>
            <div  ><IonIcon icon='create' className='cursor-pointer text-xl hover:text-green-500' ></IonIcon> </div>
        </div>
    );
};

export default QuestionCategoryRow;