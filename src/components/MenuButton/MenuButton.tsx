import styles from './MenuButton.module.css'
import Button from '../Button/Button'
import { MenuButtonProps } from './MenuButton.props';

function MenuButton({text, onClick}: MenuButtonProps){

    return (
        <Button disabled={false} onClick={onClick} text={text} className={styles['menu-button']}/>
    )
}
export default MenuButton;