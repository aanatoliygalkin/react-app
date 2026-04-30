import './Menu.css'

function Menu( {children} ){
return(
    <>
    <div className='menu'>
        {children}
    </div>
    </>
)
}

export default Menu