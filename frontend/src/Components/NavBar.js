import React from 'react'
import { Link, withRouter } from 'react-router-dom';


const NavBar = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to='/signup'> Signup </Link>
                    </li>
                    <li>
                        <Link to='/signin'> Signin </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default withRouter(NavBar);