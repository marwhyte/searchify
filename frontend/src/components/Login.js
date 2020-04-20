import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import spotifylogo from "../images/spotifylogo.png";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";

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
        <div className="sameLine">
          <h1>SEARCHIFY</h1>
          <FontAwesomeIcon
            icon={faSearchengin}
            size="5x"
            color="white"
            style={{ marginLeft: "20px" }}
          />
        </div>
        <h2>Welcome to Your Music Companion</h2>
        {!loading ? (
          <a
            href="http://localhost:5000/auth/login"
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
              color={"#FFFFFF"}
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
