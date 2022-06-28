import React, { Component } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './nav';

export class Select extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genre_select: [],
            name: "search",
            value: [],
            data: []
        }
        this.handeleChange = this.handeleChange.bind(this)
        this.handeleSubmit = this.handeleSubmit.bind(this)
    }

    componentDidMount() {
        const loadGenres = async () => {
            const response = await axios.get("http://localhost:8080/api/classe/genres.php")
            const genre_select = response.data
            this.setState({
                genre_select: genre_select
            })
        }
        loadGenres()
    }

    handeleChange(e) {
        const search_input = e.target.name
        const selectValue = e.target.name

        this.setState({
            [search_input]: e.target.value,
            [selectValue]: e.target.value
        })
        console.log(this.state);
    }

    handeleSubmit(e) {
        e.preventDefault()
        const value = this.state.search
        const genre = this.state.genre
        if (value.length !== 0) {
            const loadSearch = async () => {
                const response = await axios.get("http://localhost:8080/api/classe/tracks.php?search=" + value + "&genres=" + genre)
                const data = response.data
                this.setState({
                    data: data
                })
                console.log(data);
            }
            loadSearch()
        }
    }

    render() {
        return <div className="container">
            <NavBar/>
            <form onSubmit={this.handeleSubmit}>
                <div className="row">
                    <div className="col">
                        <div className="form-group mb-3">
                            <input type="text" id={this.state.name} name={this.state.name} onChange={this.handeleChange} className="form-control" placeholder="recherche" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group mb-3">
                            <select name="genre" id="genre" onChange={this.handeleChange} className="form-select" aria-label="Default select example">
                                <option>selecte a genre</option>)
                                {
                                    this.state.genre_select.map((element) => {
                                        return (
                                            <option key={element.id} value={element.name}>{element.name}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary" >Recherche</button>
                        <br />
                        <br />
                    </div>
                </div >
            </form>
            <div>
                <ul className="list-group">
                    {this.state.data.map((item) => (
                        <div>
                            <li className="list-group-item" key={item.name}><a href={"http://localhost:8080/api/classe/tracks.php?search=" + item.name}>{item.name}</a></li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>

    }
}