import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header.js'

function MoviePage() {

    const { id } = useParams();

    return (
        <div>
            <Header title={`ID фильма - ${id}`} />
        </div>
    )
}

export default MoviePage;