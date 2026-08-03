// src/pages/LoginPage/LoginPage.tsx
import Header from '../../components/Header/Header.js'
import Search from '../../components/Search/Search.js'
import MainInput from '../../components/MainInput/MainInput.js'
import Button from '../../components/Button/Button.js'
import { FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { userActions } from '../../store/user.slice'

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { currentUser, inputName } = useAppSelector(state => state.user);

    useEffect(() => {
        console.log('LoginPage: currentUser =', currentUser);
        if (currentUser) {
            console.log('Пользователь авторизован, перенаправление на главную');
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        console.log('Попытка входа с именем:', inputName);
        dispatch(userActions.loginUser());
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(userActions.setInputName(e.target.value));
    };

    return (
        <div>
            <Header title={'Вход'} />
            <form onSubmit={handleLogin}>
                <Search column={true}>
                    <MainInput 
                        value={inputName} 
                        onChange={handleInputChange}
                        margin='27px 0px 27px 0px' 
                        placeholder={'Ваше имя'} 
                    />
                    <Button 
                        disabled={inputName === ''} 
                        type='submit' 
                        text='Войти в профиль' 
                    />
                </Search>
            </form>
        </div>
    )
}

export default LoginPage;