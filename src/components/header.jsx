import './header.css'
import { Outlet, Link } from "react-router"


function Header(){
  return (
    <>
      <nav class="header">
        <div class="header-left">
          <Link to="/" > Home </Link>
        </div>
        <div class="header-right">
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