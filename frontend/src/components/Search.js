import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

const Search = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    var data = {
      name: data.playlist_title,
      public: data.public,
    };
    var parsed = queryString.parse(window.location.search);
    var accessToken = parsed.access_token;
    var userID = props.location.userData.id;
    console.log(data.public);
    // fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
    //   method: "POST",

    //   headers: {
    //     Authorization: "Bearer " + accessToken,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  };

  const [songData, setSongData] = useState("No songs");
  const initialSong = useState(props.location.searchInfo);
  useEffect(() => {
    var parsed = queryString.parse(window.location.search);
    var accessToken = parsed.access_token;
    if (props.location.searchInfo !== undefined) {
      fetch(
        `https://api.spotify.com/v1/recommendations?seed_tracks=${props.location.searchInfo.id}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("look", data);
          setSongData(data.tracks);
        });
    } else {
    }
  }, []);
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
      {songData !== "No songs" ? (
        <div className="playlisttop">
          <div className="createInfo">
            <h1>Song suggestions for {initialSong[0].name}</h1>
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
              src={initialSong[0].album.images[0].url}
              alt="4 top songs in the playlist"
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
              onClick={() =>
                window.open(song.track.external_urls.spotify, "_blank")
              }
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
    </div>
  );
};

export default Search;
