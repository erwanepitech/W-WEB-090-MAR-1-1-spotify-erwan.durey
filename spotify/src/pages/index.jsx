import React, { Component } from "react";
import axios from "axios";
import logo from './img/spotify.svg';
import '../App.css';
import NavBar from './nav';
export default class IndexAlbum extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            display: "",
            dark: "",
            currentMode: "Dark Theme"
        }
        this.toggle = this.toggle.bind(this)
        this.toggleDarkMode = this.toggleDarkMode.bind(this)
    }

    componentDidMount() {
        this.setState({
            display: "close"
        })
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
        } else if (this.state.dark == 'dark') {
            this.setState({
                dark: '',
                currentMode: "Dark Theme"
            })
        }
    }


    componentDidMount() {
        const loadGenres = async () => {
            const response = await axios.get("http://localhost:8080/api/classe/random.php")
            const data = response.data
            // console.log(response.data);
            this.setState({
                data: data
            })
            console.log(data);
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
                            <li className="search-bar">
                                <i className='bx bx-search icon'></i>
                                <input type="text" placeholder="Find everything you want..." className="searchbar"></input>
                            </li>
                        </div>
                        <ul className="list-group">
                            {this.state.data.map((item) => (
                                <div>
                                    <li className="list-group-item" key={item.album_name}>nom de l'album {item.album_name}</li>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </ul>
                    </div>
                </main>
            </section>

        </div>
    }

}