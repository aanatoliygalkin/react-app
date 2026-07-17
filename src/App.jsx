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
import { useEffect, useState } from 'react'

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

  const [user, setUser] = useState({ name: '', isLogined: false });
  const [inputName, setInputName] = useState('');

  useEffect(() => {
    const res = localStorage.getItem('users');
    if (res) {
      const users = JSON.parse(res);
      const loggedUser = users.find(user => user.isLogined === true);
      if (loggedUser)
        setUser(loggedUser);
      setInputName('');
    }

  }, [])

  const loginUser = (e) => {
    e.preventDefault();
    const res = localStorage.getItem('users');
    const usersArray = res ? JSON.parse(res) : [];
    const existingUser = usersArray.find(u => u.name === inputName);
    if (existingUser) {
      const updateUsers = usersArray.map((u) => {
        return {
          ...u,
          isLogined: u.name === inputName
        };
      })
      setUser(updateUsers.find(u => u.isLogined === true));
      localStorage.setItem('users', JSON.stringify(updateUsers));
    } else {
      setUser({ name: inputName, isLogined: true });
      const updateUsers = usersArray.map((u) => {
        return {
          ...u,
          isLogined: false,
        };
      })
      updateUsers.push({ name: inputName, isLogined: true });
      localStorage.setItem('users', JSON.stringify(updateUsers));
    }
    setInputName('');
  }

  const logoutUser = () => {
    const res = localStorage.getItem('users');
    const usersArray = res ? JSON.parse(res) : [];
    const removeUsers = usersArray.map((u) => {
      return {
        ...u,
        isLogined: false,
      }
    })
    setUser({ name: user.name, isLogined: false });
    localStorage.setItem('users', JSON.stringify(removeUsers));
  }


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
