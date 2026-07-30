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

export interface MovieProps {
    filmId: number;           // В API это filmId, не id
    nameRu: string;           // Русское название
    nameEn: string;           // Английское название
    posterUrl: string;        // Постер (большой)
    posterUrlPreview: string; // Постер (маленький)
    rating: string;           // Рейтинг
    year: string;             // Год выпуска
    description?: string;     // Описание (может отсутствовать)
    genres: { genre: string }[]; // Массив жанров
    countries: { country: string }[]; // Массив стран
    type: string;             // FILM, TV_SERIES, VIDEO
    filmLength: string;       // Длительность
}

export interface ApiResponse {
    keyword: string;
    pagesCount: number;
    searchFilmsCountResult: number;
    films: MovieProps[];
}

function SearchMovies() {

    // const movieData = [
    //     {
    //         id: 1,
    //         title: 'Black Widow',
    //         image: 'image1',
    //         rating: '324'
    //     },
    //     {
    //         id: 2,
    //         title: 'Shang Chi',
    //         image: 'image2',
    //         rating: '124'
    //     },
    //     {
    //         id: 3,
    //         title: 'Loki',
    //         image: 'image3',
    //         rating: '235'
    //     },
    //     {
    //         id: 4,
    //         title: 'How I Met Your Mother',
    //         image: 'image4',
    //         rating: '235'
    //     },
    //     {
    //         id: 5,
    //         title: 'Money Heist',
    //         image: 'image5',
    //         rating: '8125'
    //     },
    //     {
    //         id: 6,
    //         title: 'Friends',
    //         image: 'image6',
    //         rating: '123'
    //     },
    //     {
    //         id: 7,
    //         title: 'The Big Bang Theory',
    //         image: 'image7',
    //         rating: '12'
    //     },
    //     {
    //         id: 8,
    //         title: 'Two And a Half Men',
    //         image: 'image8',
    //         rating: '456'
    //     },
    // ]

    const [movieData, setMovieData] = useState<MovieProps[]>([]);

    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [noSearch, setNoSearch] = useState<boolean>(false);

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

            <form onSubmit={searchMovie} action="">
                <Search>
                    <MainInput value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} placeholder={'Введите название'} />
                    {isLoading && <Button disabled={true} text='Ищем фильм...' />}
                    {!isLoading && <Button disabled={!value} type='submit' text='Искать' />}
                </Search>
            </form>
            <MovieList>
                {movieData
                    .map((movie) =>
                        <MovieItem
                            key={movie.filmId}
                            id={movie.filmId}
                            title={movie.nameRu || movie.nameEn || 'Без названия'}
                            image={movie.posterUrlPreview || movie.posterUrl}
                            rating={movie.rating || 'Нет рейтинга'} />
                    )}
            </MovieList>
            {error && <Header title={`ОШИБКА: ${error}`} />}
            {noSearch && < NoSearch />}
        </div>
    )
}

export default SearchMovies;