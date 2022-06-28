import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Genre from './pages/genre_info';
import Album from './pages/album';
import Album_info from './pages/album_info';
import Artist from './pages/artistes';
import Artistes_info from './pages/artistes_info';
import NotFoundPage from './pages/404';
import Home from './pages/Home';
import Genrelist from './pages/genre';
import Search from './pages/search';

// class App extends Component {
  

// }
class App extends Component {

render() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/album" element={<Album />} />
        <Route exact path="/genre" element={<Genrelist />} />
        <Route exact path="/genre_info" element={<Genre />} />
        <Route exact path="/album_info" element={<Album_info />} />
        <Route exact path="/artistes" element={<Artist />} />
        <Route exact path="/artistes_info" element={<Artistes_info />} />
        <Route exact path="/404" element={<NotFoundPage />} />
        <Route
          path="*"
          element={<Navigate to="/404" />}
        />
      </Routes>
    </Router >
  )
}
}

export default App;
