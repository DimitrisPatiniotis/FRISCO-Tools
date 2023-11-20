import React, { useState } from 'react';


interface PageTitleProps {
    pageTitle: string;
}


const PageTitle: React.FC<PageTitleProps> = ({pageTitle}) => {


    return (
        <div className='text-3xl'>
            {pageTitle}
        </div>
    )
};

export default PageTitle;