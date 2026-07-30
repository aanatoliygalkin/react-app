import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header.js'
import { RootState } from '../../store/store.js';
import MovieList from '../../components/MovieList/MovieList.js';
import MovieItem from '../../components/MovieItem/MovieItem.js';
import { MovieProps } from '../SearchMovies/SearchMovies.js';
import { useEffect, useState } from 'react';
import { movieItem } from '../../store/movie.slice.js';

function FavoritesPage() {

    const [movieData, setMovieData] = useState<movieItem[]>([]);

    const items = useSelector((state: RootState) => state.movie.items);

    useEffect(() => {
        setMovieData(items);
    }, [items])

    return (
        <div>
            <Header title={'Избранное'} />
            <MovieList>
                {movieData
                    .map((movie) =>
                        <MovieItem
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            image={movie.image}
                            rating={movie.rating}/>
                    )}
            </MovieList>
        </div>
    )
}

export default FavoritesPage;