import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { UserContextProvider } from './user.context'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import LoginPage from './pages/LoginPage/LoginPage'
import SearchMovies from './pages/SearchMovies/SearchMovies'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import MoviePage from './pages/MoviePage/MoviePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SearchMovies />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/favorites',
        element: <FavoritesPage />
      },
      {
        path: '/movie/:id',
        element: <MoviePage />
      }
    ]
  }
])

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <UserContextProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </UserContextProvider>
)