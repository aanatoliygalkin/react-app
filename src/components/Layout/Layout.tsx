// src/components/Layout/Layout.tsx
import Menu from '../Menu/Menu.js'
import MenuPanel from '../MenuPanel/MenuPanel.js'
import MenuButton from '../MenuButton/MenuButton.js'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { userActions } from '../../store/user.slice'
import styles from './LayoutStyle.module.css'
import { useEffect } from 'react'

function Layout() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector(state => state.user);
    
    // Показываем бейдж только если пользователь авторизован
    const favoritesCount = currentUser && currentUser.isLogined ? currentUser.cart?.length ?? 0 : 0;
    const showBadge = currentUser && currentUser.isLogined && favoritesCount > 0;

    useEffect(() => {
        console.log('Layout: currentUser =', currentUser);
    }, [currentUser]);

    const handleLogout = () => {
        dispatch(userActions.logoutUser());
        navigate('/login');
    };

    const isUserLoggedIn = currentUser !== null && currentUser.isLogined === true;

    return (
        <>
            <Menu>
                <MenuPanel>
                    <MenuButton to='/' text='Поиск фильмов' />
                    <MenuButton 
                        badge={showBadge ? favoritesCount : undefined} 
                        to='/favorites' 
                        text='Мои фильмы' 
                    />
                    {isUserLoggedIn ? (
                        <>
                            <MenuButton text={currentUser.name} />
                            <MenuButton onClick={handleLogout} text='Выйти' />
                        </>
                    ) : (
                        <MenuButton to='/login' text='Войти' />
                    )}
                </MenuPanel>
            </Menu>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default Layout;