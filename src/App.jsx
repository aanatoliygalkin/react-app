import './App.css'
import Header from './components/Header/Header.jsx'
import Text from './components/Text/Text.jsx'
import Button from './components/Button/Button.jsx'
import Search from './components/Search/Search.jsx'
import SearchInput from './components/SearchInput/SearchInput.jsx'
import Menu from './components/Menu/Menu.jsx'
import MenuPanel from './components/MenuPanel/MenuPanel.jsx'
import MenuButton from './components/MenuButton/MenuButton.jsx'

function App() {

  return (
    <>
      <Menu>
        <MenuPanel>
          <MenuButton text='Поиск фильмов' />
          <MenuButton text='Мои фильмы' />
          <MenuButton text='Войти' />
        </MenuPanel>
      </Menu>
      <Header />
      <Text />
      <Search>
        <SearchInput />
        <Button text='Искать' />
      </Search>
    </>
  )
}

export default App
