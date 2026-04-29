import './MenuPanel.css'

function MenuPanel({ children }) {

    return (
        <div className='menu-panel'>
            {children}
        </div>
    )
}
export default MenuPanel;