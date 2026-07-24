import AddFavoriteButton from '../AddFavoriteButton/AddFavoriteButton'
import styles from './MovieItem.module.css'
import { MovieItemProps } from './MovieItem.props';

function MovieItem({ title, image, rating }: MovieItemProps) {
    const imageUrl = `/images/${image}.jpg`;
    return (
        <div className={styles['movie-item']}>
            <div className={styles['movie-item-rating-div']}>
                <span className={styles['movie-item-rating']}>{rating}</span>
            </div>
            <img className={styles['movie-item-image']} src={imageUrl} alt={image} />
            <h2 className={styles['movie-item-h2']}>{title}</h2>
            <AddFavoriteButton />
        </div>
    )
}

export default MovieItem