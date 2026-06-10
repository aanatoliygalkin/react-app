import styles from './Menu.module.css'

function Menu( {children} ){
return(
    <>
    <div className={styles['menu']}>
        {children}
    </div>
    </>
)
}

export default Menu