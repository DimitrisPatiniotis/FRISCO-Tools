import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { ACTIVE_URL } from '../constants';

type User = {
    id: number;
    username: string;
};

type AuthTokens = {
    access: string;
    refresh: string;
};

export type AuthContextType = {
    user: User | null;
    authTokens: AuthTokens | null;
    loginUser: (username: string, password: string) => Promise<void>;
    logoutUser: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storedAuthTokens = localStorage.getItem('authTokens');
    const [authTokens, setAuthTokens] = useState<AuthTokens | null>(
        storedAuthTokens ? JSON.parse(storedAuthTokens) : null
    );

    const storedAuthTokensUser = localStorage.getItem('authTokens');
    const [user, setUser] = useState<User | null>(
        storedAuthTokensUser ? jwt_decode<User>(storedAuthTokensUser) : null
    );
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const loginUser = async (username: string, password: string) => {
        const response = await fetch(`${ACTIVE_URL}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': username, 'password': password })
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode<User>(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/admin');
        } else {
            alert('Something went wrong!');
        }
    };


    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    };
    const updateToken = async () => {
        try {
            const response = await fetch(`${ACTIVE_URL}/api/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: authTokens?.refresh }),
            });
    
            if (response.status === 200) {
                const data = await response.json();
                setAuthTokens(data);
                setUser(jwt_decode<User>(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
              } else if (response.status === 401) {
                console.error('Token refresh failed: Unauthorized (401)');
                logoutUser();
              } else {
                console.error('Token refresh failed:', response.status, response.statusText);
              }
          
              if (loading) {
                setLoading(false);
              }
            } catch (error) {
              console.error('Error refreshing token:', error);
              logoutUser();
            }
          };

    useEffect(() => {
        if (loading) {
            updateToken();
        }

        // Increased refresh rate to 4 hours
        const four_hours = 1000 * 60 * 60 * 4;

        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, four_hours);

        return () => clearInterval(interval);
    }, [authTokens, loading]);

    const contextData: AuthContextType = {
        user,
        authTokens,
        loginUser,
        logoutUser
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
