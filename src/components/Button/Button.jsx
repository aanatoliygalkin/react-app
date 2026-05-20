import './Button.css'

function Button({className, text}){

    const cl = 'button' + (className ? ' '+ className : '');

    const onClick = () => {
    console.log('Клик 2');
    } 

    return (
        <button onClick={onClick} className={cl}>{text}</button>
    )
}
export default Button;