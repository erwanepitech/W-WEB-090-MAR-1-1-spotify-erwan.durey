import React, { Component } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './nav';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    Navigate,
    NavLink
} from 'react-router-dom';

export default class Genrelist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genre: []
        }

    }


    componentDidMount() {
        const loadGenres = async () => {
            const response = await axios.get("http://localhost:8080/api/classe/genres_list.php")
            const genre = response.data.data
            console.log(response.data)
            this.setState({
                genre: genre
            })
            console.log(genre);
        }
        loadGenres()
    }

    render() {
        return <div className="container">
            <NavBar />

            <ul className="list-group">
                {this.state.genre.map((item) => (
                    <div>
                        <li className="list-group-item" key={item.genre_name}><Link className="nav-link" to={"/genre_info?&genre="+item.genre_name}>{item.genre_name}</Link></li>
                        
                    </div>
                ))}
            </ul>
        </div>
    }
}
