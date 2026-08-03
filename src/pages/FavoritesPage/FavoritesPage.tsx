// src/pages/FavoritesPage/FavoritesPage.tsx
import Header from '../../components/Header/Header.js'
import MovieList from '../../components/MovieList/MovieList.js'
import MovieItem from '../../components/MovieItem/MovieItem.js'
import Text from '../../components/Text/Text.js';
import { useAppSelector } from '../../store/store.js';

function FavoritesPage() {
    const { currentUser } = useAppSelector(state => state.user);

    if (!currentUser) {
        return (
            <div>
                <Header title={'Избранное'} />
                <Text align='center'>Пожалуйста, войдите в систему, чтобы увидеть избранные фильмы</Text>
            </div>
        );
    }

    if (currentUser.cart.length === 0) {
        return (
            <div>
                <Header title={'Избранное'} />
            </div>
        );
    }

    return (
        <div>
            <Header title={'Избранное'} />
            <MovieList>
                {currentUser.cart.map((movie) => (
                    <MovieItem
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        image={movie.image}
                        rating={movie.rating}
                        isFavorite={true}
                    />
                ))}
            </MovieList>
        </div>
    )
}

export default FavoritesPage;