import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

const Search = (props) => {
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
          console.log(data);
          setSongData(data.tracks);
        });
    } else {
    }
  }, []);
  console.log("hi", initialSong);
  console.log(songData);
  return (
    <div className="Search">
      {songData !== "No songs" ? (
        <div className="playlisttop">
          <div>
            <h1>Song suggestions for {initialSong[0].name}</h1>
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
        <p className="playlistheader">Album</p>
      </div>
      {songData !== "No songs" ? (
        <div className="playlistsongs">
          {songData.map((song) => (
            <div className="playlistsong">
              <p className="song">{song.name}</p>
              <p className="artist">
                {song.artists.map((e) => e.name).join(", ")}
              </p>
              <p className="artist">{song.album.name}</p>
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
