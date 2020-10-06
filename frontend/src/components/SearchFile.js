import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useForm } from "react-hook-form";
import { store } from "react-notifications-component";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

const SearchFile = (props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data.playlist_title.length);
    var parsed = props.queryString.parse(window.location.search);
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

    fetch(`https://api.spotify.com/v1/users/${props.userID}/playlists`, {
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
        props.addSongs(data.id);
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
      {props.songData !== "No songs" && props.initialSong !== "No initial" ? (
        <div className="playlisttop">
          <div className="createInfo">
            <a
              className="searchClick"
              href={props.initialSong.external_urls.spotify}
              alt="open the searched song in spotify"
              target="_blank"
              rel="noopener noreferrer"
            >
              Song suggestions for {props.initialSong.name}
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
                window.open(props.initialSong.external_urls.spotify, "_blank")
              }
              src={props.initialSong.album.images[0].url}
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
      {props.songData !== "No songs" ? (
        <div className="playlistsongs">
          {props.songData.map(
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

export default SearchFile;
