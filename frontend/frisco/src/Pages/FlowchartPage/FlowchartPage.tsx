import React, { useState } from 'react';
import Flowchart from '../../Components/Flowchart/Flowchart';

const FlowchartPage = () => {
    document.title = 'Flowchart';
    return (
        <div className="h-screen  flex flex-col items-center justify-center">
            <Flowchart />
        </div>
    
    );
}

export default FlowchartPage;