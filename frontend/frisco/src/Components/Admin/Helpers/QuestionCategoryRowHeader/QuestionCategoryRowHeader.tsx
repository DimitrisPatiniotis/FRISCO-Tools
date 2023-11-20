import React from 'react';
import './QuestionCategoryRowHeader.css';

import {IonIcon} from '@ionic/react';


const QuestionCategoryRowHeader: React.FC = () => {

    return (
        <div className='question-category-header'>
            <div>Title</div>
            <div>Remove</div>
            <div>Edit</div>
        </div>
    );
};

export default QuestionCategoryRowHeader;