import { ReactNode } from 'react'
import styles from './Text.module.css'
import cn from 'classnames';

export interface Text {
    children: ReactNode;
    align: string;
}

function Text({children, align='left'}: Text){
return(
    <>
    <p className={cn(styles['text'], styles[align])}>{children}</p>
    </>
)
}

export default Text