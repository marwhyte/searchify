import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { Link } from "react-router-dom";

const Home = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [topTracks, setTopTracks] = useState();
  const [userData, setUserData] = useState({ name: "", playlists: [] });
  const [searchQuery, setSearchQuery] = useState("No songs");
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

  const searching = (event) => {
    const search = event.target.value;
    var parsed = queryString.parse(window.location.search);

    var accessToken = parsed.access_token;
    if (search.length !== 0) {
      fetch(
        `https://api.spotify.com/v1/search?q=${search}&type=track&market=US&limit=3`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchQuery(data.tracks.items);
        });
    } else {
      setSearchQuery("No songs");
    }
  };

  console.log(searchQuery);
  return (
    <div className="home">
      <h1>Welcome To your personalized spotify account {userData.name}</h1>

      <div className="search">
        <form>
          <input
            type="text"
            className="songSearch"
            placeholder="Search A Song!"
            name="search"
            onChange={searching}
          />
        </form>
      </div>
      <div className="yourMusic">
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
    </div>
  );
};

export default Home;
