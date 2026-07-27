import styles from './Text.module.css'

function Text(){
return(
    <>
    <p className={styles['text']}>Введите название фильма, сериала или мультфильма для поиска и добавления в избранное.</p>
    </>
)
}

export default Text