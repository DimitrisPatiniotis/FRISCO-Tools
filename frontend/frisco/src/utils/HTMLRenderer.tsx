import React from 'react';

interface HTMLRendererProps {
  htmlContent: string;
}

const HTMLRenderer: React.FC<HTMLRendererProps> = ({ htmlContent }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} className='text-sm' />
  );
};

export default HTMLRenderer;