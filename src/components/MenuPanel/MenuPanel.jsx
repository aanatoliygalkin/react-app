import styles from './MenuPanel.module.css'

function MenuPanel({ children }) {

    return (
        <div className={styles['menu-panel']}>
            {children}
        </div>
    )
}
export default MenuPanel;