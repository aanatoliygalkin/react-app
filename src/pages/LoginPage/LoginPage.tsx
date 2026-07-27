import Header from '../../components/Header/Header.js'
import Search from '../../components/Search/Search.js'
import MainInput from '../../components/MainInput/MainInput.js'
import Button from '../../components/Button/Button.js'
import { useContext } from 'react'
import { UserContext } from '../../user.context.js'

function LoginPage() {

    const { user, inputName, setInputName, loginUser, logoutUser } = useContext(UserContext)!;

    return (
        <div>
            <Header title={'Вход'} />
            <form onSubmit={loginUser} action="">
                <Search column={true}>
                    <MainInput value={inputName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputName(e.target.value)} margin='27px 0px 27px 0px' placeholder={'Ваше имя'} />
                    <Button disabled={inputName === ''} type='submit' text='Войти в профиль' />
                </Search>
            </form>
        </div>
    )
}

export default LoginPage;