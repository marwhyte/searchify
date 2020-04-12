import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import Footer from "./Footer";

const Search = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [userID, setUserID] = useState("");
  const [songData, setSongData] = useState("No songs");
  const [initialSong, setInitialSong] = useState("No initial");

  const onSubmit = (data) => {
    var parsed = queryString.parse(window.location.search);
    var accessToken = parsed.access_token;
    var dataObj = JSON.stringify({
      name: data.playlist_title,
      public: data.public,
    });

    console.log(userID);
    console.log(dataObj);
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
        console.log(data);
      });
  };

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
          console.log("look", initialSong);
        });
    }
  }, []);
  console.log(songData);
  return (
    <div className="Search">
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
                ref={register({ required: true })}
              />
              <div class="pretty p-default p-curve p-toggle">
                <input
                  type="checkbox"
                  placeholder="public"
                  name="public"
                  ref={register}
                />
                <div class="state p-success p-on">
                  <label>Public</label>
                </div>
                <div class="state p-danger p-off">
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
          {songData.map((song) => (
            <div
              className="playlistsong"
              onClick={() => window.open(song.external_urls.spotify, "_blank")}
            >
              <p className="song">{song.name}</p>
              <p className="artist">
                {song.artists.map((e) => e.name).join(", ")}
              </p>
              <p className="artist1">{song.album.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>
            You have no songs in this playlist or something went wrong, go back
            home and try again!
          </p>
          <Link to={{ pathname: "/home", search: props.location.search }}>
            Go Back Home!
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Search;
