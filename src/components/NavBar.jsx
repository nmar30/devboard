import React from 'react';
import { Link } from "react-router-dom";

const NavBar = ({user}) => {
    const logout = () => {
        localStorage.removeItem('token')
        window.location.href = "/login";
    }
    console.log(user)
    return(
        <nav>
            <ul>
                <Link to='/'>
                    <li>Home</li>
                </Link>   
                {!user &&
                <Link to='/login'>
                    <li>Login</li>
                </Link>}
                {user &&
                <React.Fragment>
                <Link to='/profile'>
                    <li>Profile</li>
                </Link>
                <Link to='/login' onClick={logout}>
                    <li>Logout</li>
                </Link>
                </React.Fragment>

                }
            </ul>
        </nav>
    )
}

export default NavBar;