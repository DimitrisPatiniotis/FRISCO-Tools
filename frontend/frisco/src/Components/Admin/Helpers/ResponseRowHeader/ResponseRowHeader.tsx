import React from 'react';
import './ResponseRowHeader.css';

import {IonIcon} from '@ionic/react';


const ResponseRowHeader: React.FC = () => {

    return (
        <div className='response-header'>
            <div>Questions Answered</div>
            <div>Score</div>
            <div>Last Updated</div>
            <div>Status</div>
            <div>Download</div>
        </div>
    );
};

export default ResponseRowHeader;