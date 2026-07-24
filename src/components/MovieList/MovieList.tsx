import { ReactNode } from 'react'
import styles from './MovieList.module.css'

interface MovieListProps {
children: ReactNode;
}

function MovieList( {children}: MovieListProps ){
return(
    <div className={styles['movie-list']}>
    {children}
    </div>
)
}

export default MovieList