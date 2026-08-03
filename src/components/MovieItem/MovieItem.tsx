// src/components/MovieItem/MovieItem.tsx
import { Link } from 'react-router-dom';
import AddFavoriteButton from '../AddFavoriteButton/AddFavoriteButton';
import styles from './MovieItem.module.css';
import { MovieItemProps } from './MovieItem.props';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { userActions } from '../../store/user.slice';

function MovieItem({ id, title, image, rating, isFavorite = false }: MovieItemProps) {
    const imageUrl = image;
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector(state => state.user);
    
    // Проверяем, есть ли фильм в избранном у текущего пользователя
    const isFavoriteMovie = isFavorite || (currentUser?.cart.some(item => item.id === id) ?? false);

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        
        if (!currentUser) {
            alert('Пожалуйста, войдите в систему, чтобы добавлять фильмы в избранное');
            return;
        }
        
        const movieData = { id, title, image, rating };
        dispatch(userActions.toggleFavorite(movieData));
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
                <AddFavoriteButton onClick={handleFavoriteClick} isFavorite={isFavoriteMovie} />
            </div>
        </Link>
    );
}

export default MovieItem;