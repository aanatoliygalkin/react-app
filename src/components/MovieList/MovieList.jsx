import './MovieList.css'

function MovieList( {children} ){
return(
    <div className='movie-list'>
    {children}
    </div>
)
}

export default MovieList