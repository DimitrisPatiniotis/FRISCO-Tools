import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import HTMLRenderer from '../HTMLRenderer';
import './Tooltip.css';

interface TooltipProps {
    title: string;
    text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title, text }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    return (

        <div

            className='flexible-width bg-blue-800 mt-1 rounded-md flex flex-col select-none py-1 px-2 absolute overflow-hidden'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={`text-sm flex`}
            >
                <div className='h-10'>
                <IonIcon name="information-outline" style={{ transform: " translateX(0px) translateY(3px)", fontSize:"16px" }} />
                </div>
                <span
                    className={`overflow-hidden whitespace-no-wrap inline-block ml-1 pt-0.5 ${isVisible ? 'opacity-transition' : 'opacity-transition-reversed'}`}
                >
                    {/* {title} */}
                </span>
            </div>
            <div className={`mt-1 ${isVisible ? 'opacity-transition' : 'opacity-transition-reversed'}`}>
                <HTMLRenderer htmlContent={text} />
            </div>

        </div>



    );
};

export default Tooltip;
