import { Link } from "react-router-dom";

const Header = ({brandName}) => {
  return(
    <header style={{borderBottom: '0.1rem solid black'}}>
      <nav className="navbar" style={{backgroundColor: '#F4F5F9'}}> 
        <div className="py-2 container">
            <Link className="navbar-brand h5" to='/email'>
              {brandName}
            </Link>
            <Link style={{backgroundColor: '#E54065'}} className="btn text-light" to="/">Back Home</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header;