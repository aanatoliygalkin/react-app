import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        if (!jwt) {
            navigate('/login', { replace: true });
        }
    }, [jwt, navigate]);

    if (!jwt) {
        return null;
    }

    return children;
};