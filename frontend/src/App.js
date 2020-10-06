import React from "react";
import "./App.scss";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import Search from "./pages/Search";
import Artist from "./pages/Artist";
import Album from "./pages/Album";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/playlist" component={Playlist} />
          <Route path="/search" component={Search} />
          <Route path="/artist" component={Artist} />
          <Route path="/album" component={Album} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
