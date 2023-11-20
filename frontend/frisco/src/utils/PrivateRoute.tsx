import React, { ReactNode, useState, useEffect } from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../utils/useAuthContext';

export type PrivateRouteProps = {
    authenticationPath: string;
    children: ReactNode;
} & RouteProps;


const PrivateRoute: React.FC<PrivateRouteProps> = ({ authenticationPath, children, ...routeProps }) => {
    const { user, authTokens } = useAuthContext();

    return user && authTokens ? (children as React.ReactElement) : <Navigate to={{ pathname: authenticationPath }} />;
};

export default PrivateRoute;
