import React, { useState, useEffect } from "react";
import queryString from "query-string";
import SearchFile from "../components/SearchFile";

const Search = (props) => {
  const [userID, setUserID] = useState("");
  const [songData, setSongData] = useState("No songs");
  const [initialSong, setInitialSong] = useState("No initial");

  const addSongs = (playlistID) => {
    var parsed = queryString.parse(window.location.search);
    var accessToken = parsed.access_token;
    var songIDS = JSON.stringify({
      uris: songData.map((song) => {
        return song.uri;
      }),
    });
    fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: songIDS,
    });
  };
  console.log(songData);
  useEffect(() => {
    var parsed = queryString.parse(window.location.search);
    var accessToken = parsed.access_token;

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
          setUserID(data.id);
        }
      });

    if (props.location.searchInfo !== undefined) {
      localStorage.setItem("search", props.location.searchInfo.id);
      localStorage.setItem("initialSong", props.location.searchInfo.id);
      const searchData = localStorage.getItem("search");
      const initialSongLocal = localStorage.getItem("initialSong");

      fetch(
        `https://api.spotify.com/v1/recommendations?seed_tracks=${searchData}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setSongData(data.tracks);
        });
      fetch(`https://api.spotify.com/v1/tracks/${initialSongLocal}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setInitialSong(data);
        });
    } else {
      const searchData = localStorage.getItem("search");
      fetch(
        `https://api.spotify.com/v1/recommendations?seed_tracks=${searchData}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setSongData(data.tracks);
        });
      const initialSongLocal = localStorage.getItem("initialSong");
      fetch(`https://api.spotify.com/v1/tracks/${initialSongLocal}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setInitialSong(data);
        });
    }
  }, []);
  return (
    <SearchFile
      songData={songData}
      initialSong={initialSong}
      queryString={queryString}
      userID={userID}
      addSongs={addSongs}
    />
  );
};

export default Search;
