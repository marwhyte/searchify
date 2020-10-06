import React, { useState, useEffect } from "react";
import queryString from "query-string";
import Footer from "./Footer";

import SongSearch from "./SongSearch";
import YourMusic from "./YourMusic";
import Explore from "./Explore";

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
      <SongSearch
        userData={userData}
        searching={searching}
        searchQuery={searchQuery}
      />
      <YourMusic
        topic={topic}
        setTopic={setTopic}
        userData={userData}
        topTracks={topTracks}
        topArtists={topArtists}
      />
      <Explore
        exploreTopic={exploreTopic}
        setExploreTopic={setExploreTopic}
        featured={featured}
        newReleases={newReleases}
      />
      <Footer />
    </div>
  );
};

export default Home;
