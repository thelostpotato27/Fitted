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
          <Link to="/about" > About </Link>
        </div>
      </nav>
      <Outlet />


      {/* <nav>
        <ul>
          <li>
            <Link to="/" > Home </Link>
          </li>
          <li>
            <Link to="/about" > About </Link>
          </li>
        </ul>
      </nav>
      <Outlet /> */}
    </>
  )
}

export default Header