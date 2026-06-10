import styles from './Search.module.css'

function Search({ children }){
return(
    <div className={styles['search']}>
    {children}
    </div>
)
}

export default Search