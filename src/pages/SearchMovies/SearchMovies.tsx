import Header from '../../components/Header/Header.js'
import Search from '../../components/Search/Search.js'
import MainInput from '../../components/MainInput/MainInput.js'
import Button from '../../components/Button/Button.js'
import Text from '../../components/Text/Text.js';
import MovieList from '../../components/MovieList/MovieList.js';
import MovieItem from '../../components/MovieItem/MovieItem.js';

function SearchMovies() {

    interface MovieProps {
        title: string;
        image: string;
        rating: string;
    }

    const movieData = [
        {
            id: 1,
            title: 'Black Widow',
            image: 'image1',
            rating: '324'
        },
        {
            id: 2,
            title: 'Shang Chi',
            image: 'image2',
            rating: '124'
        },
        {
            id: 3,
            title: 'Loki',
            image: 'image3',
            rating: '235'
        },
        {
            id: 4,
            title: 'How I Met Your Mother',
            image: 'image4',
            rating: '235'
        },
        {
            id: 5,
            title: 'Money Heist',
            image: 'image5',
            rating: '8125'
        },
        {
            id: 6,
            title: 'Friends',
            image: 'image6',
            rating: '123'
        },
        {
            id: 7,
            title: 'The Big Bang Theory',
            image: 'image7',
            rating: '12'
        },
        {
            id: 8,
            title: 'Two And a Half Men',
            image: 'image8',
            rating: '456'
        },
    ]

    return (
        <div>
            <Header title={'Поиск'} />
            <Text />
            <Search>
                <MainInput placeholder={'Введите название'} />
                <Button text='Искать' />
            </Search>
            <MovieList>
                {movieData.map((movie, index) =>
                    <MovieItem
                        key={index}
                        id={movie.id}
                        title={movie.title}
                        image={movie.image}
                        rating={movie.rating} />
                )}
            </MovieList>
        </div>
    )
}

export default SearchMovies;