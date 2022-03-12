import Search from './Search';
import Form from './Form';

function Header() {
  return (
    <header className="header">
      <div className='headerTitle'>🌈 Color Notes </div>
      <Search />
      <Form />
    </header>
  )
}

export default Header;