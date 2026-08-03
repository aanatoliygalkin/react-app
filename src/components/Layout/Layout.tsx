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
    const { currentUser, users } = useAppSelector(state => state.user);
    
    const favoritesCount = currentUser?.cart?.length ?? 0;

    useEffect(() => {
        console.log('Layout: currentUser =', currentUser);
        console.log('Layout: all users =', users);
        console.log('Layout: isLogined =', currentUser?.isLogined);
        console.log('Layout: cart length =', currentUser?.cart?.length);
    }, [currentUser, users]);

    const handleLogout = () => {
        dispatch(userActions.logoutUser());
        navigate('/login');
    };

    // Проверяем, действительно ли пользователь залогинен
    const isUserLoggedIn = currentUser !== null && currentUser.isLogined === true;

    return (
        <>
            <Menu>
                <MenuPanel>
                    <MenuButton to='/' text='Поиск фильмов' />
                    <MenuButton badge={favoritesCount} to='/favorites' text='Мои фильмы' />
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