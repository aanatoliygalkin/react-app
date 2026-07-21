import classNames from 'classnames';
import styles from './Search.module.css'

function Search({ children, column }) {
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