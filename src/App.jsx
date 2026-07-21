import './App.css'
import Header from './components/Header/Header.jsx'
import Text from './components/Text/Text.jsx'
import Button from './components/Button/Button.jsx'
import Search from './components/Search/Search.jsx'
import Menu from './components/Menu/Menu.jsx'
import MenuPanel from './components/MenuPanel/MenuPanel.jsx'
import MenuButton from './components/MenuButton/MenuButton.jsx'
import MovieList from './components/MovieList/MovieList.jsx'
import MovieItem from './components/MovieItem/MovieItem.jsx'
import MainInput from './components/MainInput/MainInput.jsx'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from './user.context.jsx'

function App() {

/*   const movieData = [
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
  ] */

  const movieData = []
  const { user, inputName, setInputName, loginUser, logoutUser } = useContext(UserContext);

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
          <MainInput value={inputName} onChange={(e) => setInputName(e.target.value)} margin='27px 0px 27px 0px' placeholder={'Ваше имя'} />
          <Button disabled={inputName === ''} type='submit' text='Войти в профиль' />
        </Search>
      </form>
      </>
  )
}

export default App
