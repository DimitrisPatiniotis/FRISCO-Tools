import React from 'react';
import './QuestionRowHeader.css';

import {IonIcon} from '@ionic/react';


const QuesitonRowHeader: React.FC = () => {

    return (
        <div className='question-header'>
            <div>Position</div>
            <div>Question</div>
            <div>Category</div>
            <div>Type</div>
            <div>Weight</div>
            <div>Remove</div>
            <div>Edit</div>
        </div>
    );
};

export default QuesitonRowHeader;