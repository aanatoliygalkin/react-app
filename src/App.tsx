import './App.css'
import Header from './components/Header/Header.js'
import Text from './components/Text/Text.js'
import Button from './components/Button/Button.js'
import Search from './components/Search/Search.js'
import Menu from './components/Menu/Menu.js'
import MenuPanel from './components/MenuPanel/MenuPanel.js'
import MenuButton from './components/MenuButton/MenuButton.js'
import MovieList from './components/MovieList/MovieList.js'
import MovieItem from './components/MovieItem/MovieItem.js'
import MainInput from './components/MainInput/MainInput.js'
import { useContext } from 'react'
import { UserContext } from './user.context'

interface MovieProps {
    title: string;
  image: string;
  rating: string;
}

function App() {

  const movieData = [
    {
      title: 'Black Widow',
      image: 'image1',
      rating: '324'
    },
    {
      title: 'Shang Chi',
      image: 'image2',
      rating: '124'
    },
    {
      title: 'Loki',
      image: 'image3',
      rating: '235'
    },
    {
      title: 'How I Met Your Mother',
      image: 'image4',
      rating: '235'
    },
    {
      title: 'Money Heist',
      image: 'image5',
      rating: '8125'
    },
    {
      title: 'Friends',
      image: 'image6',
      rating: '123'
    },
    {
      title: 'The Big Bang Theory',
      image: 'image7',
      rating: '12'
    },
    {
      title: 'Two And a Half Men',
      image: 'image8',
      rating: '456'
    },
  ] 

  const { user, inputName, setInputName, loginUser, logoutUser } = useContext(UserContext)!;

  return (
<>
      <Menu>
        <MenuPanel>
          <MenuButton text='Поиск фильмов' />
          <MenuButton text='Мои фильмы' />
          {user.isLogined ? (
            <>
              <MenuButton text={user.name} />
              <MenuButton onClick={logoutUser} text='Выйти' />
            </>
          ) : (<MenuButton text='Войти' />)}
        </MenuPanel>
      </Menu>
      <Header title={'Поиск'} />
      <Text />
      <Search>
        <MainInput placeholder={'Введите название'} />
        <Button text='Искать' />
      </Search>
      <MovieList>
        {movieData.map((movie, index) =>
          <MovieItem
            key={index}
            title={movie.title}
            image={movie.image}
            rating={movie.rating} />
        )}
      </MovieList>
      <Header title={'Вход'} />
      <form onSubmit={loginUser} action="">
        <Search column={true}>
          <MainInput value={inputName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputName(e.target.value)} margin='27px 0px 27px 0px' placeholder={'Ваше имя'} />
          <Button disabled={inputName === ''} type='submit' text='Войти в профиль' />
        </Search>
      </form>
      </>
  )
}

export default App
