import React, { useState, useEffect } from "react";
import queryString from "query-string";

import WholeArtist from "../components/WholeArtist";

const Artist = (props) => {
  const [artist, setArtist] = useState("NoArtist");
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
    if (props.location.artistInfo !== undefined) {
      localStorage.setItem("artist", props.location.artistInfo.href);
      const songData = localStorage.getItem("artist");

      fetch(songData + "/top-tracks?country=from_token", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setSongs(data);
        });
      fetch(songData, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setArtist(data);
        });
    } else {
      const songData = localStorage.getItem("artist");

      fetch(songData + "/top-tracks?country=from_token", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setSongs(data);
        });
      fetch(songData, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setArtist(data);
          console.log("artist", data);
        });
    }
  }, []);
  console.log("artist", artist);
  console.log("toptracks", songs);

  return <WholeArtist songs={songs} artist={artist} loading={loading} />;
};

export default Artist;
