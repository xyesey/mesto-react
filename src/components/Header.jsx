import logo from '../image/logo.svg'

function Header() {
  return (
    <div className="header">
      <img src={logo} className="header__logo" alt="Mesto Logo" />
    </div>
  )
}

export default Header
