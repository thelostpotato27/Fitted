import './header.css'
import { Outlet, Link } from "react-router"


function Header(){
  return (
    <>
      <nav className="header">
        <div className="header-left">
          <Link to="/" > Home </Link>
        </div>
        <div className="header-right">
          <Link to="/Reviews" > Reviews </Link>
          <Link to="/Input" > Input </Link>
          <Link to="/about" > About </Link>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default Header