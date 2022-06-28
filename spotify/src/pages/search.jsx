import React, { Component } from "react";
import axios from "axios";
import logo from './img/spotify.svg';
import '../App.css';
import NavBar from './nav';
export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genre_select: [],
            name: "search",
            value: "",
            selectValue : "",
            data: [],
            display: "",
            dark: "",
            currentMode: "Dark Theme"
        }
        this.toggle = this.toggle.bind(this)
        this.toggleDarkMode = this.toggleDarkMode.bind(this)
        this.handeleChange = this.handeleChange.bind(this)
        this.handeleGenre = this.handeleGenre.bind(this)
        this.handeleSubmit = this.handeleSubmit.bind(this)
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
            const response = await axios.get("http://localhost:8080/api/classe/genres_list.php")
            const genre_select = response.data.data
            // console.log(genre_select);
            if (localStorage.getItem("theme")) {
                this.setState({
                    dark: localStorage.getItem("theme")
                })
            }
            this.setState({
                genre_select: genre_select,
                display: "close"
            })
        }
        loadGenres()
    }

    handeleGenre(e) {
        this.setState({
            selectValue: e.target.value
        })
        // console.log(this.state.selectValue);
    }

    handeleChange(e) {
        this.setState({ 
            search_input: e.target.value
        })
        console.log(this.state);
    }

    handeleSubmit(e) {
        e.preventDefault()
        const value = this.state.search_input
        const genre = this.state.selectValue
        if (value.length !== 0) {
            const loadSearch = async () => {
                const response = await axios.get("http://localhost:8080/api/classe/tracks.php?search=" + value + "&genres=" + genre)
                const data = response.data
                this.setState({
                    data: data
                })
            }
            loadSearch()
        }
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

            <section className="home genre">
                <nav className="home-nav">Spotify</nav>
                <main>
                    <div className="container">
                        <form onSubmit={this.handeleSubmit}>
                            <div className="middle">
                                <li className="search-bar">
                                    <input type="text" id={this.state.name} name="search" onChange={this.handeleChange} placeholder="Find everything you want..." className="searchbar"></input>
                                    <i onClick={this.handeleSubmit} className='bx bx-search icon'></i>
                                </li>
                            </div>

                            <div>
                                <select name="genre" id="genre" onChange={this.handeleGenre} className="form-select" aria-label="Default select example">
                                    <option>select a genre</option>)
                                    {
                                        this.state.genre_select.map((element, k) => {
                                            return (
                                                <option key={k} value={element.genre_name}>{element.genre_name}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <br />
                            <br />
                        </form>
                        <div>
                            <ul className="list-group">
                                {/* {this.state.data.map((item) => (
                                    <div key={item.name}>
                                        <li className="list-group-item"><a href={"http://localhost:8080/api/classe/tracks.php?search=" + item.name}>{item.name}</a></li>
                                    </div>
                                ))} */}
                            </ul>
                        </div>
                    </div>
                </main>
            </section>

        </div>

    }
}