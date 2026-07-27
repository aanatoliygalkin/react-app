import Menu from '../Menu/Menu.js'
import MenuPanel from '../MenuPanel/MenuPanel.js'
import MenuButton from '../MenuButton/MenuButton.js'
import { useContext } from 'react'
import { UserContext } from '../../user.context'
import { Outlet } from 'react-router-dom'

function Layout() {

  const { user, logoutUser } = useContext(UserContext)!;

  return (
    <>
      <Menu>
        <MenuPanel>
          <MenuButton to='/' text='Поиск фильмов' />
          <MenuButton to='/favorites' text='Мои фильмы' />
          {user.isLogined ? (
            <>
              <MenuButton text={user.name} />
              <MenuButton onClick={logoutUser} text='Выйти' />
            </>
          ) : (<MenuButton to='/login' text='Войти' />)}
        </MenuPanel>
      </Menu>
      <div>
        <Outlet/>
      </div>
    </>
  )
}

export default Layout
