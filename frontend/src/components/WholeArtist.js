import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import Footer from "../components/Footer";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

const WholeArtist = (props) => {
  return (
    <div className="playlist">
      <div className="fontawesome">
        <FontAwesomeIcon
          className="goBack"
          icon={faArrowAltCircleLeft}
          size="4x"
          onClick={() => window.open(`/home${window.location.search}`, "_self")}
        />
      </div>

      {props.songs !== "noSongs" && props.artist !== "NoArtist" ? (
        <div className="playlisttop">
          <div>
            <h1> Welcome to: {props.artist.name}</h1>
            <p>Genre: {props.artist.genres[0]}</p>
            <p>Popularity: {props.artist.popularity}</p>
            <a
              href={props.artist.external_urls.spotify}
              className="playlistURL1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open In Spotify!
            </a>
          </div>
          <div className="noMargin">
            <img
              onClick={() =>
                window.open(props.artist.external_urls.spotify, "_blank")
              }
              src={
                props.artist.images.length !== 0
                  ? props.artist.images[0].url
                  : "https://images.unsplash.com/photo-1573247318234-a388aa0a8b37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
              }
              alt="Artist Cover"
            />
          </div>
        </div>
      ) : (
        <p>playlist unavailable</p>
      )}

      <div className="playlistheaders">
        <p className="playlistheader2">Searchify</p>
        <p className="playlistheader push">Song Title</p>
        <p className="playlistheader">Song Artist</p>
        <p className="playlistheader1">Album</p>
      </div>
      {props.songs !== "noSongs" ? (
        <div className="playlistsongs">
          {props.songs.tracks.map(
            (song) =>
              song !== null && (
                <div className="playlistsong">
                  <Link
                    to={{
                      pathname: "/search",
                      search: window.location.search,
                      searchInfo: song,
                    }}
                  >
                    <FontAwesomeIcon
                      className="listIcon"
                      icon={faSearchengin}
                      size="3x"
                    />
                  </Link>
                  <div
                    className="song"
                    onClick={() =>
                      window.open(song.external_urls.spotify, "_blank")
                    }
                  >
                    <p>{song.name}</p>
                  </div>
                  <div
                    className="artist"
                    onClick={() =>
                      window.open(
                        song.artists[0].external_urls.spotify,
                        "_blank"
                      )
                    }
                  >
                    <p>{song.artists[0].name}</p>
                  </div>{" "}
                  <div
                    className="artist1"
                    onClick={() =>
                      window.open(song.album.external_urls.spotify, "_blank")
                    }
                  >
                    <p>{song.album.name}</p>
                  </div>
                </div>
              )
          )}
        </div>
      ) : (
        <div className="sweet-loading">
          <RingLoader
            css={override}
            size={40}
            color={"#123abc"}
            loading={props.loading}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default WholeArtist;
