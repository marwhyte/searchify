import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import spotifylogo from "../images/spotifylogo.png";

export default function Register(props) {
  return (
    <div className="login">
      <div className="wholeForm">
        <h1>Welcome to your Music Companion!</h1>
        <a
          href="https://myspotifybackendserver.herokuapp.com/auth/login"
          className="loginButton"
        >
          Login
        </a>
      </div>
      <div className="loginFooter">
        <div className="footer">
          <div
            className="footertogether"
            onClick={() =>
              window.open(
                "https://github.com/marwhyte/spotifysuggester",
                "_blank"
              )
            }
          >
            <FontAwesomeIcon className="rotate" icon={faGithub} size="2x" />
            <p>Created By Marco Whyte</p>
          </div>

          <div className="spotifylogo1">
            <img
              onClick={() => window.open("https://spotify.com", "_blank")}
              className="spotifylogo"
              alt="spotify logo"
              src={spotifylogo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
