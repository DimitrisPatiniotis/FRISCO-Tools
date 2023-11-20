import React, { useState, useEffect } from 'react';
import { ACTIVE_URL } from '../../../../constants';
import { IonIcon } from '@ionic/react';
import { useAuthContext } from '../../../../utils/useAuthContext';
import { useNavigate } from 'react-router-dom';

type Place = 'intro' | 'outro';

interface QuestionnaireTitleEditProps {
    currentTitle: string;
    place: Place;
}

const QuestionnaireTitleEdit: React.FC<QuestionnaireTitleEditProps> = ({ currentTitle, place }) => {
    const navigate = useNavigate();
    const context = useAuthContext();
    const { authTokens } = useAuthContext();
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(currentTitle);

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
                'Authorization': `Bearer ${authTokens.access}`,
            },
            body: JSON.stringify({ title: newTitle }), 
        };

        const fetchUrl = place === 'intro' ? `${ACTIVE_URL}/api/update_questionnaire_title/` : `${ACTIVE_URL}/api/update_questionnaire_outro_title/`;

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
        setNewTitle(currentTitle);
        setIsEditing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    };

    return (
        <div className="px-4">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={newTitle === '' ? currentTitle : newTitle}
                        onChange={handleInputChange}
                        className={`w-full p-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`}

                    />
                    <div className='flex justify-between px-1'>
                        <button onClick={handleSaveClick} className="px-4 py-2 bg-blue-600 text-white cursor-pointer mt-1 text-m font-semibold rounded transition-colors shadow-md hover:bg-blue-700 focus:outline-none">
                            <IonIcon icon="save" className='ionicon-default-transform'/> Save
                        </button>
                        <button onClick={handleCancelClick} className="text-red-500 font-semibold">
                            Cancel
                        </button>
                    </div>

                </div>
            ) : (
                <div>
                    <h1 className="text-2xl mt-3">{newTitle === '' ? currentTitle : newTitle}</h1>
                    <button onClick={handleEditClick} className="px-4 py-2 mt-4 bg-blue-600 text-white cursor-pointer text-m font-semibold rounded transition-colors shadow-md hover:bg-blue-700 focus:outline-none">
                        <IonIcon icon="create" className='ionicon-default-transform'/> Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuestionnaireTitleEdit;