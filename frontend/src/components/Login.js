import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import spotifylogo from "../images/spotifylogo.png";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

export default function Register(props) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="login">
      <div className="wholeForm">
        <h1>Searchify</h1>
        <h2>Welcome to Your Music Companion</h2>
        {!loading ? (
          <a
            href="https://myspotifybackendserver.herokuapp.com/auth/login"
            className="loginButton"
            onClick={() => {
              setLoading(true);
            }}
          >
            login with Spotify
          </a>
        ) : (
          <div className="sweet-loading">
            <RingLoader
              css={override}
              size={40}
              color={"#123abc"}
              loading={loading}
            />
          </div>
        )}
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
