// src/helpers/RequireAuth.tsx
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const { currentUser } = useAppSelector((state) => state.user);
    
    useEffect(() => {
        if (!currentUser) {
            navigate('/login', { replace: true });
        }
    }, [currentUser, navigate]);
    
    if (!currentUser) {
        return null;
    }
    return <div>{children}</div>;
};