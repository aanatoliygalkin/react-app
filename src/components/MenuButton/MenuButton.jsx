import styles from './MenuButton.module.css'
import Button from '../Button/Button'

function MenuButton({text, onClick}){

    return (
        <Button onClick={onClick} text={text} className={styles['menu-button']}/>
    )
}
export default MenuButton;