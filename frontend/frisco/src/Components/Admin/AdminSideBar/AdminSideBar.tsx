import React, {useContext} from 'react';
import './AdminSideBar.css';
import img from '../../../images/logo.jpg';
import { IonIcon } from '@ionic/react';
import AuthContext from '../../../utils/AuthContext';


interface AdminSideBarProps {
    activeScreen: string;
    setActiveScreen: (screen: string) => void;
}

const AdminSideBar: React.FC<AdminSideBarProps> = ({ activeScreen, setActiveScreen }) => {
    let { logoutUser } = useContext(AuthContext) as any;

    const handleMenuItemClick = (screen: string) => {
        setActiveScreen(screen);
    };

    return (
        <div className='admin-sidebar overflow-y-auto'>
            <a href='/' className="flex items-center justify-center admin-logo mt-2 mb-2">
                <img src={img} alt="" />
            </a>
            <div className='sidebar-menu'>
                <div className={`sidebar-menu-item ${activeScreen === 'dashboard' ? 'active' : ''}`} onClick={() => handleMenuItemClick('dashboard')}>
                    <IonIcon icon="home-sharp" className="text-blue-800 font-semibold ion-icon-item" /> Dashboard
                </div>
                <div className={`sidebar-menu-item ${activeScreen === 'friscoQuestionnaire' ? 'active' : ''}`} onClick={() => handleMenuItemClick('friscoQuestionnaire')}>
                    <IonIcon icon="document-text" className="text-blue-800 font-semibold ion-icon-item" /> Questionnaire Overview
                </div>
                <div className={`sidebar-menu-item ${activeScreen === 'friscoQuestions' ? 'active' : ''}`} onClick={() => handleMenuItemClick('friscoQuestions')}>
                    <IonIcon icon="albums-outline" className="text-blue-800 font-semibold ion-icon-item" /> Form Questions
                </div>
                <div className={`sidebar-menu-item ${activeScreen === 'friscoResults' ? 'active' : ''}`} onClick={() => handleMenuItemClick('friscoResults')}>
                    <IonIcon icon="clipboard-sharp" className="text-blue-800 font-semibold ion-icon-item" /> Form Results
                </div>

            </div>
            <div className={`sidebar-menu-item logout ${activeScreen === 'settings' ? 'active' : ''}`} onClick={() => handleMenuItemClick('settings')}>
                <IonIcon icon="settings" className="text-blue-800 font-semibold ion-icon-item" /> Settings
            </div>
            <div className='sidebar-menu-item logout' onClick={logoutUser}>
                <IonIcon icon="log-out" className="text-blue-800 font-semibold ion-icon-item" /> Logout
            </div>
        </div>
    )
};

export default AdminSideBar;