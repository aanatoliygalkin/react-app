import styles from './Button.module.css'
import cn from 'classnames';
import { ButtonProps } from './Button.props';

function Button({className, text, disabled=false, onClick}: ButtonProps){

    return (
        <button onClick={onClick} disabled={disabled} className={cn(styles['button'], className)}>{text}</button>
    )
}
export default Button;