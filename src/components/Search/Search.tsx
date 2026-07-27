import classNames from 'classnames';
import styles from './Search.module.css'
import { ReactNode } from 'react';

interface SearchProps {
    children: ReactNode;
    column?: boolean;
}

function Search({ children, column }: SearchProps) {
    const classes = classNames(
        styles['search'],
        {
            [styles['column']]: column
        }
    );  
    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default Search