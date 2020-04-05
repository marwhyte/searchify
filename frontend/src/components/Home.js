import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { Link } from "react-router-dom";

const Home = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [topTracks, setTopTracks] = useState();
  const [userData, setUserData] = useState({ name: "", playlists: [] });
  useEffect(() => {
    var parsed = queryString.parse(window.location.search);
    console.log(parsed);
    var accessToken = parsed.access_token;

    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData({ name: data.display_name });
      });

    fetch("https://api.spotify.com/v1/me/playlists?limit=4", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData((prevState) => {
          return {
            ...prevState,
            playlists: data.items,
          };
        });
      });
  }, []);
  console.log(userData);
  return (
    <div className="home">
      <h1>Welcome To your personalized spotify account {userData.name}</h1>
      <form>
        <input type="text" name="searchbar" placeholder="Search A song!" />
      </form>
      <h2>Your top Playlists!</h2>
      <div className="playlists">
        {!userData.playlists ? (
          <p>User has no playlists </p>
        ) : (
          userData.playlists.map((playlist) => (
            <div className="playlist">
              <h3>{playlist.name}</h3>
              <img
                className="playlistImage"
                src={playlist.images[0].url}
                alt="playlist"
              />
              <Link
                to={{
                  pathname: "/playlist",
                  search: props.location.search,
                  playlistInfo: playlist,
                }}
              >
                View this playlist
              </Link>
              <a href={playlist.external_urls.spotify} target="_blank">
                Open In Spotify!
              </a>
            </div>
          ))
        )}
      </div>
      <div className="favorites">
        <h2>Your Favorites!</h2>
        {favorites.length === 0 ? (
          <p>You Have no Favorites!</p>
        ) : (
          favorites.map((favorite) => {
            return (
              <div className="favSong">
                <p>{favorite.track_name}</p>
                <p>{favorite.artist_name}</p>
              </div>
            );
          })
        )}
      </div>
      <Link to={{ pathname: "/", search: props.location.search }}>
        Go to login
      </Link>
    </div>
  );
};

export default Home;
