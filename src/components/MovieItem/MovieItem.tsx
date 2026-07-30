import { Link, useParams } from 'react-router-dom';
import AddFavoriteButton from '../AddFavoriteButton/AddFavoriteButton'
import styles from './MovieItem.module.css'
import { MovieItemProps } from './MovieItem.props';

function MovieItem({ id, title, image, rating }: MovieItemProps) {
    const imageUrl = image;
    const param = useParams();
    return (
        <Link className={styles['movie-link']} to={`/movie/${id}`}>
            <div className={styles['movie-item']}>
                <div className={styles['movie-item-rating-div']}>
                    <img className={styles['movie-item-star']} src="/icons/star.svg" alt="" />
                    <span className={styles['movie-item-rating']}>{rating}</span>
                </div>
                <img className={styles['movie-item-image']} src={imageUrl} alt={image} />
                <div className={styles['movie-item-content']}>
                    <h2 className={styles['movie-item-h2']}>{title}</h2>
                </div>
                <AddFavoriteButton />
            </div>
        </Link>
    )
}

export default MovieItem