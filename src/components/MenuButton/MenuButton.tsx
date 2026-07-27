import styles from './MenuButton.module.css'
import Button from '../Button/Button'
import { MenuButtonProps } from './MenuButton.props';

function MenuButton({ text, onClick, to }: MenuButtonProps) {
        return (
            <>
                <Button to={to} disabled={false} onClick={onClick} text={text} className={styles['menu-button']} />
            </>
        )
}
export default MenuButton;