import styles from './MenuButton.module.css'
import Button from '../Button/Button'

function MenuButton({text}){

    return (
        <Button text={text} className={styles['menu-button']}/>
    )
}
export default MenuButton;