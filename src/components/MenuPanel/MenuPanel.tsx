import { ReactNode } from 'react';
import styles from './MenuPanel.module.css'

interface MenuPanelProps {
    children: ReactNode;
}

function MenuPanel({ children }: MenuPanelProps) {

    return (
        <div className={styles['menu-panel']}>
            {children}
        </div>
    )
}
export default MenuPanel;