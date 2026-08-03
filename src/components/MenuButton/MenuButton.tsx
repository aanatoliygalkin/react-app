import styles from './MenuButton.module.css'
import Button from '../Button/Button'
import { MenuButtonProps } from './MenuButton.props';

function MenuButton({ text, onClick, to, badge }: MenuButtonProps) {
        return (
            <div className={styles['menu-button-wrapper']}>
                <Button to={to} disabled={false} onClick={onClick} text={text} className={styles['menu-button']} />
                {badge && badge > 0 && <span className={styles['badge']}>{badge}</span>}
            </div>
        )
}
export default MenuButton;