import { Link } from "react-router-dom";

const NavBar = () => {
    return(
        <nav>
            <ul>
                <Link to='/'>
                    <li>Home</li>
                </Link>   
                <Link to='profile'>
                    <li>Profile</li>
                </Link>
                <Link to='Login'>
                    <li>Login</li>
                </Link>
            </ul>
        </nav>
    )
}

export default NavBar;