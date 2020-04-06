import React from "react";
import "./App.scss";
import Login from "./components/Login";
import Home from "./components/Home";
import Playlist from "./components/Playlist";
import Search from "./components/Search";
import Footer from "./components/Footer";

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
