import React, { ReactNode } from 'react';
import './AdminBox.css';

interface AdminBoxProps {
  children: ReactNode;
}

const AdminBox: React.FC<AdminBoxProps> = ({ children }) => {
  return (
    <div className='admin-box'>
      {children}
    </div>
  );
};

export default AdminBox;