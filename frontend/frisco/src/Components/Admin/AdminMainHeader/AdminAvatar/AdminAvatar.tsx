import React, { useState, useEffect } from 'react';
import profileImg from '../../../../images/defaults/profile-icon.png';
import './AdminAvatar.css';
import { ACTIVE_URL } from '../../../../constants';
import { useAuthContext } from '../../../../utils/useAuthContext';
import { useNavigate } from 'react-router-dom';

const AdminAvatar: React.FC = () => {
    const { authTokens } = useAuthContext();
    const context = useAuthContext();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        userRole: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!authTokens || !authTokens.access) {
                    return;
                }
                const response = await fetch(`${ACTIVE_URL}/api/get_user_info/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authTokens.access}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserData({
                        username: data.username,
                        userRole: data.status,
                    });
                    console.log(data)
                } else {
                    console.error('Failed to fetch data:', response.status, response.statusText);
                    if (response.status === 401) {
                        context.logoutUser();
                        navigate('/login');
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [authTokens]);

    return (
        <div className='admin-avatar-wrapper'>
            <div className='admin-avatar-img-wrapper'>
                <img src={profileImg} alt="Profile Image" />
            </div>
            <div className='admin-avatar-info'>
                <div className='admin-avatar-info--main'>
                    {userData.username}
                </div>
                <div className='admin-avatar-info--secondary'>
                    {userData.userRole}
                </div>
            </div>
        </div>
    );
};

export default AdminAvatar;