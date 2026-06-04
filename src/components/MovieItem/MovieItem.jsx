import AddFavoriteButton from '../AddFavoriteButton/AddFavoriteButton'
import './MovieItem.css'

function MovieItem({ title, image, rating }) {
    const imageUrl = `/images/${image}.jpg`;
    return (
        <div className='movie-item'>
            <div className='movie-item-rating-div'>
                <span className='movie-item-rating'>{rating}</span>
            </div>
            <img className='movie-item-image' src={imageUrl} alt={image} />
            <h2 className='movie-item-h2'>{title}</h2>
            <AddFavoriteButton />
        </div>
    )
}

export default MovieItem