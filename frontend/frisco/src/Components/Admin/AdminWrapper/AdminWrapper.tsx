import React, { useState, useEffect } from 'react';
import './AdminWrapper.css';
import AdminSideBar from '../AdminSideBar/AdminSideBar';
import AdminHome from '../AdminHome/AdminHome';
import AdminFormAnswers from '../AdminFormAnswers/AdminFormAnswers';
import AdminFormQuestions from '../AdminFormQuestions/AdminFormQuestions';
import AdminFormQuestionnaire from '../AdminFormQuestionnaire/AdminFormQuestionnaire';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../utils/useAuthContext';
import { ACTIVE_URL } from '../../../constants';

const AdminWrapper: React.FC = () => {
    const navigate = useNavigate();
    const context = useAuthContext();
    const [userIsConnected, setUserIsConnected] = useState<boolean>(false);
    const { authTokens } = useAuthContext();
    const [activeScreen, setActiveScreen] = useState<string>('dashboard');

    const setActiveScreenHandler = (screen: string) => {
        setActiveScreen(screen);
    };


    useEffect(() => {
        const fetchResponses = async () => {
            if (!authTokens || !authTokens.access) {
                return;
            }
            try {
                const response = await fetch(`${ACTIVE_URL}/api/token/test_login/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authTokens.access}`,
                    }
                });
                if (response.ok) {
                    setUserIsConnected(true);
                } else {
                    console.error('Failed to fetch responses');
                    if (response.status === 401) {
                        context.logoutUser();
                        navigate('/login');
                    }
                }
            } catch (error) {
                console.error('Error fetching responses:', error);
            }
        };

        fetchResponses();
    }, []);

    if (!userIsConnected) {
        return <div className='h-screen'></div>;
    }

    return (
        <div className='admin-wrapper'>
            <AdminSideBar activeScreen={activeScreen}  setActiveScreen={setActiveScreenHandler}  />
            <div className='admin-wrapper-content-wrapper'>
                {activeScreen === 'dashboard' && <AdminHome />}
                {activeScreen === 'friscoResults' && <AdminFormAnswers />}
                {activeScreen === 'friscoQuestions' && <AdminFormQuestions />}
                {activeScreen === 'friscoQuestionnaire' && <AdminFormQuestionnaire />}
            </div>

        </div>
    )
};

export default AdminWrapper;