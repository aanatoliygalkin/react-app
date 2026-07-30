import { Link } from 'react-router-dom';
import AddFavoriteButton from '../AddFavoriteButton/AddFavoriteButton';
import styles from './MovieItem.module.css';
import { MovieItemProps } from './MovieItem.props';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { movieActions, movieItem } from '../../store/movie.slice';

function MovieItem({ id, title, image, rating }: MovieItemProps) {
    const imageUrl = image;
    const dispatch = useDispatch();
    const isFavorite = useSelector((state: RootState) =>
        state.movie.items.some(item => item.id === id)
    );

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        const movieData: movieItem = { id, title, image, rating };
        dispatch(movieActions.toggleFavorite(movieData));
    };

    return (
        <Link className={styles['movie-link']} to={`/movie/${id}`}>
            <div className={styles['movie-item']}>
                <div className={styles['movie-item-rating-div']}>
                    <img className={styles['movie-item-star']} src="/icons/star.svg" alt="" />
                    <span className={styles['movie-item-rating']}>{rating}</span>
                </div>
                <img className={styles['movie-item-image']} src={imageUrl} alt={title} />
                <div className={styles['movie-item-content']}>
                    <h2 className={styles['movie-item-h2']}>{title}</h2>
                </div>
                <AddFavoriteButton onClick={handleFavoriteClick} isFavorite={isFavorite} />
            </div>
        </Link>
    );
}

export default MovieItem;