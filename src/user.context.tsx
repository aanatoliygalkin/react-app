import { createContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom';

export interface UserContextProviderProps {
  children: ReactNode;
}

export interface UserContextType {
  user: UserProps
  inputName: string
  setInputName: React.Dispatch<React.SetStateAction<string>>
  loginUser: (e: React.FormEvent<HTMLFormElement>) => void
  logoutUser: () => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export interface UserProps {
  name: string;
  isLogined: boolean;
}

export const UserContextProvider = ({children}: UserContextProviderProps) => {
const navigate = useNavigate();
const [user, setUser] = useState<UserProps>({ name: '', isLogined: false });
const [inputName, setInputName] = useState('');

useEffect(() => {
    const res = localStorage.getItem('users');
    if (res) {
      const users: UserProps[] = JSON.parse(res);
      const loggedUser = users.find(user => user.isLogined === true);
      if (loggedUser)
        setUser(loggedUser);
      setInputName('');
    }

  }, [])

  const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = localStorage.getItem('users');
    const usersArray = res ? JSON.parse(res) : [];
    const existingUser = usersArray.find((u: UserProps) => u.name === inputName);
    if (existingUser) {
      const updateUsers = usersArray.map((u: UserProps) => {
        return {
          ...u,
          isLogined: u.name === inputName
        };
      })
      setUser(updateUsers.find((u: UserProps) => u.isLogined === true));
      localStorage.setItem('users', JSON.stringify(updateUsers));
      localStorage.setItem('jwt', 'jwt');
      navigate('/');
    } else {
      setUser({ name: inputName, isLogined: true });
      const updateUsers = usersArray.map((u: UserProps) => {
        return {
          ...u,
          isLogined: false,
        };
      })
      updateUsers.push({ name: inputName, isLogined: true });
      localStorage.setItem('users', JSON.stringify(updateUsers));
      localStorage.setItem('jwt', 'jwt');
      navigate('/');
    }
    setInputName('');
  }

  const logoutUser = () => {
    const res = localStorage.getItem('users');
    const usersArray = res ? JSON.parse(res) : [];
    const removeUsers = usersArray.map((u: UserProps) => {
      return {
        ...u,
        isLogined: false,
      }
    })
    setUser({ name: user.name, isLogined: false });
    localStorage.setItem('users', JSON.stringify(removeUsers));
    localStorage.removeItem('jwt');
    navigate('/login');
  }

return(
<UserContext.Provider value={{user, inputName, setInputName, loginUser, logoutUser}}>
{children}
</UserContext.Provider>
)
}

