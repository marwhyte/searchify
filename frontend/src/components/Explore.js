import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

const Explore = (props) => {
  return (
    <div className="explore">
      <div className="exploreTitles">
        <h1>Explore</h1>
        <div className="selector">
          <button
            className={
              props.exploreTopic === "featured"
                ? "selectedExplore"
                : "notSelectedExplore"
            }
            onClick={() => props.setExploreTopic("featured")}
          >
            Featured
          </button>
          <button
            className={
              props.exploreTopic === "releases"
                ? "selectedExplore"
                : "notSelectedExplore"
            }
            onClick={() => props.setExploreTopic("releases")}
          >
            New Releases
          </button>
        </div>
        <div className="yourExplore">
          {props.exploreTopic === "featured" ? (
            <div className="yourFeatured">
              <h2>Featured on Spotify</h2>
              {!props.featured ? (
                <div className="sweet-loading">
                  <RingLoader css={override} size={40} color={"#123abc"} />
                </div>
              ) : (
                <div className="allFeaturePlaylists">
                  {props.featured.items.map((playlist) => (
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
              {!props.newReleases ? (
                <div className="sweet-loading">
                  <RingLoader css={override} size={40} color={"#123abc"} />
                </div>
              ) : (
                <div className="allFeaturePlaylists">
                  {props.newReleases.items.map((album) => (
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
  );
};

export default Explore;
