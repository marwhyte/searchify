import React, { useState, useEffect } from "react";
import queryString from "query-string";

import WholePlaylist from "../components/WholePlaylist";

const Playlist = (props) => {
  const [playlist, setPlaylist] = useState("NoPlaylists");
  const [songs, setSongs] = useState("noSongs");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
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
      .then((data) => {});
    if (props.location.playlistInfo !== undefined) {
      localStorage.setItem("playlist", props.location.playlistInfo.href);
      const songData = localStorage.getItem("playlist");
      fetch(songData + "/tracks", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setSongs(data.items);
        });
      fetch(songData, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPlaylist(data);
          console.log("here", data);
        });
    } else {
      const songData = localStorage.getItem("playlist");
      fetch(`${songData}/tracks`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setSongs(data.items);
        });
      fetch(songData, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPlaylist(data);
          console.log("here", data);
        });
    }
  }, []);
  console.log(songs);
  return <WholePlaylist songs={songs} playlist={playlist} loading={loading} />;
};

export default Playlist;
