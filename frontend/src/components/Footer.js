import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import spotifylogo from "../images/spotifylogo.png";

const Footer = () => {
  return (
    <div className="footer">
      <div
        className="footertogether"
        onClick={() =>
          window.open("https://github.com/marwhyte/spotifysuggester", "_blank")
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
  );
};

export default Footer;
