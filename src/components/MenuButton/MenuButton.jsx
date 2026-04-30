import './MenuButton.css'
import Button from '../Button/Button'

function MenuButton({text}){

    return (
        <Button text={text} className='menu-button'/>
    )
}
export default MenuButton;