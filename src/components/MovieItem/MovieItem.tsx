import { Link, useParams } from 'react-router-dom';
import AddFavoriteButton from '../AddFavoriteButton/AddFavoriteButton'
import styles from './MovieItem.module.css'
import { MovieItemProps } from './MovieItem.props';

function MovieItem({ id, title, image, rating }: MovieItemProps) {
    const imageUrl = `/images/${image}.jpg`;
    const param = useParams();
    return (
        <Link to={`/movie/${id}`}>
            <div className={styles['movie-item']}>
                <div className={styles['movie-item-rating-div']}>
                    <span className={styles['movie-item-rating']}>{rating}</span>
                </div>
                <img className={styles['movie-item-image']} src={imageUrl} alt={image} />
                <h2 className={styles['movie-item-h2']}>{title}</h2>
                <AddFavoriteButton />
            </div>
        </Link>
    )
}

export default MovieItem