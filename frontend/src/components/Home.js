import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { Link } from "react-router-dom";

const Home = (props) => {
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

    fetch("https://api.spotify.com/v1/me/playlists?limit=6", {
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
      <div className="search">
        <div className="right">
          <h2>Welcome {userData.name}</h2>
        </div>
        <h1>Your Spotify Companion</h1>

        <form>
          <input
            type="text"
            className="songSearch"
            placeholder="Search A Song!"
            name="search"
            onChange={searching}
          />
        </form>
        <div className="searchItems">
          {searchQuery === "No songs" ? (
            <div></div>
          ) : (
            <div>
              {searchQuery.map((song) => (
                <Link
                  to={{
                    pathname: "/search",
                    search: props.location.search,
                    searchInfo: song,
                  }}
                  className="link"
                >
                  <p>
                    {song.name} by {song.artists[0].name}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="yourMusic">
        <h1>Your top Playlists!</h1>
        <div className="playlists">
          {!userData.playlists ? (
            <p>User has no playlists </p>
          ) : (
            userData.playlists.map((playlist) => (
              <div className="playlist">
                <h2>{playlist.name}</h2>
                <img
                  className="playlistImage"
                  src={playlist.images[0].url}
                  alt="playlist"
                />
                <div className="playlistLinks">
                  <Link
                    to={{
                      pathname: "/playlist",
                      search: props.location.search,
                      playlistInfo: playlist,
                    }}
                    className="playlistURL"
                  >
                    View this playlist
                  </Link>
                  <a
                    href={playlist.external_urls.spotify}
                    className="playlistURL"
                    target="_blank"
                  >
                    Open In Spotify!
                  </a>
                </div>
              </div>
            ))
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
