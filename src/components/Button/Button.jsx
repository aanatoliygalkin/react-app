import styles from './Button.module.css'
import cn from 'classnames';

function Button({className, text, disabled=false, onClick}){

    return (
        <button onClick={onClick} disabled={disabled} className={cn(styles['button'], className)}>{text}</button>
    )
}
export default Button;