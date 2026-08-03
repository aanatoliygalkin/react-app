// src/pages/SearchMovies/SearchMovies.tsx
import Header from '../../components/Header/Header.js'
import Search from '../../components/Search/Search.js'
import MainInput from '../../components/MainInput/MainInput.js'
import Button from '../../components/Button/Button.js'
import Text from '../../components/Text/Text.js';
import MovieList from '../../components/MovieList/MovieList.js';
import MovieItem from '../../components/MovieItem/MovieItem.js';
import { useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../../helpers/PREFIX.js';
import NoSearch from '../../components/NoSearch/NoSearch.js';
import { useAppSelector } from '../../store/store.js';
import { MovieProps, ApiResponse } from '../../types/movie.types.js';

function SearchMovies() {
    const [movieData, setMovieData] = useState<MovieProps[]>([]);
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [noSearch, setNoSearch] = useState<boolean>(false);
    
    const { currentUser } = useAppSelector(state => state.user);
    const favoriteIds = currentUser?.cart.map(item => item.id) ?? [];

    const searchMovie = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value) {
            return;
        }
        setNoSearch(false);
        setMovieData([]);
        setIsLoading(true);
        try {
            const res = await axios.get<ApiResponse>(`${PREFIX}search-by-keyword?keyword=${value}`,
                {
                    headers: {
                        'X-API-KEY': 'e71384ee-c07d-4d44-9c84-6009eb0196dc'
                    }
                }
            );
            const films = res.data.films;
            const filteredFilms = films.filter((movie) => {
                const hasImage = !!(movie.posterUrlPreview || movie.posterUrl);
                const hasRating = !!(movie.rating && movie.rating !== 'null' && movie.rating !== null && movie.rating !== '0');
                return hasImage && hasRating;
            });
            if (filteredFilms.length > 0) {
                setNoSearch(false);
                setMovieData(filteredFilms);
            } else {
                setNoSearch(true);
                setMovieData([]);
            }
        }
        catch (e) {
            console.error(e);
            if (axios.isAxiosError(e)) {
                setError(e.message);
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Header title={'Поиск'} />
            <Text align='left'>Попробуйте изменить запрос или ввести более точное название фильма</Text>

            <form onSubmit={searchMovie}>
                <Search>
                    <MainInput 
                        value={value} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} 
                        placeholder={'Введите название'} 
                    />
                    {isLoading && <Button disabled={true} text='Ищем фильм...' />}
                    {!isLoading && <Button disabled={!value} type='submit' text='Искать' />}
                </Search>
            </form>
            
            <MovieList>
                {movieData.map((movie) => {
                    const isFavorite = favoriteIds.includes(movie.filmId);
                    
                    return (
                        <MovieItem
                            key={movie.filmId}
                            id={movie.filmId}
                            title={movie.nameRu || movie.nameEn || 'Без названия'}
                            image={movie.posterUrlPreview || movie.posterUrl}
                            rating={movie.rating || 'Нет рейтинга'}
                            isFavorite={isFavorite}
                        />
                    );
                })}
            </MovieList>
            
            {error && <Header title={`ОШИБКА: ${error}`} />}
            {noSearch && <NoSearch />}
            
            {!currentUser && (
                <Text align='center'>Войдите в систему, чтобы добавлять фильмы в избранное</Text>
            )}
        </div>
    )
}

export default SearchMovies;