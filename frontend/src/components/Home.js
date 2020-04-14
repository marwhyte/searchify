import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

const Home = (props) => {
  const [topTracks, setTopTracks] = useState();
  const [topArtists, setTopArtists] = useState();
  const [userData, setUserData] = useState({ name: "", playlists: [] });
  const [searchQuery, setSearchQuery] = useState("No songs");
  const [topic, setTopic] = useState("playlist");

  useEffect(() => {
    var parsed = queryString.parse(window.location.search);
    var accessToken = parsed.access_token;
    if (accessToken) {
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
            setUserData({ name: data.display_name, id: data.id });
          }
        });
    } else {
      props.history.push("/");
    }

    fetch("https://api.spotify.com/v1/me/playlists?limit=10", {
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
    fetch(`https://api.spotify.com/v1/me/top/artists?limit=10`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTopArtists(data.items);
      });
    fetch(`https://api.spotify.com/v1/me/top/tracks?limit=10`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTopTracks(data.items);
      });
  }, []);

  const searching = (event) => {
    const search = event.target.value;
    search.replace(";", " ");
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
          if (data.tracks !== undefined) setSearchQuery(data.tracks.items);
        });
    } else {
      setSearchQuery("No songs");
    }
  };

  return (
    <div className="home">
      <div className="search">
        <div className="right">
          <h2>Welcome {userData.name}</h2>
          <a href="/">Logout</a>
        </div>
        <h1>Find Music for You</h1>
        <h3>Search by artist or song to find a playlist tailored to you!</h3>

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
            <div className="searchFlex">
              {searchQuery.map((song) => (
                <Link
                  to={{
                    pathname: "/search",
                    search: props.location.search,
                    searchInfo: song,
                    userData: userData,
                  }}
                  className="link"
                >
                  {song.name} by {song.artists[0].name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="yourMusic">
        <button
          className={topic === "playlist" ? "selected" : "notSelected"}
          onClick={() => setTopic("playlist")}
        >
          Playlists
        </button>
        <button
          className={topic === "song" ? "selected" : "notSelected"}
          onClick={() => setTopic("song")}
        >
          Songs
        </button>
        <button
          className={topic === "artist" ? "selected" : "notSelected"}
          onClick={() => setTopic("artist")}
        >
          Artists
        </button>
        {topic === "playlist" ? (
          <div>
            <h1>Your top Playlists!</h1>
            <div className="playlists">
              {!userData.playlists ? (
                <div className="sweet-loading">
                  <RingLoader css={override} size={40} color={"#123abc"} />
                </div>
              ) : userData.playlists.length === 0 ? (
                <p>User Has no Playlists</p>
              ) : (
                userData.playlists.map((playlist) => (
                  <div className="playlist">
                    <div className="container1">
                      <img
                        className="playlistImage"
                        onClick={() =>
                          window.open(playlist.external_urls.spotify, "_blank")
                        }
                        src={
                          playlist.images.length !== 0
                            ? playlist.images[0].url
                            : "https://images.unsplash.com/photo-1573247318234-a388aa0a8b37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                        }
                        alt="playlist"
                      />
                    </div>
                    <h2>{playlist.name}</h2>
                    {playlist.public ? (
                      <p className="public">public playlist</p>
                    ) : (
                      <p className="private">private playlist</p>
                    )}
                    <div className="playlistLinks">
                      <Link
                        to={{
                          pathname: "/playlist",
                          search: props.location.search,
                          playlistInfo: playlist,
                        }}
                        className="trackURL"
                      >
                        View this playlist
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : topic === "song" ? (
          <div>
            {" "}
            <h1>Your top Songs!</h1>
            <div className="topSongs">
              {!topTracks ? (
                <div className="sweet-loading">
                  <RingLoader css={override} size={40} color={"#123abc"} />
                </div>
              ) : topTracks.length === 0 ? (
                <p>You don't have any top tracks!</p>
              ) : (
                <div className="yourSongs">
                  {topTracks.map((track) => (
                    <div className="yourSong">
                      <img
                        className="trackImage"
                        onClick={() =>
                          window.open(track.external_urls.spotify, "_blank")
                        }
                        src={
                          track.album.images.length !== 0
                            ? track.album.images[0].url
                            : "https://images.unsplash.com/photo-1573247318234-a388aa0a8b37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                        }
                        alt="track cover"
                      />
                      <h2>{track.name}</h2>
                      <p>
                        {track.artists
                          .map((artist) => {
                            return artist.name;
                          })
                          .join(", ")}
                      </p>
                      <Link
                        to={{
                          pathname: "/search",
                          search: props.location.search,
                          searchInfo: track,
                          userData: userData,
                        }}
                        className="trackURL"
                      >
                        Find Similar Songs
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h1>Your top Artists!</h1>
            <div className="yourSongs">
              {topArtists.map((artist) => (
                <div className="yourSong">
                  <img
                    className="trackImage"
                    onClick={() =>
                      window.open(artist.external_urls.spotify, "_blank")
                    }
                    src={
                      artist.images.length !== 0
                        ? artist.images[0].url
                        : "https://images.unsplash.com/photo-1573247318234-a388aa0a8b37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                    }
                    alt="artist"
                  />
                  <h2>{artist.name}</h2>
                  <p>{artist.genres[0]}</p>
                  <Link
                    to={{
                      pathname: "/artist",
                      search: props.location.search,
                      artistInfo: artist,
                    }}
                    className="trackURL"
                  >
                    View this Artist
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
