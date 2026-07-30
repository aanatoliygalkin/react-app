import styles from './Button.module.css'
import cn from 'classnames';
import { ButtonProps } from './Button.props';
import { NavLink } from 'react-router-dom';

function Button({ className, text, disabled = false, onClick, to }: ButtonProps) {

    if (!to) {
        return (
            <button onClick={onClick} disabled={disabled} className={cn(styles['button'], className)}>{text}</button>
        )
    }else{
        return(
            <NavLink to={to} className={({isActive}) => 
                cn(styles['button'], className, {
                [styles['active']]: isActive
                })
            } 
            >{text}</NavLink>
        )
    }
}
export default Button;