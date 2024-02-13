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

            className={`flexible-width simple-fade-in bg-frisco_purple mt-1 rounded-md flex flex-col select-none py-1 px-2 absolute  overflow-hidden`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={`text-sm flex`}
            >
                <div className='h-6'>
                    <IonIcon icon="information-outline" style={{ transform: " translateX(0px) translateY(3px)", fontSize: "16px" }} className='mr-1'/>
                </div>
                <div className={`mt-1 ${isVisible ? 'opacity-transition' : 'opacity-transition-reversed'} `} style={{ transform: " translateX(0px) translateY(-1px)" }}>
                    <HTMLRenderer htmlContent={text} />
                </div>
            </div>


        </div>



    );
};

export default Tooltip;
