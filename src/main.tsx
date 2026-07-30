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
import axios from 'axios'
import { PREFIX } from './helpers/PREFIX'
import { RequireAuth } from './helpers/RequireAuth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserContextProvider><Layout /></UserContextProvider>,
    children: [
      {
        path: '/',
        element: <RequireAuth><SearchMovies /></RequireAuth>
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/favorites',
        element: <RequireAuth><FavoritesPage /></RequireAuth>
      },
      {
        path: '/movie/:id',
        element: <RequireAuth><MoviePage /></RequireAuth>,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          const { data } = await axios.get(`${PREFIX}${params.id}`,
            {
              headers: {
                'X-API-KEY': 'e71384ee-c07d-4d44-9c84-6009eb0196dc'
              }
            }
          );
          return data;
        }
      }
    ]
  }
])

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)