import React from "react";
import '../App.css';
import {
    Link
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const NavBar = () => {
    return (
        <div className="menu">

            <li className="search-box">
                <i className='bx bx-search icon'></i>
                <input type="text" placeholder="Search..." className="searchbar"></input>
            </li>

            <ul className="menu-links">
                <li className="nav-link">
                    <Link to="/">
                        <i className='bx bx-home-heart icon' ></i>
                        <span className="text nav-text">Home</span>
                    </Link>
                </li>

                <li className="nav-link">
                    <Link to="/artistes">
                        <i className='bx bx-user icon' ></i>
                        <span className="text nav-text">Artists</span>
                    </Link>
                </li>

                <li className="nav-link">
                    <Link to="/album">
                        <i className='bx bx-book-heart icon'></i>
                        <span className="text nav-text">Albums</span>
                    </Link>
                </li>

                <li className="nav-link">
                    <Link to="/genre">
                        <i className='bx bx-detail icon' ></i>
                        <span className="text nav-text">Genres</span>
                    </Link>
                </li>

                <li className="nav-link">
                    <a href="#">
                        <i className='bx bx-heart icon' ></i>
                        <span className="text nav-text">Likes</span>
                    </a>
                </li>

                <li className="nav-link">
                    <a href="#">
                        <i className='bx bx-bookmark-heart icon' ></i>
                        <span className="text nav-text">Playlists</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default NavBar