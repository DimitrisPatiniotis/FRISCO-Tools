import React, { useState, useEffect } from 'react';
import { ACTIVE_URL } from '../../../../constants';
import { IonIcon } from '@ionic/react';
import { useAuthContext } from '../../../../utils/useAuthContext';
import { useNavigate } from 'react-router-dom';

type Place = 'intro' | 'outro';

interface QuestionnaireDescEditProps {
    currentDesc: string;
    place: Place;
}

const QuestionnaireDescEdit: React.FC<QuestionnaireDescEditProps> = ({ currentDesc, place }) => {
    const { authTokens } = useAuthContext();
    const [isEditing, setIsEditing] = useState(false);
    const [newDesc, setNewDesc] = useState(currentDesc);
    const navigate = useNavigate();
    const context = useAuthContext();

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        if (!authTokens || !authTokens.access) {
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            },
            body: JSON.stringify({ desc: newDesc }),
        };
        const fetchUrl = place === 'intro' ? `${ACTIVE_URL}/api/update_questionnaire_desc/` : `${ACTIVE_URL}/api/update_questionnaire_outro_desc/`;
        fetch(fetchUrl, requestOptions)
            .then(response => {
                if (response.ok) {
                    setIsEditing(false);
                } else {
                    console.error('Failed to update title');
                    if (response.status === 401) {
                        context.logoutUser();
                        navigate('/login');
                    }
                }
            })
            .catch(error => {
                console.error('Error updating title:', error);
            });
    };

    const handleCancelClick = () => {
        setNewDesc(currentDesc);
        setIsEditing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewDesc(e.target.value);
    };

    return (
        <div className="px-4">
            {isEditing ? (
                <div>
                    <textarea

                        value={newDesc === '' ? currentDesc : newDesc}
                        onChange={handleInputChange}
                        className={`w-full p-2 mb-4 border-2 rounded h-40 text-black no-outline focus:outline-none active:outline-none mt-1`}

                    />
                    <div className='flex justify-between px-1'>
                        <button onClick={handleSaveClick} className="px-4 py-2 bg-blue-600 text-white cursor-pointer mt-1 text-m font-semibold rounded transition-colors shadow-md hover:bg-blue-700 focus:outline-none">
                            <IonIcon icon="save" className='ionicon-default-transform' /> Save
                        </button>
                        <button onClick={handleCancelClick} className="text-red-500 font-semibold">
                            Cancel
                        </button>
                    </div>

                </div>
            ) : (
                <div>
                    <h1 className="text-m mt-3">
                        <div style={{ whiteSpace: 'pre-line' }}>{newDesc === '' ? currentDesc:newDesc}</div> 
                   </h1>
                    <button onClick={handleEditClick} className="px-4 py-2 mt-4 bg-blue-600 text-white cursor-pointer text-m font-semibold rounded transition-colors shadow-md hover:bg-blue-700 focus:outline-none">
                        <IonIcon icon="create" className='ionicon-default-transform' /> Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuestionnaireDescEdit;