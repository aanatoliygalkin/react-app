import styles from './Button.module.css'
import cn from 'classnames';

function Button({className, text}){

    return (
        <button className={cn(styles['button'], className)}>{text}</button>
    )
}
export default Button;