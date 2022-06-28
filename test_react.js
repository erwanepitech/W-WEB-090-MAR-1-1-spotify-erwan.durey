import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  // const [tracks, set_Tracks] = useState([]);
  // const [search, set_Search] = useState([]);
  
  // set_Search(document.getElementById("autocomplete"))
  // search.onkeyup = function () {

  // }

  // useEffect(function tracks() {
  //   if (title !== '') {
  //     // console.log(title);
  //     axios.get("http://localhost:8080/api/classe/tracks.php?search=" + title
  //     ).then((response) => {
  //       console.log(response.data["msg"]);
  //       if (response.data["msg"]) {

  //       } else {
  //         set_Tracks(response.data);
  //       }
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  //   }
  // }, [title])

  return (
    <div className="App">
      <header className="App-header">
        <label htmlFor="genre">genre</label>
        <select name="genre" id="genre">
          {
            genre.map((element) => {
              return (
                <option value={element.id}>{element.name}</option>)
            })
          }
        </select>
        <div className="container">
          <div className="row mt-5 mb-5">
            <div className="col col-sm-2">&nbsp;</div>
            <div className="col col-sm-8">
              <div className="dropdown">
                <input type="text" onChange={(event) => setTitle(event.target.value)} name="search_box" className="form-control form-control-lg" placeholder="Type Here..." id="autocomplete" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                {/* <span id="search_result">
                  {
                    tracks.map((element) => {
                      console.log(element);
                      if (element != "") {
                        return (
                          <span id="result" className="list-group-item list-group-item-action">{element.name}</span>
                        )
                      } else {
                        return (
                          <span id="result" className="list-group-item list-group-item-action"></span>
                        )
                      }
                    })
                  } */}
                {/* </span> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
