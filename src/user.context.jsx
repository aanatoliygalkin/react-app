import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext({
name: '',
isLogined: false
})

export const UserContextProvider = ({children}) => {
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

return(
<UserContext.Provider value={{user, inputName, setInputName, loginUser, logoutUser}}>
{children}
</UserContext.Provider>
)
}

