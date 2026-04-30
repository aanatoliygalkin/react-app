import './SearchInput.css'

function SearchInput() {
    return (
        <div className='search-input'>
            <img src='/src/assets/search.svg' alt="" />
            <input className='search-input-input' type="text" placeholder='Введите название' />
        </div>
    )
}

export default SearchInput