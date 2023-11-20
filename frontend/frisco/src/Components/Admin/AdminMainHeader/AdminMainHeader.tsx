import React, { useState } from 'react';
import AdminAvatar from './AdminAvatar/AdminAvatar';
import PageTitle from './PageTitle/PageTitle';
import './AdminMainHeader.css';


interface AdminMainHeaderProps {
    pageTitle: string;

}

const AdminMainHeader: React.FC<AdminMainHeaderProps> = ({pageTitle}) => {

    return (
        <div className='admin-main-header'>
            <PageTitle pageTitle={pageTitle} />
            <AdminAvatar />
        </div>
    )
};

export default AdminMainHeader;