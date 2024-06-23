import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = (props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        props.logout();
        navigate('/');
    };

    return (
        <header >
            <nav className="navbar navbar-expand-md navbar-fixed navbar-custom">
                <ul className="navbar-nav ms-1">
                    <li className="nav-item active">
                        <Link className="nav-link" to={"/"}>Home</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to={"/resources"}>Book Now</Link>
                    </li>
                    {props.currentUser && (
                        <li className="nav-item active">
                            <Link className="nav-link" to={"/reservations/user"}>Your Reservations</Link>
                        </li>
                    )}
                </ul>
                <ul className="navbar-nav ms-auto me-1">
                    <li className="nav-item nav-link m-0">
                        <p className="m-0">{props.currentUser?.username}</p>
                    </li>
                    <li className="nav-item">
                        {props.currentUser ? (
                            <button onClick={handleLogout} className="btn btn-link nav-link">
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="nav-link btn btn-link">
                                Login
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
