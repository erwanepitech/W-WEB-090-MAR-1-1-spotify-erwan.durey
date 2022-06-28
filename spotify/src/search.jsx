import React, { Component } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


export class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "search"
        }
        this.handeleChange = this.handeleChange.bind(this)
        this.handeleSubmit = this.handeleSubmit.bind(this)
    }

    handeleChange(e) {
        const search_input = e.target.name
        this.setState({
            [search_input]: e.target.value
        })
    }

    handeleSubmit(e) {
        e.preventDefault()
        const data = this.state.search
        // console.log(data)

        const loadSearch = async () => {
            const response = await axios.get("http://localhost:8080/api/classe/tracks.php?search=" + data)
            console.log(response.data)
        }
        loadSearch()
    }

    render() {
        return <form onSubmit={this.handeleSubmit}>
            <label htmlFor={this.state.name}>Recherche</label>
            <input type="text" id={this.state.name} name={this.state.name} onChange={this.handeleChange} />
            <input type="submit" value="Recherche" />
            {JSON.stringify(this.state.search)}
        </form>
    }
}

