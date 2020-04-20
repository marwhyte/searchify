import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

const Playlist = (props) => {
  const [playlist, setPlaylist] = useState("NoPlaylists");
  const [songs, setSongs] = useState("noSongs");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    var parsed = queryString.parse(window.location.search);
    var accessToken = parsed.access_token;
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          return props.history.push("/");
        } else {
          return res.json();
        }
      })
      .then((data) => {});
    if (props.location.playlistInfo !== undefined) {
      localStorage.setItem("playlist", props.location.playlistInfo.href);
      const songData = localStorage.getItem("playlist");
      fetch(songData + "/tracks", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setSongs(data.items);
        });
      fetch(songData, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPlaylist(data);
          console.log("here", data);
        });
    } else {
      const songData = localStorage.getItem("playlist");
      fetch(`${songData}/tracks`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setSongs(data.items);
        });
      fetch(songData, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPlaylist(data);
          console.log("here", data);
        });
    }
  }, []);
  console.log(songs);
  return (
    <div className="playlist">
      <div className="fontawesome">
        <FontAwesomeIcon
          className="goBack"
          icon={faArrowAltCircleLeft}
          size="4x"
          onClick={() => window.open(`/home${props.location.search}`, "_self")}
        />
      </div>

      {songs !== "noSongs" && playlist !== "NoPlaylists" ? (
        <div className="playlisttop">
          <div>
            <h1> Welcome to: {playlist.name}</h1>
            <p>Created by: {playlist.owner.id}</p>
            <p>Total Songs: {playlist.tracks.total}</p>
            <a
              href={playlist.external_urls.spotify}
              className="playlistURL1"
              target="_blank"
            >
              Open In Spotify!
            </a>
          </div>
          <div className="noMargin">
            <img
              onClick={() =>
                window.open(playlist.external_urls.spotify, "_blank")
              }
              src={
                playlist.images.length !== 0
                  ? playlist.images[0].url
                  : "https://images.unsplash.com/photo-1573247318234-a388aa0a8b37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
              }
              alt="4 top songs in the playlist"
            />
          </div>
        </div>
      ) : (
        <p>playlist unavailable</p>
      )}

      <div className="playlistheaders">
        <p className="playlistheader2">Searchify</p>
        <p className="playlistheader">Song Title</p>
        <p className="playlistheader">Song Artist</p>
        <p className="playlistheader1">Album</p>
      </div>
      {songs !== "noSongs" ? (
        <div className="playlistsongs">
          {songs.map(
            (song) =>
              song.track !== null && (
                <div className="playlistsong">
                  <Link
                    to={{
                      pathname: "/search",
                      search: props.location.search,
                      searchInfo: song.track,
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
                      window.open(song.track.external_urls.spotify, "_blank")
                    }
                  >
                    <p>{song.track.name ? song.track.name : "no song"}</p>
                  </div>
                  <div
                    className="artist"
                    onClick={() =>
                      window.open(
                        song.track.artists[0].external_urls.spotify,
                        "_blank"
                      )
                    }
                  >
                    <p>{song.track.artists.map((e) => e.name).join(", ")}</p>
                  </div>
                  <div
                    className="artist1"
                    onClick={() =>
                      window.open(
                        song.track.album.external_urls.spotify,
                        "_blank"
                      )
                    }
                  >
                    <p>{song.track.album.name}</p>
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
            loading={loading}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Playlist;
