import { useLoaderData } from 'react-router-dom';
import type { MovieProps } from '../../types/movie.types';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/store';
import { userActions } from '../../store/user.slice';
import styles from './MoviePage.module.css'
import ratingStyles from '../../components/MovieItem/MovieItem.module.css';
import AddFavoriteButton from '../../components/AddFavoriteButton/AddFavoriteButton';

interface ApiMovieResponse {
    data: MovieProps;
    externalId: {
        imdbId: string | null;
    };
}

function MoviePage() {

    const response = useLoaderData() as ApiMovieResponse;
    const movie = response.data;
    const dispatch = useDispatch();
    const { currentUser } = useAppSelector(state => state.user);
    const isFavorite = currentUser?.cart.some(item => item.id === movie?.filmId) ?? false;

    const handleToggleFavorite = () => {
        if (!currentUser) {
            alert('Пожалуйста, войдите в систему');
            return;
        }

        if (!movie) return;

        dispatch(userActions.toggleFavorite({
            id: movie.filmId,
            title: movie.nameRu || movie.nameEn || 'Без названия',
            image: movie.posterUrlPreview || movie.posterUrl,
            rating: movie.rating || 'Нет рейтинга'
        }));
    };

    if (!movie) {
        return <div>Фильм не найден</div>;
    }

    console.log(movie);

    return (
        <div className={styles['movie-page']}>
            <div className={styles['title-block']}>
                <span className={styles['title-block-span']}>Поиск фильмов</span>
                <h2 className={styles['title-block-h2']}>{movie.nameRu || movie.nameEn}</h2>
            </div>
            <div className={styles['poster-block']}>
                <img className={styles['poster-img']} src={movie.posterUrl} alt="Постер" />
                <div className={styles['poster-content']}>
                    <p className={styles['poster-text']}>{movie.description}</p>
                    <div className={styles['poster-rating-div']}>
                        {movie.rating ?
                            <div className={styles['movie-item-rating-div']}>
                                <img className={styles['movie-item-star']} src="/icons/star.svg" alt="" />
                                <span className={styles['movie-item-rating']}>{movie.rating}</span>
                            </div> : ''}
                        <AddFavoriteButton onClick={handleToggleFavorite} isFavorite={isFavorite}></AddFavoriteButton>
                    </div>
                    <div className={styles['poster-content-info']}>
                        <span>Тип</span>
                        <p>{movie.type === 'TV_SERIES' ? 'Сериал' : 'Фильм'}</p>
                    </div>
                    <div className={styles['poster-content-info']}>
                        <span>Дата выхода</span>
                        <p>{movie.year}</p>
                    </div>
                    <div className={styles['poster-content-info']}>
                        <span>Жанр</span>
                        <p>{movie.genres.map(g => g.genre).join(', ')}</p>
                    </div>
                    <div className={styles['poster-content-info']}>
                        <span>Страны</span>
                        <p>{movie.countries.map(c => c.country).join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoviePage;