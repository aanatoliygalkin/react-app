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

function SearchMovies() {

    interface MovieProps {
        id: number;
        title: string;
        image: string;
        rating: string;
    }

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

    const searchMovie = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value) {
            return;
        }
        setIsLoading(true);
        try {
            const res = await axios.get<MovieProps[]>(`${PREFIX}/?q=${value}`);
            const { data } = res;
            setMovieData(data);
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
            <Text />

            <form onSubmit={searchMovie} action="">
                <Search>
                    <MainInput value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} placeholder={'Введите название'} />
                    {isLoading && <Button disabled={true} text='Ищем фильм...' />}
                    {!isLoading && <Button disabled={!value} type='submit' text='Искать' />}
                </Search>
            </form>
            <MovieList>
                {movieData.map((movie, index) =>
                    <MovieItem
                        key={index}
                        id={movie.id}
                        title={movie.title}
                        image={movie.image}
                        rating={movie.rating} />
                )}
            </MovieList>
            {error && <Header title={`ОШИБКА: ${error}`} />}
        </div>
    )
}

export default SearchMovies;