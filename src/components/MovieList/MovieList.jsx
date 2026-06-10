import styles from './MovieList.module.css'

function MovieList( {children} ){
return(
    <div className={styles['movie-list']}>
    {children}
    </div>
)
}

export default MovieList