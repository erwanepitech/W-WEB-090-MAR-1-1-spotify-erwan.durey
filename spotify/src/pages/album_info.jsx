import React, { Component } from "react";
import axios from "axios";
import logo from './img/spotify.svg';
import '../App.css';
import NavBar from './nav';
import {
    Link
} from 'react-router-dom';
export default class Artist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            album_info: [],
            album_pop: [],
            tracks_list: [],
            display: "",
            dark: "",
            currentMode: "Dark Theme"
        }
        this.toggle = this.toggle.bind(this)
        this.toggleDarkMode = this.toggleDarkMode.bind(this)
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
            const url = window.location.href
            const parse = url.split("=")
            const response = await axios.get("http://localhost:8080/api/classe/album_info.php?&album=" + parse[1])
            const album_info = response.data.info
            const album_pop = response.data.album
            const tracks_list = response.data.tracks_list
            console.log(tracks_list);
            if (localStorage.getItem("theme")) {
                this.setState({
                    dark: localStorage.getItem("theme")
                })
            }
            this.setState({
                album_info: album_info[0],
                album_pop: album_pop[0],
                tracks_list: tracks_list,
                display: "close"
            })
        }
        loadGenres()
    }

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
                            <Link to="#">
                                <i className='bx bx-log-out icon' ></i>
                                <span className="text nav-text">Logout</span>
                            </Link>
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
                            <div className="border-card ">
                                <div className="display">
                                    <h3 className="title_info">{this.state.album_info.album_name}</h3>
                                    <img src={this.state.album_info.cover} alt="album cove" />
                                    <br />
                                    <br />
                                    <p>Description :</p>
                                    <p>{this.state.album_info.album_desc}</p>
                                    <p>date de sortie : {this.state.album_info.release_date}</p>
                                    <p>nombre de morceaux : {this.state.album_info.nb_tracks}</p>
                                </div>
                                <div className="display">
                                    <ul className="list-group">
                                        {this.state.tracks_list.map((item) => (
                                            <div className="border-card " key={item.album_id}>
                                                <li><Link className="nav-link" to={"/album_info?&album=" + item.album_id}>{item.tracks_list}</Link></li>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </section>

        </div>
    }
}