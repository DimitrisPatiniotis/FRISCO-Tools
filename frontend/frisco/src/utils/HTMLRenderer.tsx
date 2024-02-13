import React, { useEffect, useRef } from 'react';

interface HTMLRendererProps {
  htmlContent: string;
  className?: string;
}

const HTMLRenderer: React.FC<HTMLRendererProps> = ({ htmlContent, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the container reference exists
    if (containerRef.current) {
      // Parse the HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');

      // Update links with target="_blank"
      const links = doc.querySelectorAll('a');
      links.forEach(link => {
        link.setAttribute('target', '_blank');
        // Optionally, you can also add rel="noopener noreferrer" for security reasons
        link.setAttribute('rel', 'noopener noreferrer');
      });

      // Set the modified HTML content back to the container
      containerRef.current.innerHTML = doc.body.innerHTML;
    }
  }, [htmlContent]);

  return (
    <div ref={containerRef} className={`${className ? className : 'text-sm'}`} />
  );
};

export default HTMLRenderer;