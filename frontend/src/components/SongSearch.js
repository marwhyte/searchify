import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const SongSearch = (props) => {
  return (
    <div className="search">
      <div className="right">
        <h2>Welcome {props.userData.name}</h2>
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
          onChange={props.searching}
        />
      </form>
      <div className="searchItems">
        {props.searchQuery === "No songs" ? (
          <div></div>
        ) : (
          <div className="searchFlex">
            {props.searchQuery.map((song) => (
              <Link
                to={{
                  pathname: "/search",
                  search: props.location.search,
                  searchInfo: song,
                  userData: props.userData,
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
  );
};

export default SongSearch;
