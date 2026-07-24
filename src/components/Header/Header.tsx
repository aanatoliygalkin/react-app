import styles from './Header.module.css'

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps){
return(
    <>
    <h1 className={styles['header']}>{title}</h1>
    </>
)
}

export default Header