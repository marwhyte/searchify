import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";

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
  const [exploreTopic, setExploreTopic] = useState("featured");
  const [featured, setFeatured] = useState();
  const [newReleases, setNewReleases] = useState();

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

    fetch("https://api.spotify.com/v1/me/playlists?limit=8", {
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
    fetch(`https://api.spotify.com/v1/me/top/artists?limit=8`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTopArtists(data.items);
      });
    fetch(`https://api.spotify.com/v1/me/top/tracks?limit=8`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTopTracks(data.items);
      });
    fetch(`https://api.spotify.com/v1/browse/featured-playlists?limit=8`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data.playlists);
        console.log(data);
      });
    fetch(`https://api.spotify.com/v1/browse/new-releases?limit=8`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNewReleases(data.albums);
        console.log(data);
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
        <div className="sameLine">
          <h1>SEARCHIFY</h1>
          <FontAwesomeIcon
            icon={faSearchengin}
            size="5x"
            color="white"
            style={{ marginLeft: "20px" }}
          />
        </div>
        <h4>Find Music For You</h4>
        <h3>Search by artist or song to find a playlist tailored to you!</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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
            <h1>Your Top Playlists</h1>
            <div className="nothing">
              {!userData.playlists ? (
                <div className="sweet-loading">
                  <RingLoader css={override} size={40} color={"#123abc"} />
                </div>
              ) : (
                <div className="playlists">
                  {userData.playlists.map((playlist) => (
                    <div className="playlist">
                      <div className="container1">
                        <img
                          className="playlistImage"
                          onClick={() =>
                            window.open(
                              playlist.external_urls.spotify,
                              "_blank"
                            )
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
                        <p className="public">Public Playlist</p>
                      ) : (
                        <p className="private">Private Playlist</p>
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
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : topic === "song" ? (
          <div>
            <h1>Your Top Songs</h1>
            <div className="topSongs">
              {!topTracks ? (
                <div className="sweet-loading">
                  <RingLoader css={override} size={40} color={"#123abc"} />
                </div>
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
                        Searchify
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h1>Your Top Artists</h1>

            {!topArtists ? (
              <div className="sweet-loading">
                <RingLoader css={override} size={40} color={"#123abc"} />
              </div>
            ) : (
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
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="explore">
        <div className="exploreTitles">
          <h1>Explore</h1>
          <div className="selector">
            <button
              className={
                exploreTopic === "featured"
                  ? "selectedExplore"
                  : "notSelectedExplore"
              }
              onClick={() => setExploreTopic("featured")}
            >
              Featured
            </button>
            <button
              className={
                exploreTopic === "releases"
                  ? "selectedExplore"
                  : "notSelectedExplore"
              }
              onClick={() => setExploreTopic("releases")}
            >
              New Releases
            </button>
          </div>
          <div className="yourExplore">
            {exploreTopic === "featured" ? (
              <div className="yourFeatured">
                <h2>Featured on Spotify</h2>
                {!featured ? (
                  <div className="sweet-loading">
                    <RingLoader css={override} size={40} color={"#123abc"} />
                  </div>
                ) : (
                  <div className="allFeaturePlaylists">
                    {featured.items.map((playlist) => (
                      <div className="feature">
                        <div className="featureImage">
                          <img
                            alt="Top Featured Playlist cover"
                            src={playlist.images[0].url}
                            onClick={() =>
                              window.open(
                                playlist.external_urls.spotify,
                                "_blank"
                              )
                            }
                          />
                        </div>
                        <div className="featureText">
                          <h3
                            onClick={() =>
                              window.open(
                                playlist.external_urls.spotify,
                                "_blank"
                              )
                            }
                          >
                            {playlist.name}
                          </h3>
                          <p>{playlist.description}</p>
                        </div>
                        <Link
                          to={{
                            pathname: "/playlist",
                            search: props.location.search,
                            playlistInfo: playlist,
                          }}
                          className="featureButton"
                        >
                          View
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="yourReleases">
                <h2>Top Releases on Spotify</h2>
                {!newReleases ? (
                  <div className="sweet-loading">
                    <RingLoader css={override} size={40} color={"#123abc"} />
                  </div>
                ) : (
                  <div className="allFeaturePlaylists">
                    {newReleases.items.map((album) => (
                      <div className="feature">
                        <div className="featureImage">
                          <img
                            alt="Top Featured Playlist cover"
                            src={album.images[0].url}
                            onClick={() =>
                              window.open(album.external_urls.spotify, "_blank")
                            }
                          />
                        </div>
                        <div className="featureText">
                          <h3
                            onClick={() =>
                              window.open(album.external_urls.spotify, "_blank")
                            }
                          >
                            {album.name}
                          </h3>
                          <p>{album.artists.map((e) => e.name).join(", ")}</p>
                        </div>
                        <Link
                          to={{
                            pathname: "/album",
                            search: props.location.search,
                            albumInfo: album,
                          }}
                          className="featureButton"
                        >
                          View
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
