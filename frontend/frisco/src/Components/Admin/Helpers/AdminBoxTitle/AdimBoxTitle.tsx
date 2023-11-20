import React from 'react';

interface AdimBoxTitleProps {
    title: string;
}

const AdimBoxTitle: React.FC<AdimBoxTitleProps> = ({ title }) => {

    return (
        <div className='text-2xl pl-4 mt-4 mb-4'>
            {title}
        </div>
    );
};

export default AdimBoxTitle;