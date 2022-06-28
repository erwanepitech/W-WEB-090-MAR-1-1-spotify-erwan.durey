import React, { Component } from "react";
import axios from "axios";
import {
    Link
} from 'react-router-dom';
import logo from './img/spotify.svg';
import '../App.css';
import NavBar from './nav';

export default class Album extends Component {
    constructor(props) {
        super(props)
        this.state = {
            top_album: [],
            name: "search",
            display: "",
            dark: "",
            currentMode: "Dark Theme"
        }
        this.toggle = this.toggle.bind(this)
        this.toggleDarkMode = this.toggleDarkMode.bind(this)
        // this.handeleChange = this.handeleChange.bind(this)
        // this.handeleSubmit = this.handeleSubmit.bind(this)
    }

    toggle() {
        if (this.state.display == '') {
            this.setState({
                display: "close"
            })
        } else if (this.state.display == 'close') {
            this.setState({
                display: ""
            })
        }
    }

    toggleDarkMode() {
        if (this.state.dark == '') {
            this.setState({
                dark: "dark",
                currentMode: "Light Theme"
            })
            localStorage.setItem("theme", "dark")
        } else if (this.state.dark == 'dark') {
            this.setState({
                dark: '',
                currentMode: "Dark Theme"
            })
            localStorage.setItem("theme", "")
        }
    }

    componentDidMount() {
        const loadGenres = async () => {
            const response = await axios.get("http://localhost:8080/api/classe/album_pop.php")
            const top_album = response.data
            if (localStorage.getItem("theme")) {
                this.setState({
                    dark: localStorage.getItem("theme")
                })
            }
            this.setState({
                top_album: top_album,
                display: "close"
            })
        }
        loadGenres()
    }

    // handeleChange(e) {
    //     const search_input = e.target.name
    //     const selectValue = e.target.name

    //     this.setState({
    //         [search_input]: e.target.value,
    //         [selectValue]: e.target.value
    //     })
    //     console.log(this.state);
    // }

    // handeleSubmit(e) {
    //     e.preventDefault()
    //     const value = this.state.search
    //     const genre = this.state.genre
    //     if (value.length !== 0) {
    //         const loadSearch = async () => {
    //             const response = await axios.get("http://localhost:8080/api/classe/album_search.php?search=" + value + "&genre=" + genre)
    //             const data = response.data
    //             this.setState({
    //                 data: data
    //             })
    //             console.log(data);
    //         }
    //         loadSearch()
    //     }
    // }

    render() {
        return <div className={"App " + this.state.dark}>
            <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet' />

            <nav className={"sidebar " + this.state.display}>
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src={logo} className="logo" alt="logo" />
                        </span>
                        <div className="text logo-text">
                            <span className="name">Spotify</span>
                            <span className="phrase">The best music</span>
                        </div>
                    </div>

                    <i onClick={this.toggle} className='bx bx-chevron-right toggle'></i>
                </header>

                <div className="menu-bar">

                    <NavBar />

                    <div className="bottom-content">
                        <li className="">
                            <a href="#">
                                <i className='bx bx-log-out icon' ></i>
                                <span className="text nav-text">Logout</span>
                            </a>
                        </li>

                        <li className="mode">
                            <div className="sun-moon">
                                <i className='bx bx-moon icon moon'></i>
                                <i className='bx bx-sun icon sun'></i>
                            </div>
                            <span className="mode-text text">{this.state.currentMode}</span>

                            <div className="toggle-switch">
                                <span className="switch" onClick={this.toggleDarkMode}></span>
                            </div>
                        </li>

                    </div>
                </div>

            </nav>

            <section className="home">
                <nav className="home-nav">Spotify</nav>
                <main>
                    <div className="container">
                        <div className="middle">
                            <div className="display">
                            <h3>Popular Albums</h3>
                                <ul className="list-group">
                                    {this.state.top_album.map((item) => (
                                        <div className="border-card " key={item.id}>
                                            <div className='random'>
                                                <h3><Link className="nav-link" to={"/album_info?&album=" + item.album_id}>{item.album_name}</Link></h3>
                                                <li ><Link className="nav-link" to={"/album_info?&album=" + item.album_id}><img src={item.cover_small} alt="profile picture" /></Link></li>
                                                <p>Date de sortie {item.release_date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </main >
            </section >

        </div >

    }
}