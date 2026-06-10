import styles from './SearchInput.module.css'

function SearchInput() {
    return (
        <div className={styles['search-input']}>
            <img src='/src/assets/search.svg' alt="" />
            <input className={styles['search-input-input']} type="text" placeholder='Введите название' />
        </div>
    )
}

export default SearchInput