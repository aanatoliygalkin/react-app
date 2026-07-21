import styles from './MenuButton.module.css'
import Button from '../Button/Button'
import { useContext } from 'react';
import { UserContext } from '../../user.context';

function MenuButton({text, onClick}){

    return (
        <Button onClick={onClick} text={text} className={styles['menu-button']}/>
    )
}
export default MenuButton;