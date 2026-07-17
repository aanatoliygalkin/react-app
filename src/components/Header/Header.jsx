import styles from './Header.module.css'

function Header({ title }){
return(
    <>
    <h1 className={styles['header']}>{title}</h1>
    </>
)
}

export default Header