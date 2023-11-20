import React, { useContext, FormEvent, useState } from 'react';
import AuthContext from '../../utils/AuthContext';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await authContext?.loginUser(username, password);
  };

  return (
    <div className='login-wrapper'>
      <form onSubmit={handleLoginFormSubmit} className='login-form'>
        <div className='login-form--title text-3xl text-white mb-6'>Frisco Admin Login</div>
        <label htmlFor="username" className="text-white text-lg ">Username</label>
        <input type="text" name="username" placeholder="Enter Username" value={username}
        className={`w-full p-2 mb-4 border-2 rounded text-black no-outline focus:outline-none active:outline-none mt-1`} onChange={(e) => setUsername(e.target.value)}/>
        <label htmlFor="password" className="text-white text-lg">Password</label>
        <input type="password" className={`w-full p-2 mb-4 border-2 rounded text-black no-outline focus:outline-none mt-1 active:outline-none`}  name="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input className="px-4 py-2 bg-blue-600 text-white cursor-pointer mt-1 text-m font-semibold rounded transition-colors shadow-md hover:bg-blue-700 focus:outline-none" type="submit" value={'Login'} />
      </form>
    </div>
  );
};

export default LoginPage;
