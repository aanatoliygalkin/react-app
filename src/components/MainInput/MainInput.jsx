import styles from './MainInput.module.css'

function MainInput({ placeholder, margin='0px', value, onChange }) {

    return (
        <div style={{margin: margin}} className={styles['main-input']}>
            <input value={value} onChange={onChange} className={styles['main-input-input']} type="text" placeholder={placeholder} />
        </div>
    )
}

export default MainInput