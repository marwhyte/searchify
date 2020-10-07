import React from "react";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import { Link } from "react-router-dom";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

const YourMusic = (props) => {
  return (
    <div className="yourMusic">
      <button
        className={props.topic === "playlist" ? "selected" : "notSelected"}
        onClick={() => props.setTopic("playlist")}
      >
        Playlists
      </button>
      <button
        className={props.topic === "song" ? "selected" : "notSelected"}
        onClick={() => props.setTopic("song")}
      >
        Songs
      </button>
      <button
        className={props.topic === "artist" ? "selected" : "notSelected"}
        onClick={() => props.setTopic("artist")}
      >
        Artists
      </button>
      {props.topic === "playlist" ? (
        <div>
          <h1>Your Top Playlists</h1>
          <div className="nothing">
            {!props.userData.playlists ? (
              <div className="sweet-loading">
                <RingLoader css={override} size={40} color={"#123abc"} />
              </div>
            ) : (
              <div className="playlists">
                {props.userData.playlists.map((playlist) => (
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
                      <p className="public">Public Playlist</p>
                    ) : (
                      <p className="private">Private Playlist</p>
                    )}
                    <div className="playlistLinks">
                      <Link
                        to={{
                          pathname: "/playlist",
                          search: window.location.search,
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
      ) : props.topic === "song" ? (
        <div>
          <h1>Your Top Songs</h1>
          <div className="topSongs">
            {!props.topTracks ? (
              <div className="sweet-loading">
                <RingLoader css={override} size={40} color={"#123abc"} />
              </div>
            ) : (
              <div className="yourSongs">
                {props.topTracks.map((track) => (
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
                        search: window.location.search,
                        searchInfo: track,
                        userData: props.userData,
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

          {!props.topArtists ? (
            <div className="sweet-loading">
              <RingLoader css={override} size={40} color={"#123abc"} />
            </div>
          ) : (
            <div className="yourSongs">
              {props.topArtists.map((artist) => (
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
                      search: window.location.search,
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
  );
};

export default YourMusic;
