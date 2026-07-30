import { ReactNode } from 'react'
import styles from './NoSearch.module.css'
import Text from '../Text/Text';

function NoSearch() {
    return (
        <>
            <div>
                <h2 className={styles['no-search-h2']}>Упс... Ничего не найдено</h2>
                <Text align='center'>Попробуйте изменить запрос или ввести более точное название фильма</Text>
            </div>
        </>
    )
}

export default NoSearch