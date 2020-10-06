import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import Footer from "../components/Footer";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

const Search = (props) => {
  const { register, handleSubmit } = useForm();
  const [userID, setUserID] = useState("");
  const [songData, setSongData] = useState("No songs");
  const [initialSong, setInitialSong] = useState("No initial");

  const onSubmit = (data) => {
    console.log(data.playlist_title.length);
    var parsed = queryString.parse(window.location.search);
    var accessToken = parsed.access_token;
    var title;
    if (data.playlist_title.length === 0) {
      title = "Your New Playlist";
    } else {
      title = data.playlist_title;
    }
    var dataObj = JSON.stringify({
      name: title,
      public: data.public,
    });

    fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: dataObj,
    })
      .then((res) => res.json())
      .then((data) => {
        addSongs(data.id);
        store.addNotification({
          title: "Success!",
          message: "Your new playlist was added, open spotify to view it!",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      });
  };
  const addSongs = (playlistID) => {
    var parsed = queryString.parse(window.location.search);
    var accessToken = parsed.access_token;
    var songIDS = JSON.stringify({
      uris: songData.map((song) => {
        return song.uri;
      }),
    });
    fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: songIDS,
    });
  };
  console.log(songData);
  useEffect(() => {
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
      .then((data) => {
        if (data !== undefined) {
          setUserID(data.id);
        }
      });

    if (props.location.searchInfo !== undefined) {
      localStorage.setItem("search", props.location.searchInfo.id);
      localStorage.setItem("initialSong", props.location.searchInfo.id);
      const searchData = localStorage.getItem("search");
      const initialSongLocal = localStorage.getItem("initialSong");

      fetch(
        `https://api.spotify.com/v1/recommendations?seed_tracks=${searchData}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setSongData(data.tracks);
        });
      fetch(`https://api.spotify.com/v1/tracks/${initialSongLocal}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setInitialSong(data);
        });
    } else {
      const searchData = localStorage.getItem("search");
      fetch(
        `https://api.spotify.com/v1/recommendations?seed_tracks=${searchData}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setSongData(data.tracks);
        });
      const initialSongLocal = localStorage.getItem("initialSong");
      fetch(`https://api.spotify.com/v1/tracks/${initialSongLocal}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setInitialSong(data);
        });
    }
  }, []);
  return (
    <div className="Search">
      <ReactNotification />
      <div className="fontawesome">
        <FontAwesomeIcon
          className="goBack"
          icon={faArrowAltCircleLeft}
          size="4x"
          onClick={() => window.open(`/home${props.location.search}`, "_self")}
        />
      </div>
      {songData !== "No songs" && initialSong !== "No initial" ? (
        <div className="playlisttop">
          <div className="createInfo">
            <a
              className="searchClick"
              href={initialSong.external_urls.spotify}
              alt="open the searched song in spotify"
              target="_blank"
              rel="noopener noreferrer"
            >
              Song suggestions for {initialSong.name}
            </a>
            <p>Save this playlist to your account</p>
            <form className="savePlaylist" onSubmit={handleSubmit(onSubmit)}>
              <input
                className="playlistName"
                type="text"
                placeholder="Playlist Title"
                name="playlist_title"
                ref={register()}
              />
              <div className="pretty p-default p-curve p-toggle">
                <input
                  type="checkbox"
                  placeholder="public"
                  name="public"
                  ref={register}
                />
                <div className="state p-success p-on">
                  <label>Public</label>
                </div>
                <div className="state p-danger p-off">
                  <label>Private </label>
                </div>
              </div>

              <input className="playlistButton" type="submit" />
            </form>
          </div>
          <div className="noMargin">
            <img
              onClick={() =>
                window.open(initialSong.external_urls.spotify, "_blank")
              }
              src={initialSong.album.images[0].url}
              alt="Album cover for initial song search"
            />
          </div>
        </div>
      ) : (
        <p>playlist unavailable</p>
      )}
      <div className="playlistheaders">
        <p className="playlistheader">Song Title</p>
        <p className="playlistheader">Song Artist</p>
        <p className="playlistheader1">Album</p>
      </div>
      {songData !== "No songs" ? (
        <div className="playlistsongs">
          {songData.map(
            (song) =>
              song !== null && (
                <div className="playlistsong">
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
                    <p>{song.artists.map((e) => e.name).join(", ")}</p>
                  </div>
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
          <RingLoader css={override} size={40} color={"#123abc"} />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Search;
